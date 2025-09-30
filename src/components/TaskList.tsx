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
            {/* Active Tasks Section */}
            {activeTasks.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  Active Tasks ({activeTasks.length})
                </h4>
                {activeTasks.map((task) => (
                  <div key={task.id} className="p-3 sm:p-4 rounded-lg border-2 border-border bg-card hover:border-primary/50 transition-all space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base line-clamp-2">{task.title}</h4>
                        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span className="truncate">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-lg sm:text-xl font-bold text-primary flex-shrink-0">{task.progress}%</span>
                        <span className="text-xs text-muted-foreground">Progress</span>
                      </div>
                    </div>

                    <Progress value={task.progress} className="h-2.5" />

                    <div className="flex items-center gap-2 pt-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleProgressChange(task.id, -10)}
                        disabled={task.progress <= 0}
                        aria-label="Decrease progress by 10%"
                        className="h-9 sm:h-10 px-3 sm:px-4 hover:bg-destructive/10 hover:border-destructive/50"
                      >
                        <Minus className="h-4 w-4 sm:h-4 sm:w-4 mr-1" />
                        <span className="text-xs sm:text-sm">Decrease</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => handleProgressChange(task.id, 10)}
                        disabled={task.progress >= 100}
                        className="flex-1 h-9 sm:h-10 bg-primary hover:bg-primary/90"
                        aria-label="Increase progress by 10%"
                      >
                        <Plus className="h-4 w-4 sm:h-4 sm:w-4 mr-1.5" />
                        <span className="text-xs sm:text-sm font-medium">Update Progress (+10%)</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Completed Tasks Section */}
            {completedTasks.length > 0 && (
              <div className="pt-3 sm:pt-4 border-t border-border space-y-3">
                <h4 className="text-sm font-semibold text-status-working flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Completed Tasks ({completedTasks.length})
                </h4>
                {completedTasks.map((task) => (
                  <div key={task.id} className="p-3 sm:p-3.5 rounded-lg bg-status-working/10 border border-status-working/20 hover:bg-status-working/15 transition-colors">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <span className="text-sm sm:text-base text-muted-foreground line-through block truncate font-medium">
                          {task.title}
                        </span>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground/70">
                          <Calendar className="h-3 w-3" />
                          <span>Completed on: {new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-status-working flex-shrink-0" />
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
