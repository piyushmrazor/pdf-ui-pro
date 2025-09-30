import StatusSelector from './StatusSelector';
import TaskList from './TaskList';
import AllTasksView from './AllTasksView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Users } from 'lucide-react';

const TeamMemberView = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
      <StatusSelector />
      
      <Tabs defaultValue="my-tasks" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="my-tasks" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            My Tasks
          </TabsTrigger>
          <TabsTrigger value="team-tasks" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Team Tasks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-tasks" className="mt-4">
          <TaskList />
        </TabsContent>

        <TabsContent value="team-tasks" className="mt-4">
          <AllTasksView />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamMemberView;
