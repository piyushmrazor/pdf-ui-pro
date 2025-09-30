import { useAppSelector } from '@/redux/hooks';
import { selectIsLead } from '@/redux/selectors';
import Header from '@/components/Header';
import TeamLeadView from '@/components/TeamLeadView';
import TeamMemberView from '@/components/TeamMemberView';

const Index = () => {
  const isLead = useAppSelector(selectIsLead);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
        {isLead ? <TeamLeadView /> : <TeamMemberView />}
      </main>
    </div>
  );
};

export default Index;
