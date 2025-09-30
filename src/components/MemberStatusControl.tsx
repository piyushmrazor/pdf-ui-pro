import { useAppDispatch } from '@/redux/hooks';
import { updateMemberStatus, Status } from '@/redux/slices/membersSlice';
import { Button } from '@/components/ui/button';
import { Activity, Coffee, Users, WifiOff } from 'lucide-react';
import { toast } from 'sonner';

interface MemberStatusControlProps {
  memberId: string;
  memberName: string;
  currentStatus: Status;
}

const MemberStatusControl = ({ memberId, memberName, currentStatus }: MemberStatusControlProps) => {
  const dispatch = useAppDispatch();

  const statuses: { value: Status; label: string; icon: React.ReactNode; color: string }[] = [
    { value: 'Working', label: 'Working', icon: <Activity className="h-3.5 w-3.5" />, color: 'status-working' },
    { value: 'Break', label: 'Break', icon: <Coffee className="h-3.5 w-3.5" />, color: 'status-break' },
    { value: 'Meeting', label: 'Meeting', icon: <Users className="h-3.5 w-3.5" />, color: 'status-meeting' },
    { value: 'Offline', label: 'Offline', icon: <WifiOff className="h-3.5 w-3.5" />, color: 'status-offline' },
  ];

  const handleStatusChange = (status: Status) => {
    if (status === currentStatus) return;
    
    dispatch(updateMemberStatus({ memberId, status }));
    toast.success(`${memberName}'s status updated to ${status}`);
  };

  return (
    <div className="grid grid-cols-4 gap-1.5">
      {statuses.map((status) => (
        <Button
          key={status.value}
          variant={currentStatus === status.value ? 'default' : 'outline'}
          size="sm"
          className={`h-8 px-2 flex flex-col items-center justify-center gap-0.5 text-xs transition-all ${
            currentStatus === status.value
              ? 'bg-primary hover:bg-primary/90 shadow-sm'
              : 'hover:bg-muted'
          }`}
          onClick={() => handleStatusChange(status.value)}
          aria-label={`Set ${memberName}'s status to ${status.label}`}
          aria-pressed={currentStatus === status.value}
        >
          <span className="scale-90">{status.icon}</span>
          <span className="text-[10px] leading-none">{status.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default MemberStatusControl;
