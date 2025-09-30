import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectCurrentMember } from '@/redux/selectors';
import { updateMemberStatus, Status } from '@/redux/slices/membersSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Coffee, Users, WifiOff } from 'lucide-react';

const StatusSelector = () => {
  const dispatch = useAppDispatch();
  const currentMember = useAppSelector(selectCurrentMember);

  if (!currentMember) return null;

  const statuses: { value: Status; label: string; icon: React.ReactNode; color: string }[] = [
    { value: 'Working', label: 'Working', icon: <Activity className="h-5 w-5" />, color: 'status-working' },
    { value: 'Break', label: 'On Break', icon: <Coffee className="h-5 w-5" />, color: 'status-break' },
    { value: 'Meeting', label: 'In Meeting', icon: <Users className="h-5 w-5" />, color: 'status-meeting' },
    { value: 'Offline', label: 'Offline', icon: <WifiOff className="h-5 w-5" />, color: 'status-offline' },
  ];

  const handleStatusChange = (status: Status) => {
    dispatch(updateMemberStatus({ memberId: currentMember.id, status }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Update Your Status</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Let your team know what you're up to</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {statuses.map((status) => (
            <Button
              key={status.value}
              variant={currentMember.status === status.value ? 'default' : 'outline'}
              className={`h-auto py-3 sm:py-4 flex flex-col gap-1.5 sm:gap-2 transition-all ${
                currentMember.status === status.value
                  ? 'bg-primary hover:bg-primary/90 shadow-md'
                  : 'hover:bg-muted'
              }`}
              onClick={() => handleStatusChange(status.value)}
              aria-pressed={currentMember.status === status.value}
              aria-label={`Set status to ${status.label}`}
            >
              <span className="scale-90 sm:scale-100">{status.icon}</span>
              <span className="text-xs sm:text-sm font-medium">{status.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusSelector;
