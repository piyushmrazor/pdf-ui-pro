import { useAppDispatch } from '@/redux/hooks';
import { updateTaskProgress } from '@/redux/slices/membersSlice';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface TaskProgressControlProps {
  memberId: string;
  taskId: string;
  currentProgress: number;
  taskTitle: string;
  memberName: string;
  compact?: boolean;
}

const TaskProgressControl = ({ 
  memberId, 
  taskId, 
  currentProgress, 
  taskTitle,
  memberName,
  compact = false 
}: TaskProgressControlProps) => {
  const dispatch = useAppDispatch();

  const handleProgressChange = (delta: number) => {
    const newProgress = currentProgress + delta;
    
    dispatch(updateTaskProgress({
      memberId,
      taskId,
      progress: newProgress,
    }));

    if (newProgress >= 100) {
      toast.success(`Task completed for ${memberName}! 🎉`);
    } else if (delta > 0) {
      toast.success(`Progress updated to ${newProgress}%`);
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleProgressChange(-10)}
        disabled={currentProgress <= 0}
        aria-label="Decrease progress by 10%"
        className={compact ? "h-7 w-7 p-0" : "h-8 px-2"}
      >
        <Minus className="h-3 w-3" />
      </Button>
      
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleProgressChange(10)}
        disabled={currentProgress >= 100}
        className={compact ? "h-7 flex-1 px-2 text-xs" : "h-8 flex-1"}
        aria-label="Increase progress by 10%"
      >
        <Plus className="h-3 w-3 mr-1" />
        {compact ? '+10%' : 'Update'}
      </Button>
    </div>
  );
};

export default TaskProgressControl;
