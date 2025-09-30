import { Member } from '@/redux/slices/membersSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import StatusBadge from './StatusBadge';
import { CheckCircle2, Circle, Calendar } from 'lucide-react';

interface MemberCardProps {
  member: Member;
}

const MemberCard = ({ member }: MemberCardProps) => {
  const activeTasks = member.tasks.filter(t => !t.completed);
  const completedTasks = member.tasks.filter(t => t.completed);

  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-3 space-y-0">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12 sm:h-14 sm:w-14 border-2 border-border flex-shrink-0">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback className="text-sm sm:text-base">
              {member.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-sm sm:text-base truncate">{member.name}</CardTitle>
                <p className="text-xs text-muted-foreground truncate">{member.email}</p>
              </div>
              <StatusBadge status={member.status} className="flex-shrink-0" />
            </div>

            <div className="flex items-center gap-3 mt-2 text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Circle className="h-3 w-3 text-primary flex-shrink-0" />
                <span>{activeTasks.length} Active</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <CheckCircle2 className="h-3 w-3 text-status-working flex-shrink-0" />
                <span>{completedTasks.length} Done</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Active Tasks */}
        {activeTasks.length > 0 && (
          <>
            <Separator className="mb-3" />
            <div className="space-y-2.5">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Active Tasks
              </h4>
              {activeTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-2.5 rounded-md border border-border bg-muted/30 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs sm:text-sm font-medium text-foreground flex-1 line-clamp-2">
                      {task.title}
                    </p>
                    <span className="text-xs font-semibold text-primary flex-shrink-0">
                      {task.progress}%
                    </span>
                  </div>
                  
                  <Progress value={task.progress} className="h-1.5" />
                  
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <>
            <Separator className="my-3" />
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-status-working uppercase tracking-wide flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3" />
                Completed
              </h4>
              {completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-2 rounded-md bg-muted/20 flex items-center justify-between gap-2"
                >
                  <span className="text-xs text-muted-foreground line-through truncate flex-1">
                    {task.title}
                  </span>
                  <CheckCircle2 className="h-3 w-3 text-status-working flex-shrink-0" />
                </div>
              ))}
            </div>
          </>
        )}

        {/* No Tasks */}
        {member.tasks.length === 0 && (
          <>
            <Separator className="mb-3" />
            <div className="text-center py-4 text-muted-foreground">
              <Circle className="h-8 w-8 mx-auto mb-2 opacity-20" />
              <p className="text-xs">No tasks assigned</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MemberCard;
