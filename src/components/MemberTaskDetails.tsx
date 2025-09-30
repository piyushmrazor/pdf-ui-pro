import { Member } from '@/redux/slices/membersSlice';
import { Progress } from '@/components/ui/progress';
import { Calendar, CheckCircle2, Circle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MemberTaskDetailsProps {
  member: Member;
}

const MemberTaskDetails = ({ member }: MemberTaskDetailsProps) => {
  const activeTasks = member.tasks.filter(t => !t.completed);
  const completedTasks = member.tasks.filter(t => t.completed);

  if (member.tasks.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        <Circle className="h-8 w-8 mx-auto mb-2 opacity-20" />
        <p className="text-sm">No tasks assigned</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Active Tasks */}
      {activeTasks.length > 0 && (
        <div className="space-y-2">
          <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Active Tasks ({activeTasks.length})
          </h5>
          {activeTasks.map((task) => (
            <div
              key={task.id}
              className="p-3 rounded-md border border-border bg-background space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <h6 className="text-sm font-medium text-foreground flex-1 line-clamp-2">
                  {task.title}
                </h6>
                <Badge variant="secondary" className="text-xs flex-shrink-0">
                  {task.progress}%
                </Badge>
              </div>
              
              <Progress value={task.progress} className="h-1.5" />
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="space-y-2">
          <h5 className="text-xs font-semibold text-status-working uppercase tracking-wide flex items-center gap-1.5">
            <CheckCircle2 className="h-3 w-3" />
            Completed ({completedTasks.length})
          </h5>
          {completedTasks.map((task) => (
            <div
              key={task.id}
              className="p-2.5 rounded-md bg-muted/40 flex items-center justify-between gap-2"
            >
              <span className="text-xs text-muted-foreground line-through truncate">
                {task.title}
              </span>
              <CheckCircle2 className="h-3.5 w-3.5 text-status-working flex-shrink-0" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberTaskDetails;
