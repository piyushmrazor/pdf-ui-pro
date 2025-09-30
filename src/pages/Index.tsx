import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Header from '@/components/Header';
import TeamLeadView from '@/components/TeamLeadView';
import TeamMemberView from '@/components/TeamMemberView';

const Index = () => {
  const currentRole = useSelector((state: RootState) => state.role.currentRole);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {currentRole === 'lead' ? <TeamLeadView /> : <TeamMemberView />}
      </main>
    </div>
  );
};

export default Index;
