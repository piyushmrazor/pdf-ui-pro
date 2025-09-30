import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setStatusFilter, setSortBy, Status } from '@/redux/slices/membersSlice';
import MemberCard from './MemberCard';
import TaskForm from './TaskForm';
import TeamStatusChart from './TeamStatusChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Activity, Users, Coffee, WifiOff } from 'lucide-react';

const TeamLeadView = () => {
  const dispatch = useDispatch();
  const { members, statusFilter, sortBy } = useSelector((state: RootState) => state.members);

  const statusCounts = members.reduce((acc, member) => {
    acc[member.status] = (acc[member.status] || 0) + 1;
    return acc;
  }, {} as Record<Status, number>);

  const filteredMembers = statusFilter === 'All' 
    ? members 
    : members.filter(m => m.status === statusFilter);

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    const aActiveTasks = a.tasks.filter(t => !t.completed).length;
    const bActiveTasks = b.tasks.filter(t => !t.completed).length;
    return bActiveTasks - aActiveTasks;
  });

  const statCards = [
    { label: 'Working', count: statusCounts.Working || 0, icon: Activity, color: 'text-status-working' },
    { label: 'In Meeting', count: statusCounts.Meeting || 0, icon: Users, color: 'text-status-meeting' },
    { label: 'On Break', count: statusCounts.Break || 0, icon: Coffee, color: 'text-status-break' },
    { label: 'Offline', count: statusCounts.Offline || 0, icon: WifiOff, color: 'text-status-offline' },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{stat.count}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart and Task Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TeamStatusChart />
        <TaskForm />
      </div>

      {/* Team Members List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Monitor and manage your team</CardDescription>
            </div>
            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={(value) => dispatch(setStatusFilter(value as Status | 'All'))}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Working">Working</SelectItem>
                  <SelectItem value="Break">On Break</SelectItem>
                  <SelectItem value="Meeting">In Meeting</SelectItem>
                  <SelectItem value="Offline">Offline</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(value) => dispatch(setSortBy(value as 'name' | 'tasks'))}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="tasks">Active Tasks</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamLeadView;
