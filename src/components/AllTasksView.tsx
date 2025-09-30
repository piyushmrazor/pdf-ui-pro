import { useAppSelector } from '@/redux/hooks';
import { selectAllMembers } from '@/redux/selectors';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, CheckCircle2, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const AllTasksView = () => {
  const members = useAppSelector(selectAllMembers);

  // Get all tasks from all members with member info
  const allTasksWithMembers = members.flatMap(member =>
    member.tasks.map(task => ({
      ...task,
      memberName: member.name,
      memberAvatar: member.avatar,
      memberId: member.id,
      memberStatus: member.status,
    }))
  );

  // Separate active and completed
  const activeTasks = allTasksWithMembers.filter(t => !t.completed);
  const completedTasks = allTasksWithMembers.filter(t => t.completed);

  // Sort by due date (earliest first)
  const sortedActiveTasks = [...activeTasks].sort((a, b) => 
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'text-status-working';
    if (progress >= 50) return 'text-status-meeting';
    if (progress >= 25) return 'text-status-break';
    return 'text-muted-foreground';
  };

  const getDueDateColor = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const daysUntilDue = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDue < 0) return 'text-destructive';
    if (daysUntilDue <= 2) return 'text-status-break';
    return 'text-muted-foreground';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">All Team Tasks</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          {activeTasks.length} active • {completedTasks.length} completed across all team members
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Active Tasks */}
        {sortedActiveTasks.length > 0 ? (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Active Tasks ({activeTasks.length})
            </h4>
            {sortedActiveTasks.map((task) => (
              <div
                key={`${task.memberId}-${task.id}`}
                className="p-3 sm:p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors space-y-3"
              >
                {/* Task Header with Member Info */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-border flex-shrink-0">
                      <AvatarImage src={task.memberAvatar} alt={task.memberName} />
                      <AvatarFallback className="text-xs">
                        {task.memberName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-foreground text-sm sm:text-base line-clamp-2">
                        {task.title}
                      </h5>
                      <p className="text-xs text-muted-foreground truncate">
                        Assigned to: {task.memberName}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs sm:text-sm font-semibold flex-shrink-0 ${getProgressColor(task.progress)}`}>
                    {task.progress}%
                  </span>
                </div>

                {/* Progress Bar */}
                <Progress value={task.progress} className="h-2" />

                {/* Task Meta Info */}
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className={`flex items-center gap-1.5 ${getDueDateColor(task.dueDate)}`}>
                    <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                      {' '}({formatDistanceToNow(new Date(task.dueDate), { addSuffix: true })})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle2 className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">No active tasks! Great job team! 🎉</p>
          </div>
        )}

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div className="pt-4 border-t border-border space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-status-working" />
              Recently Completed ({completedTasks.length})
            </h4>
            <div className="space-y-2">
              {completedTasks.slice(0, 5).map((task) => (
                <div
                  key={`${task.memberId}-${task.id}`}
                  className="p-3 rounded-lg bg-muted/30 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Avatar className="h-7 w-7 border border-border flex-shrink-0">
                      <AvatarImage src={task.memberAvatar} alt={task.memberName} />
                      <AvatarFallback className="text-xs">
                        {task.memberName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground line-through truncate">
                        {task.title}
                      </p>
                      <p className="text-xs text-muted-foreground/70">
                        by {task.memberName}
                      </p>
                    </div>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-status-working flex-shrink-0" />
                </div>
              ))}
              {completedTasks.length > 5 && (
                <p className="text-xs text-muted-foreground text-center pt-2">
                  ... and {completedTasks.length - 5} more completed tasks
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AllTasksView;
