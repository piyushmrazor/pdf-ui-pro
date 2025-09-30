import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectStatusCounts,
  selectSortedMembers,
  selectStatusFilter,
  selectSortBy,
} from '@/redux/selectors';
import { setStatusFilter, setSortBy, Status } from '@/redux/slices/membersSlice';
import MemberCard from './MemberCard';
import TaskForm from './TaskForm';
import TeamStatusChart from './TeamStatusChart';
import AllTasksView from './AllTasksView';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Users, Coffee, WifiOff, ClipboardList, UsersRound } from 'lucide-react';

const TeamLeadView = () => {
  const dispatch = useAppDispatch();
  
  // Use memoized selectors for better performance
  const statusCounts = useAppSelector(selectStatusCounts);
  const sortedMembers = useAppSelector(selectSortedMembers);
  const statusFilter = useAppSelector(selectStatusFilter);
  const sortBy = useAppSelector(selectSortBy);

  const statCards = [
    { label: 'Working', count: statusCounts.Working || 0, icon: Activity, color: 'text-status-working' },
    { label: 'In Meeting', count: statusCounts.Meeting || 0, icon: Users, color: 'text-status-meeting' },
    { label: 'On Break', count: statusCounts.Break || 0, icon: Coffee, color: 'text-status-break' },
    { label: 'Offline', count: statusCounts.Offline || 0, icon: WifiOff, color: 'text-status-offline' },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statCards.map((stat) => (
          <Card key={stat.label} className="overflow-hidden">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-foreground mt-1">{stat.count}</p>
                </div>
                <stat.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${stat.color} self-end sm:self-auto`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart and Task Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <TeamStatusChart />
        <TaskForm />
      </div>

      {/* Team Members and Tasks Tabs */}
      <Tabs defaultValue="members" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="members" className="flex items-center gap-2">
            <UsersRound className="h-4 w-4" />
            <span className="hidden sm:inline">Team </span>Members
          </TabsTrigger>
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            <span className="hidden sm:inline">All </span>Tasks
          </TabsTrigger>
        </TabsList>

        {/* Team Members Tab */}
        <TabsContent value="members" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                <div>
                  <CardTitle className="text-lg sm:text-xl">Team Members</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Monitor and manage your team</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                  <Select value={statusFilter} onValueChange={(value) => dispatch(setStatusFilter(value as Status | 'All'))}>
                    <SelectTrigger className="w-full sm:w-[140px]">
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
                    <SelectTrigger className="w-full sm:w-[140px]">
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
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                {sortedMembers.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
              {sortedMembers.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>No members found with the selected filter</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* All Tasks Tab */}
        <TabsContent value="tasks" className="mt-4">
          <AllTasksView />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamLeadView;
