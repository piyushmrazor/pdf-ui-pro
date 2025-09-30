import { toggleRole } from '@/redux/slices/roleSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectCurrentRole, selectCurrentUser, selectIsLead } from '@/redux/selectors';
import { Switch } from '@/components/ui/switch';
import { Users, User } from 'lucide-react';

const Header = () => {
  const dispatch = useAppDispatch();
  const currentRole = useAppSelector(selectCurrentRole);
  const currentUser = useAppSelector(selectCurrentUser);
  const isLead = useAppSelector(selectIsLead);

  const handleRoleToggle = () => {
    dispatch(toggleRole());
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          {/* Logo and Title */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">Team Pulse</h1>
              <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Productivity Dashboard</p>
            </div>
          </div>

          {/* User Info and Role Toggle */}
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
            {/* Current User */}
            <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-muted flex-shrink-0">
              <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
              <span className="text-xs sm:text-sm font-medium text-foreground truncate max-w-[120px] sm:max-w-none">
                {currentUser}
              </span>
            </div>

            {/* Role Toggle */}
            <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-muted flex-shrink-0">
              <span className={`text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${!isLead ? 'text-foreground' : 'text-muted-foreground'}`}>
                Member
              </span>
              <Switch 
                checked={isLead} 
                onCheckedChange={handleRoleToggle}
                aria-label="Toggle between Member and Lead role"
              />
              <span className={`text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${isLead ? 'text-foreground' : 'text-muted-foreground'}`}>
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
