import StatusSelector from './StatusSelector';
import TaskList from './TaskList';

const TeamMemberView = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
      <StatusSelector />
      <TaskList />
    </div>
  );
};

export default TeamMemberView;
