import { Card, Row, Col, Statistic, Progress, Table, Tag, Timeline, Space } from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  TeamOutlined,
  TrophyOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['hsl(var(--accent))', 'hsl(var(--primary))', 'hsl(var(--warning))', 'hsl(var(--destructive))'];

export default function Dashboard() {
  const stats = [
    { title: 'Active Tasks', value: 24, icon: <CheckCircleOutlined />, color: 'text-accent', prefix: null },
    { title: 'Pending', value: 5, icon: <ClockCircleOutlined />, color: 'text-warning', prefix: null },
    { title: 'Overdue', value: 2, icon: <ExclamationCircleOutlined />, color: 'text-destructive', prefix: null },
    { title: 'Completed Today', value: 8, icon: <CheckCircleOutlined />, color: 'text-success', prefix: null },
  ];

  const tasksByStatus = [
    { name: 'Completed', value: 45 },
    { name: 'In Progress', value: 24 },
    { name: 'Pending', value: 12 },
    { name: 'Not Started', value: 8 },
  ];

  const weeklyData = [
    { day: 'Mon', completed: 6, assigned: 8 },
    { day: 'Tue', completed: 8, assigned: 7 },
    { day: 'Wed', completed: 5, assigned: 9 },
    { day: 'Thu', completed: 10, assigned: 6 },
    { day: 'Fri', completed: 7, assigned: 8 },
  ];

  const recentTasks = [
    { key: '1', task: 'GST Return - Client ABC Ltd', assignee: 'David Employee', status: 'in_progress', priority: 'high', progress: 40 },
    { key: '2', task: 'Income Tax Filing - Individual XYZ', assignee: 'Emma Worker', status: 'assigned', priority: 'medium', progress: 0 },
    { key: '3', task: 'Audit Documents - GHI Ltd', assignee: 'Lisa Reviewer', status: 'review', priority: 'high', progress: 90 },
    { key: '4', task: 'TDS Return Q3 - DEF Corp', assignee: 'Mike DataCollector', status: 'pending', priority: 'urgent', progress: 60 },
  ];

  const leaderboard = [
    { key: '1', name: 'David Employee', completed: 28, rank: 1 },
    { key: '2', name: 'Emma Worker', completed: 24, rank: 2 },
    { key: '3', name: 'Lisa Reviewer', completed: 20, rank: 3 },
    { key: '4', name: 'Mike DataCollector', completed: 18, rank: 4 },
  ];

  const statusColors: { [key: string]: string } = {
    in_progress: 'processing',
    assigned: 'default',
    review: 'warning',
    pending: 'error',
    completed: 'success',
  };

  const priorityColors: { [key: string]: string } = {
    urgent: 'error',
    high: 'warning',
    medium: 'processing',
    low: 'default',
  };

  const columns = [
    {
      title: 'Task',
      dataIndex: 'task',
      key: 'task',
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Assignee',
      dataIndex: 'assignee',
      key: 'assignee',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={statusColors[status]}>{status.replace('_', ' ').toUpperCase()}</Tag>
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
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => (
        <Progress percent={progress} size="small" strokeColor="hsl(var(--accent))" />
      ),
    },
  ];

  const leaderboardColumns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      render: (rank: number) => (
        <Space>
          {rank === 1 && <TrophyOutlined className="text-warning text-lg" />}
          <span className="font-bold">#{rank}</span>
        </Space>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Tasks Completed',
      dataIndex: 'completed',
      key: 'completed',
      render: (value: number) => (
        <Space>
          <span className="font-bold text-accent">{value}</span>
          <RiseOutlined className="text-success" />
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your task overview.</p>
      </div>

      <Row gutter={[16, 16]}>
        {stats.map((stat, idx) => (
          <Col xs={24} sm={12} lg={6} key={idx}>
            <Card className="hover:shadow-lg transition-shadow border-border">
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={<span className={`${stat.color} text-2xl`}>{stat.icon}</span>}
                valueStyle={{ color: 'hsl(var(--foreground))' }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Weekly Task Overview" className="border-border">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="completed" fill="hsl(var(--accent))" name="Completed" radius={[8, 8, 0, 0]} />
                <Bar dataKey="assigned" fill="hsl(var(--primary))" name="Assigned" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Tasks by Status" className="border-border">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={tasksByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) => `${entry.name}: ${((entry.percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {tasksByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Recent Tasks" className="border-border">
            <Table
              columns={columns}
              dataSource={recentTasks}
              pagination={false}
              size="middle"
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={
              <Space>
                <TeamOutlined />
                <span>Top Performers</span>
              </Space>
            }
            className="border-border"
          >
            <Table
              columns={leaderboardColumns}
              dataSource={leaderboard}
              pagination={false}
              size="small"
              showHeader={false}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Recent Activity" className="border-border">
        <Timeline
          items={[
            {
              color: 'green',
              children: (
                <div>
                  <strong>Task Completed:</strong> Data Validation - New Client
                  <div className="text-xs text-muted-foreground">2 hours ago</div>
                </div>
              ),
            },
            {
              color: 'blue',
              children: (
                <div>
                  <strong>Task Assigned:</strong> Income Tax Filing to Emma Worker
                  <div className="text-xs text-muted-foreground">4 hours ago</div>
                </div>
              ),
            },
            {
              color: 'orange',
              children: (
                <div>
                  <strong>Task Pending:</strong> TDS Return Q3 - Missing documents
                  <div className="text-xs text-muted-foreground">5 hours ago</div>
                </div>
              ),
            },
            {
              color: 'purple',
              children: (
                <div>
                  <strong>Task Review:</strong> Audit Documents submitted for review
                  <div className="text-xs text-muted-foreground">6 hours ago</div>
                </div>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
}
