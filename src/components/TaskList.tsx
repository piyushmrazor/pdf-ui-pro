import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectCurrentMember,
  selectCurrentMemberActiveTasks,
  selectCurrentMemberCompletedTasks,
} from '@/redux/selectors';
import { updateTaskProgress } from '@/redux/slices/membersSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, CheckCircle2, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';

const TaskList = () => {
  const dispatch = useAppDispatch();
  const currentMember = useAppSelector(selectCurrentMember);
  const activeTasks = useAppSelector(selectCurrentMemberActiveTasks);
  const completedTasks = useAppSelector(selectCurrentMemberCompletedTasks);

  if (!currentMember) return null;

  const handleProgressChange = (taskId: string, delta: number) => {
    const task = currentMember.tasks.find(t => t.id === taskId);
    if (!task) return;

    const newProgress = task.progress + delta;
    dispatch(updateTaskProgress({
      memberId: currentMember.id,
      taskId,
      progress: newProgress,
    }));

    if (newProgress >= 100) {
      toast.success('Task completed! 🎉');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Your Tasks</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          {activeTasks.length} active • {completedTasks.length} completed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        {currentMember.tasks.length === 0 ? (
          <div className="text-center py-8 sm:py-12 text-muted-foreground">
            <CheckCircle2 className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-2 sm:mb-3 opacity-20" />
            <p className="text-sm sm:text-base">No tasks assigned yet</p>
          </div>
        ) : (
          <>
            {activeTasks.map((task) => (
              <div key={task.id} className="p-3 sm:p-4 rounded-lg border border-border bg-card space-y-2 sm:space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground mb-1 text-sm sm:text-base line-clamp-2">{task.title}</h4>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                      <span className="truncate">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-primary flex-shrink-0">{task.progress}%</span>
                </div>

                <Progress value={task.progress} className="h-2" />

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleProgressChange(task.id, -10)}
                    disabled={task.progress <= 0}
                    aria-label="Decrease progress by 10%"
                    className="h-8 sm:h-9 px-2 sm:px-3"
                  >
                    <Minus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleProgressChange(task.id, 10)}
                    disabled={task.progress >= 100}
                    className="flex-1 h-8 sm:h-9"
                    aria-label="Increase progress by 10%"
                  >
                    <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                    <span className="hidden sm:inline">Update </span>Progress
                  </Button>
                </div>
              </div>
            ))}

            {completedTasks.length > 0 && (
              <div className="pt-3 sm:pt-4 border-t border-border">
                <h4 className="text-xs sm:text-sm font-semibold text-muted-foreground mb-2 sm:mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-status-working" />
                  Completed Tasks
                </h4>
                {completedTasks.map((task) => (
                  <div key={task.id} className="p-2.5 sm:p-3 rounded-lg bg-muted/50 mb-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm text-muted-foreground line-through truncate">{task.title}</span>
                      <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-status-working flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskList;
