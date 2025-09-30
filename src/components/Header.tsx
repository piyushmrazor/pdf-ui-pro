import { useDispatch, useSelector } from 'react-redux';
import { switchRole } from '@/redux/slices/roleSlice';
import { RootState } from '@/redux/store';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Users, User } from 'lucide-react';

const Header = () => {
  const dispatch = useDispatch();
  const { currentRole, currentUser } = useSelector((state: RootState) => state.role);
  const isLead = currentRole === 'lead';

  const handleRoleToggle = () => {
    dispatch(switchRole(isLead ? 'member' : 'lead'));
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
              <Users className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Team Pulse</h1>
              <p className="text-sm text-muted-foreground">Productivity Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-muted">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{currentUser}</span>
            </div>

            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-muted">
              <span className={`text-sm font-medium transition-colors ${!isLead ? 'text-foreground' : 'text-muted-foreground'}`}>
                Member
              </span>
              <Switch checked={isLead} onCheckedChange={handleRoleToggle} />
              <span className={`text-sm font-medium transition-colors ${isLead ? 'text-foreground' : 'text-muted-foreground'}`}>
                Lead
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
