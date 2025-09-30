import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Card,
  Descriptions,
  Tag,
  Button,
  Progress,
  Timeline,
  Checkbox,
  Input,
  Avatar,
  List,
  Upload,
  Select,
  Space,
  Divider,
} from 'antd';
import {
  ArrowLeftOutlined,
  EditOutlined,
  ClockCircleOutlined,
  UserOutlined,
  SendOutlined,
  PaperClipOutlined,
  UploadOutlined,
  CheckCircleOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

export default function TaskDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('in_progress');

  const task = {
    id: 'TSK-001',
    title: 'GST Return - Client ABC Ltd',
    description: 'Complete monthly GST return filing for December 2024. Ensure all invoices are collected and input tax credit is verified before filing.',
    status: 'in_progress',
    priority: 'high',
    assignee: 'David Employee',
    assigneeAvatar: <UserOutlined />,
    team: 'Tax Compliance Team',
    createdBy: 'Sarah Manager',
    createdAt: '2025-09-28',
    dueDate: dayjs().add(2, 'day').format('YYYY-MM-DD'),
    estimatedHours: 8,
    actualHours: 3,
    progress: 40,
  };

  const subtasks = [
    { id: 1, title: 'Collect sales invoices', isDone: true, completedBy: 'David Employee', completedAt: '2025-09-29' },
    { id: 2, title: 'Verify input tax credit', isDone: false },
    { id: 3, title: 'File online return', isDone: false },
  ];

  const comments = [
    {
      id: 1,
      user: 'David Employee',
      avatar: <UserOutlined />,
      content: 'Started working on sales invoice collection. Found 23 invoices so far.',
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      user: 'Sarah Manager',
      avatar: <UserOutlined />,
      content: 'Great progress! Please ensure all invoices are cross-verified with the ledger.',
      timestamp: '1 hour ago',
    },
  ];

  const attachments = [
    { id: 1, name: 'Invoice_List.xlsx', size: '245 KB', uploadedBy: 'David Employee', uploadedAt: '2025-09-29' },
    { id: 2, name: 'Sales_Register.pdf', size: '1.2 MB', uploadedBy: 'David Employee', uploadedAt: '2025-09-29' },
  ];

  const history = [
    {
      action: 'Status changed to In Progress',
      user: 'David Employee',
      timestamp: '3 hours ago',
      color: 'blue',
    },
    {
      action: 'Task assigned to David Employee',
      user: 'Sarah Manager',
      timestamp: '5 hours ago',
      color: 'green',
    },
    {
      action: 'Task created',
      user: 'Sarah Manager',
      timestamp: '6 hours ago',
      color: 'gray',
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
  };

  const priorityColors: { [key: string]: string } = {
    urgent: 'error',
    high: 'warning',
    medium: 'processing',
    low: 'default',
  };

  const handleSendComment = () => {
    if (comment.trim()) {
      console.log('Sending comment:', comment);
      setComment('');
    }
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    console.log('Changing status to:', newStatus);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/tasks')}
          >
            Back to Tasks
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">{task.title}</h1>
              <Tag color={priorityColors[task.priority]}>{task.priority.toUpperCase()}</Tag>
            </div>
            <p className="text-muted-foreground text-sm mt-1">{task.id}</p>
          </div>
        </div>
        <Button
          type="primary"
          icon={<EditOutlined />}
          className="bg-accent hover:bg-accent-hover border-none"
        >
          Edit Task
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Task Details" className="border-border">
            <div className="mb-6">
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{task.description}</p>
            </div>

            <Divider />

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Status</div>
                <Select
                  value={status}
                  onChange={handleStatusChange}
                  className="w-full"
                >
                  <Option value="not_started">Not Started</Option>
                  <Option value="assigned">Assigned</Option>
                  <Option value="in_progress">In Progress</Option>
                  <Option value="pending">Pending</Option>
                  <Option value="review">Review</Option>
                  <Option value="completed">Completed</Option>
                </Select>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Progress</div>
                <Progress percent={task.progress} strokeColor="hsl(var(--accent))" />
              </div>
            </div>

            <Descriptions column={2} bordered size="small">
              <Descriptions.Item label="Assignee" span={1}>
                <Space>
                  <Avatar size="small" icon={task.assigneeAvatar} className="bg-accent" />
                  {task.assignee}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Team" span={1}>{task.team}</Descriptions.Item>
              <Descriptions.Item label="Created By" span={1}>{task.createdBy}</Descriptions.Item>
              <Descriptions.Item label="Created Date" span={1}>{task.createdAt}</Descriptions.Item>
              <Descriptions.Item label="Due Date" span={1}>
                <span className="text-warning font-medium">{task.dueDate}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Estimated Hours" span={1}>{task.estimatedHours}h</Descriptions.Item>
              <Descriptions.Item label="Actual Hours" span={2}>{task.actualHours}h / {task.estimatedHours}h</Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="Subtasks" extra={<span className="text-sm text-muted-foreground">2 of 3 completed</span>} className="border-border">
            <div className="space-y-3">
              {subtasks.map((subtask) => (
                <div key={subtask.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <Checkbox checked={subtask.isDone} />
                  <div className="flex-1">
                    <div className={`font-medium ${subtask.isDone ? 'line-through text-muted-foreground' : ''}`}>
                      {subtask.title}
                    </div>
                    {subtask.isDone && subtask.completedBy && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Completed by {subtask.completedBy} on {subtask.completedAt}
                      </div>
                    )}
                  </div>
                  {subtask.isDone && <CheckCircleOutlined className="text-success" />}
                </div>
              ))}
            </div>
          </Card>

          <Card title="Comments" className="border-border">
            <List
              dataSource={comments}
              renderItem={(comment) => (
                <List.Item className="border-0">
                  <List.Item.Meta
                    avatar={<Avatar icon={comment.avatar} className="bg-primary" />}
                    title={<span className="font-medium">{comment.user}</span>}
                    description={
                      <div>
                        <p className="text-foreground mb-1">{comment.content}</p>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
            <div className="mt-4 flex gap-2">
              <TextArea
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onPressEnter={(e) => {
                  if (!e.shiftKey) {
                    e.preventDefault();
                    handleSendComment();
                  }
                }}
                autoSize={{ minRows: 2, maxRows: 4 }}
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleSendComment}
                disabled={!comment.trim()}
                className="bg-accent hover:bg-accent-hover border-none"
              >
                Send
              </Button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Attachments" className="border-border">
            <div className="space-y-3">
              {attachments.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <PaperClipOutlined className="text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-sm truncate">{file.name}</div>
                      <div className="text-xs text-muted-foreground">{file.size}</div>
                    </div>
                  </div>
                  <Button type="text" size="small" icon={<DownloadOutlined />} />
                </div>
              ))}
            </div>
            <Upload className="mt-4">
              <Button icon={<UploadOutlined />} block>
                Upload File
              </Button>
            </Upload>
          </Card>

          <Card title="Activity History" className="border-border">
            <Timeline
              items={history.map((item) => ({
                color: item.color,
                children: (
                  <div>
                    <div className="font-medium text-sm">{item.action}</div>
                    <div className="text-xs text-muted-foreground">
                      by {item.user}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {item.timestamp}
                    </div>
                  </div>
                ),
              }))}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
