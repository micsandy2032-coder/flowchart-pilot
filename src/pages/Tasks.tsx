import { useState, useEffect } from 'react';
import { Card, Table, Tag, Button, Input, Select, Space, Badge, Progress } from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import dayjs from 'dayjs';

const { Option } = Select;

export default function Tasks() {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [priorityFilter, setPriorityFilter] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          created_by_user:users!tasks_created_by_fkey(full_name),
          task_assignments(
            user_id,
            users!task_assignments_user_id_fkey(full_name)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusColors: { [key: string]: string } = {
    not_started: 'default',
    assigned: 'cyan',
    in_progress: 'processing',
    pending: 'error',
    review: 'warning',
    completed: 'success',
    delivered: 'purple',
    rejected: 'error',
  };

  const priorityColors: { [key: string]: string } = {
    urgent: 'error',
    high: 'warning',
    medium: 'processing',
    low: 'default',
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchText.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = !statusFilter || task.status === statusFilter;
    const matchesPriority = !priorityFilter || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const columns = [
    {
      title: 'Task ID',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => <span className="font-mono text-xs">{id.slice(0, 8)}</span>,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={statusColors[status] || 'default'}>
          {status.replace('_', ' ').toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => (
        <Tag color={priorityColors[priority]}>{priority.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Assignee',
      key: 'assignee',
      render: (record: any) => {
        const assignees = record.task_assignments?.map((a: any) => a.users?.full_name).filter(Boolean);
        return assignees?.length > 0 ? assignees.join(', ') : 'Unassigned';
      },
    },
    {
      title: 'Due Date',
      dataIndex: 'due_date',
      key: 'due_date',
      render: (date: string) => date ? dayjs(date).format('MMM DD, YYYY') : '-',
    },
    {
      title: 'Progress',
      key: 'progress',
      render: (record: any) => {
        const progress = record.status === 'completed' ? 100 : 
                        record.status === 'in_progress' ? 50 : 
                        record.status === 'assigned' ? 25 : 0;
        return <Progress percent={progress} size="small" />;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Button
          icon={<EyeOutlined />}
          onClick={() => navigate(`/tasks/${record.id}`)}
          size="small"
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
        {userProfile?.role === 'data_collector' && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/tasks/create')}
            size="large"
          >
            Create Task
          </Button>
        )}
      </div>

      <Card>
        <Space direction="vertical" size="large" className="w-full">
          <div className="flex gap-4 items-center flex-wrap">
            <Input
              placeholder="Search tasks..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />
            
            <Select
              placeholder="Filter by Status"
              style={{ width: 200 }}
              allowClear
              value={statusFilter}
              onChange={setStatusFilter}
              suffixIcon={<FilterOutlined />}
            >
              <Option value="not_started">Not Started</Option>
              <Option value="assigned">Assigned</Option>
              <Option value="in_progress">In Progress</Option>
              <Option value="pending">Pending</Option>
              <Option value="review">Review</Option>
              <Option value="completed">Completed</Option>
              <Option value="delivered">Delivered</Option>
            </Select>

            <Select
              placeholder="Filter by Priority"
              style={{ width: 200 }}
              allowClear
              value={priorityFilter}
              onChange={setPriorityFilter}
              suffixIcon={<FilterOutlined />}
            >
              <Option value="urgent">Urgent</Option>
              <Option value="high">High</Option>
              <Option value="medium">Medium</Option>
              <Option value="low">Low</Option>
            </Select>

            <Badge count={filteredTasks.length} showZero>
              <Button>Total Tasks</Button>
            </Badge>
          </div>

          <Table
            columns={columns}
            dataSource={filteredTasks}
            loading={loading}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} tasks`,
            }}
          />
        </Space>
      </Card>
    </div>
  );
}
