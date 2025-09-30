import { Card, Select, Button, Tag } from 'antd';
import { DownloadOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;

export default function GanttChart() {
  const tasks = [
    {
      id: 'TSK-001',
      title: 'GST Return - Client ABC Ltd',
      assignee: 'David Employee',
      startDate: dayjs().subtract(1, 'day'),
      endDate: dayjs().add(2, 'day'),
      status: 'in_progress',
      priority: 'high',
      progress: 40,
    },
    {
      id: 'TSK-002',
      title: 'Income Tax Filing - Individual XYZ',
      assignee: 'Emma Worker',
      startDate: dayjs(),
      endDate: dayjs().add(7, 'day'),
      status: 'assigned',
      priority: 'medium',
      progress: 0,
    },
    {
      id: 'TSK-003',
      title: 'TDS Return Q3 - DEF Corp',
      assignee: 'Mike DataCollector',
      startDate: dayjs().subtract(2, 'day'),
      endDate: dayjs().add(1, 'day'),
      status: 'pending',
      priority: 'urgent',
      progress: 60,
    },
    {
      id: 'TSK-004',
      title: 'Audit Documents - GHI Ltd',
      assignee: 'Lisa Reviewer',
      startDate: dayjs().subtract(3, 'day'),
      endDate: dayjs().add(5, 'day'),
      status: 'review',
      priority: 'high',
      progress: 90,
    },
    {
      id: 'TSK-006',
      title: 'ROC Annual Filing - JKL Pvt Ltd',
      assignee: 'Unassigned',
      startDate: dayjs().add(2, 'day'),
      endDate: dayjs().add(10, 'day'),
      status: 'not_started',
      priority: 'medium',
      progress: 0,
    },
  ];

  const statusColors: { [key: string]: string } = {
    not_started: '#d9d9d9',
    assigned: '#1890ff',
    in_progress: '#52c41a',
    pending: '#ff4d4f',
    review: '#faad14',
    completed: '#722ed1',
    delivered: '#eb2f96',
  };

  const priorityColors: { [key: string]: string } = {
    urgent: 'error',
    high: 'warning',
    medium: 'processing',
    low: 'default',
  };

  const today = dayjs();
  const startDate = dayjs().subtract(5, 'day');
  const endDate = dayjs().add(12, 'day');
  const totalDays = endDate.diff(startDate, 'day') + 1;
  const dates = Array.from({ length: totalDays }, (_, i) => startDate.add(i, 'day'));

  const getTaskPosition = (task: typeof tasks[0]) => {
    const taskStart = task.startDate.isBefore(startDate) ? startDate : task.startDate;
    const taskEnd = task.endDate.isAfter(endDate) ? endDate : task.endDate;
    
    const left = ((taskStart.diff(startDate, 'day') / totalDays) * 100);
    const width = ((taskEnd.diff(taskStart, 'day') + 1) / totalDays) * 100;
    
    return { left: `${left}%`, width: `${width}%` };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Gantt Chart</h1>
          <p className="text-muted-foreground">Visual timeline of all tasks and their progress</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all" className="w-40">
            <Option value="all">All Teams</Option>
            <Option value="tax">Tax Compliance</Option>
            <Option value="data">Data Management</Option>
          </Select>
          <Button icon={<ZoomOutOutlined />}>Zoom Out</Button>
          <Button icon={<ZoomInOutlined />}>Zoom In</Button>
          <Button type="primary" icon={<DownloadOutlined />} className="bg-accent hover:bg-accent-hover border-none">
            Export
          </Button>
        </div>
      </div>

      <Card className="border-border overflow-x-auto">
        <div className="min-w-[1000px]">
          {/* Header - Timeline */}
          <div className="flex border-b-2 border-border mb-4">
            <div className="w-64 flex-shrink-0 p-4 font-semibold text-foreground">
              Task / Assignee
            </div>
            <div className="flex-1 flex">
              {dates.map((date, idx) => (
                <div
                  key={idx}
                  className={`flex-1 text-center p-2 border-l border-border ${
                    date.isSame(today, 'day') ? 'bg-accent/10 font-bold' : ''
                  }`}
                >
                  <div className="text-xs text-muted-foreground">{date.format('MMM')}</div>
                  <div className="font-medium text-sm">{date.format('DD')}</div>
                  <div className="text-xs text-muted-foreground">{date.format('ddd')}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Task Rows */}
          {tasks.map((task) => {
            const position = getTaskPosition(task);
            return (
              <div key={task.id} className="flex border-b border-border hover:bg-muted/30 transition-colors">
                <div className="w-64 flex-shrink-0 p-4">
                  <div className="font-medium text-sm mb-1">{task.title}</div>
                  <div className="text-xs text-muted-foreground">{task.assignee}</div>
                  <div className="mt-2">
                    <Tag color={priorityColors[task.priority]} className="text-xs">
                      {task.priority.toUpperCase()}
                    </Tag>
                  </div>
                </div>
                <div className="flex-1 relative py-6">
                  {/* Today marker */}
                  <div
                    className="absolute top-0 bottom-0 w-px bg-accent z-10"
                    style={{
                      left: `${((today.diff(startDate, 'day') / totalDays) * 100)}%`,
                    }}
                  />
                  
                  {/* Task bar */}
                  <div
                    className="absolute h-8 rounded-lg shadow-md flex items-center px-3 cursor-pointer hover:shadow-lg transition-shadow"
                    style={{
                      ...position,
                      backgroundColor: statusColors[task.status],
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                  >
                    <div className="text-white text-xs font-medium truncate flex-1">
                      {task.id}
                    </div>
                    <div className="text-white text-xs ml-2">
                      {task.progress}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: statusColors.in_progress }} />
            <div>
              <div className="text-sm font-medium">In Progress</div>
              <div className="text-xs text-muted-foreground">Active tasks</div>
            </div>
          </div>
        </Card>
        <Card className="border-border">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: statusColors.pending }} />
            <div>
              <div className="text-sm font-medium">Pending</div>
              <div className="text-xs text-muted-foreground">Awaiting data</div>
            </div>
          </div>
        </Card>
        <Card className="border-border">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: statusColors.review }} />
            <div>
              <div className="text-sm font-medium">Review</div>
              <div className="text-xs text-muted-foreground">Under review</div>
            </div>
          </div>
        </Card>
        <Card className="border-border">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: statusColors.completed }} />
            <div>
              <div className="text-sm font-medium">Completed</div>
              <div className="text-xs text-muted-foreground">Done tasks</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
