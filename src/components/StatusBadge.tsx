import { Status } from '@/redux/slices/membersSlice';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const statusStyles = {
    Working: 'bg-status-working/10 text-status-working border-status-working/20',
    Break: 'bg-status-break/10 text-status-break border-status-break/20',
    Meeting: 'bg-status-meeting/10 text-status-meeting border-status-meeting/20',
    Offline: 'bg-status-offline/10 text-status-offline border-status-offline/20',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border',
        statusStyles[status],
        className
      )}
    >
      <span className={cn('w-2 h-2 rounded-full mr-2', {
        'bg-status-working': status === 'Working',
        'bg-status-break': status === 'Break',
        'bg-status-meeting': status === 'Meeting',
        'bg-status-offline': status === 'Offline',
      })} />
      {status}
    </span>
  );
};

export default StatusBadge;
