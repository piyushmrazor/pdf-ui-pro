import { useDispatch, useSelector } from 'react-redux';
import { updateMemberStatus, Status } from '@/redux/slices/membersSlice';
import { RootState } from '@/redux/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Coffee, Users, WifiOff } from 'lucide-react';

const StatusSelector = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.role);
  const members = useSelector((state: RootState) => state.members.members);
  const currentMember = members.find(m => m.name === currentUser);

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
        <CardTitle>Update Your Status</CardTitle>
        <CardDescription>Let your team know what you're up to</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {statuses.map((status) => (
            <Button
              key={status.value}
              variant={currentMember.status === status.value ? 'default' : 'outline'}
              className={`h-auto py-4 flex flex-col gap-2 ${
                currentMember.status === status.value
                  ? 'bg-primary hover:bg-primary/90'
                  : 'hover:bg-muted'
              }`}
              onClick={() => handleStatusChange(status.value)}
            >
              {status.icon}
              <span className="text-sm font-medium">{status.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusSelector;
