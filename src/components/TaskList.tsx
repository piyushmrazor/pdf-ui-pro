import { useDispatch, useSelector } from 'react-redux';
import { updateTaskProgress } from '@/redux/slices/membersSlice';
import { RootState } from '@/redux/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, CheckCircle2, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';

const TaskList = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.role);
  const members = useSelector((state: RootState) => state.members.members);
  const currentMember = members.find(m => m.name === currentUser);

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

  const activeTasks = currentMember.tasks.filter(t => !t.completed);
  const completedTasks = currentMember.tasks.filter(t => t.completed);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Tasks</CardTitle>
        <CardDescription>
          {activeTasks.length} active • {completedTasks.length} completed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentMember.tasks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No tasks assigned yet</p>
          </div>
        ) : (
          <>
            {activeTasks.map((task) => (
              <div key={task.id} className="p-4 rounded-lg border border-border bg-card space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">{task.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-primary">{task.progress}%</span>
                </div>

                <Progress value={task.progress} className="h-2" />

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleProgressChange(task.id, -10)}
                    disabled={task.progress <= 0}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleProgressChange(task.id, 10)}
                    disabled={task.progress >= 100}
                    className="flex-1"
                  >
                    <Plus className="h-3.5 w-3.5 mr-1" />
                    Update Progress
                  </Button>
                </div>
              </div>
            ))}

            {completedTasks.length > 0 && (
              <div className="pt-4 border-t border-border">
                <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-status-working" />
                  Completed Tasks
                </h4>
                {completedTasks.map((task) => (
                  <div key={task.id} className="p-3 rounded-lg bg-muted/50 mb-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground line-through">{task.title}</span>
                      <CheckCircle2 className="h-4 w-4 text-status-working" />
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
