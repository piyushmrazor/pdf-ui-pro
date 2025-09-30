import { Member } from '@/redux/slices/membersSlice';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import StatusBadge from './StatusBadge';
import { CheckCircle2, Circle } from 'lucide-react';

interface MemberCardProps {
  member: Member;
}

const MemberCard = ({ member }: MemberCardProps) => {
  const activeTasks = member.tasks.filter(t => !t.completed).length;
  const completedTasks = member.tasks.filter(t => t.completed).length;

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <Avatar className="h-12 w-12 sm:h-14 sm:w-14 border-2 border-border flex-shrink-0">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback className="text-sm sm:text-base">
              {member.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate text-sm sm:text-base">{member.name}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground truncate">{member.email}</p>
              </div>
              <StatusBadge status={member.status} className="self-start" />
            </div>

            <div className="flex items-center gap-3 sm:gap-4 mt-2 sm:mt-3 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Circle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                <span>{activeTasks} Active</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-status-working flex-shrink-0" />
                <span>{completedTasks} Done</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberCard;
