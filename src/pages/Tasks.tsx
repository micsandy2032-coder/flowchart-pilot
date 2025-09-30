import { useState } from 'react';
import { Card, Table, Tag, Button, Input, Select, Space, Badge, Progress, Dropdown, Modal, Form, DatePicker, InputNumber } from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

export default function Tasks() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [priorityFilter, setPriorityFilter] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const tasks = [
    {
      key: '1',
      id: 'TSK-001',
      title: 'GST Return - Client ABC Ltd',
      description: 'Monthly GST return for December 2024',
      assignee: 'David Employee',
      status: 'in_progress',
      priority: 'high',
      dueDate: dayjs().add(2, 'day').format('YYYY-MM-DD'),
      progress: 40,
      team: 'Tax Compliance',
    },
    {
      key: '2',
      id: 'TSK-002',
      title: 'Income Tax Filing - Individual XYZ',
      description: 'AY 2024-25 ITR filing',
      assignee: 'Emma Worker',
      status: 'assigned',
      priority: 'medium',
      dueDate: dayjs().add(7, 'day').format('YYYY-MM-DD'),
      progress: 0,
      team: 'Tax Compliance',
    },
    {
      key: '3',
      id: 'TSK-003',
      title: 'TDS Return Q3 - DEF Corp',
      description: 'Third quarter TDS return',
      assignee: 'Mike DataCollector',
      status: 'pending',
      priority: 'urgent',
      dueDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
      progress: 60,
      team: 'Tax Compliance',
    },
    {
      key: '4',
      id: 'TSK-004',
      title: 'Audit Documents - GHI Ltd',
      description: 'Prepare financial documents for statutory audit',
      assignee: 'Lisa Reviewer',
      status: 'review',
      priority: 'high',
      dueDate: dayjs().add(5, 'day').format('YYYY-MM-DD'),
      progress: 90,
      team: 'Tax Compliance',
    },
    {
      key: '5',
      id: 'TSK-005',
      title: 'Data Validation - New Client',
      description: 'Validate and clean client master data',
      assignee: 'Mike DataCollector',
      status: 'completed',
      priority: 'low',
      dueDate: dayjs().subtract(2, 'day').format('YYYY-MM-DD'),
      progress: 100,
      team: 'Data Management',
    },
    {
      key: '6',
      id: 'TSK-006',
      title: 'ROC Annual Filing - JKL Pvt Ltd',
      description: 'Company annual filing with ROC',
      assignee: 'Unassigned',
      status: 'not_started',
      priority: 'medium',
      dueDate: dayjs().add(10, 'day').format('YYYY-MM-DD'),
      progress: 0,
      team: 'Tax Compliance',
    },
    {
      key: '7',
      id: 'TSK-007',
      title: 'GST Return - Client MNO Ltd',
      description: 'Monthly GST return for November 2024',
      assignee: 'David Employee',
      status: 'delivered',
      priority: 'medium',
      dueDate: dayjs().subtract(5, 'day').format('YYYY-MM-DD'),
      progress: 100,
      team: 'Tax Compliance',
    },
  ];

  const statusColors: { [key: string]: string } = {
    not_started: 'default',
    assigned: 'cyan',
    in_progress: 'processing',
    pending: 'error',
    review: 'warning',
    completed: 'success',
    delivered: 'purple',
    rejected: 'magenta',
  };

  const priorityColors: { [key: string]: string } = {
    urgent: 'error',
    high: 'warning',
    medium: 'processing',
    low: 'default',
  };

  const getActionItems = (record: any) => [
    {
      key: 'view',
      icon: <EyeOutlined />,
      label: 'View Details',
      onClick: () => navigate(`/tasks/${record.key}`),
    },
    {
      key: 'edit',
      icon: <EditOutlined />,
      label: 'Edit Task',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'delete',
      icon: <DeleteOutlined />,
      label: 'Delete Task',
      danger: true,
    },
  ];

  const columns = [
    {
      title: 'Task ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (text: string) => <span className="font-mono text-sm">{text}</span>,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: any) => (
        <div>
          <div className="font-medium text-foreground hover:text-accent cursor-pointer" onClick={() => navigate(`/tasks/${record.key}`)}>
            {text}
          </div>
          <div className="text-xs text-muted-foreground mt-1">{record.description}</div>
        </div>
      ),
    },
    {
      title: 'Assignee',
      dataIndex: 'assignee',
      key: 'assignee',
      width: 150,
      render: (text: string) => (
        <span className={text === 'Unassigned' ? 'text-muted-foreground italic' : ''}>{text}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      filters: [
        { text: 'Not Started', value: 'not_started' },
        { text: 'Assigned', value: 'assigned' },
        { text: 'In Progress', value: 'in_progress' },
        { text: 'Pending', value: 'pending' },
        { text: 'Review', value: 'review' },
        { text: 'Completed', value: 'completed' },
        { text: 'Delivered', value: 'delivered' },
      ],
      onFilter: (value: any, record: any) => record.status === value,
      render: (status: string) => (
        <Tag color={statusColors[status]}>{status.replace('_', ' ').toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      width: 100,
      filters: [
        { text: 'Urgent', value: 'urgent' },
        { text: 'High', value: 'high' },
        { text: 'Medium', value: 'medium' },
        { text: 'Low', value: 'low' },
      ],
      onFilter: (value: any, record: any) => record.priority === value,
      render: (priority: string) => (
        <Tag color={priorityColors[priority]}>{priority.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      width: 120,
      sorter: (a: any, b: any) => dayjs(a.dueDate).unix() - dayjs(b.dueDate).unix(),
      render: (date: string) => {
        const isOverdue = dayjs(date).isBefore(dayjs(), 'day');
        const isToday = dayjs(date).isSame(dayjs(), 'day');
        return (
          <span className={isOverdue ? 'text-destructive font-medium' : isToday ? 'text-warning font-medium' : ''}>
            {dayjs(date).format('MMM DD, YYYY')}
          </span>
        );
      },
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      width: 120,
      render: (progress: number) => (
        <Progress
          percent={progress}
          size="small"
          strokeColor="hsl(var(--accent))"
          trailColor="hsl(var(--muted))"
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 80,
      render: (_: any, record: any) => (
        <Dropdown menu={{ items: getActionItems(record) }} trigger={['click']}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const handleCreateTask = (values: any) => {
    console.log('Creating task:', values);
    setIsModalOpen(false);
    form.resetFields();
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchText.toLowerCase()) ||
      task.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = !statusFilter || task.status === statusFilter;
    const matchesPriority = !priorityFilter || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const taskCounts = {
    total: tasks.length,
    active: tasks.filter(t => ['in_progress', 'assigned', 'review'].includes(t.status)).length,
    pending: tasks.filter(t => t.status === 'pending').length,
    completed: tasks.filter(t => ['completed', 'delivered'].includes(t.status)).length,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Tasks</h1>
          <p className="text-muted-foreground">Manage and track all your tasks</p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => setIsModalOpen(true)}
          className="bg-accent hover:bg-accent-hover border-none"
        >
          Create Task
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border">
          <div className="text-muted-foreground text-sm mb-1">Total Tasks</div>
          <div className="text-2xl font-bold text-foreground">{taskCounts.total}</div>
        </Card>
        <Card className="border-border">
          <div className="text-muted-foreground text-sm mb-1">Active Tasks</div>
          <div className="text-2xl font-bold text-primary">{taskCounts.active}</div>
        </Card>
        <Card className="border-border">
          <div className="text-muted-foreground text-sm mb-1">Pending</div>
          <div className="text-2xl font-bold text-warning">{taskCounts.pending}</div>
        </Card>
        <Card className="border-border">
          <div className="text-muted-foreground text-sm mb-1">Completed</div>
          <div className="text-2xl font-bold text-success">{taskCounts.completed}</div>
        </Card>
      </div>

      <Card className="border-border">
        <Space direction="vertical" size="middle" className="w-full">
          <div className="flex flex-wrap gap-4">
            <Input
              placeholder="Search tasks..."
              prefix={<SearchOutlined className="text-muted-foreground" />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-64"
            />
            <Select
              placeholder="Filter by Status"
              allowClear
              value={statusFilter}
              onChange={setStatusFilter}
              className="w-48"
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
              allowClear
              value={priorityFilter}
              onChange={setPriorityFilter}
              className="w-48"
            >
              <Option value="urgent">Urgent</Option>
              <Option value="high">High</Option>
              <Option value="medium">Medium</Option>
              <Option value="low">Low</Option>
            </Select>
          </div>

          <Table
            columns={columns}
            dataSource={filteredTasks}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} tasks`,
            }}
            scroll={{ x: 1200 }}
          />
        </Space>
      </Card>

      <Modal
        title="Create New Task"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateTask}
          className="mt-4"
        >
          <Form.Item
            name="title"
            label="Task Title"
            rules={[{ required: true, message: 'Please enter task title' }]}
          >
            <Input placeholder="Enter task title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <TextArea rows={4} placeholder="Enter task description" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="priority"
              label="Priority"
              rules={[{ required: true, message: 'Please select priority' }]}
            >
              <Select placeholder="Select priority">
                <Option value="low">Low</Option>
                <Option value="medium">Medium</Option>
                <Option value="high">High</Option>
                <Option value="urgent">Urgent</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="dueDate"
              label="Due Date"
              rules={[{ required: true, message: 'Please select due date' }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="team"
              label="Team"
              rules={[{ required: true, message: 'Please select team' }]}
            >
              <Select placeholder="Select team">
                <Option value="tax">Tax Compliance Team</Option>
                <Option value="data">Data Management Team</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="estimatedHours"
              label="Estimated Hours"
              rules={[{ required: true, message: 'Please enter estimated hours' }]}
            >
              <InputNumber min={1} max={100} className="w-full" placeholder="Hours" />
            </Form.Item>
          </div>

          <Form.Item>
            <Space className="w-full justify-end">
              <Button onClick={() => {
                setIsModalOpen(false);
                form.resetFields();
              }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" className="bg-accent hover:bg-accent-hover border-none">
                Create Task
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
