import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectAllMembers } from '@/redux/selectors';
import { assignTask } from '@/redux/slices/membersSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

const TaskForm = () => {
  const dispatch = useAppDispatch();
  const members = useAppSelector(selectAllMembers);
  const [selectedMember, setSelectedMember] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMember || !taskTitle || !dueDate) {
      toast.error('Please fill in all fields');
      return;
    }

    dispatch(assignTask({
      memberId: selectedMember,
      task: {
        title: taskTitle,
        dueDate,
        progress: 0,
        completed: false,
      },
    }));

    const memberName = members.find(m => m.id === selectedMember)?.name;
    toast.success(`Task assigned to ${memberName}`);
    
    setTaskTitle('');
    setDueDate('');
    setSelectedMember('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Assign New Task</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Create and assign tasks to team members</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="member" className="text-xs sm:text-sm">Team Member</Label>
            <Select value={selectedMember} onValueChange={setSelectedMember}>
              <SelectTrigger id="member" className="h-9 sm:h-10">
                <SelectValue placeholder="Select a member" />
              </SelectTrigger>
              <SelectContent>
                {members.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="title" className="text-xs sm:text-sm">Task Title</Label>
            <Input
              id="title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Enter task description"
              className="h-9 sm:h-10 text-sm"
            />
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="dueDate" className="text-xs sm:text-sm">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="h-9 sm:h-10 text-sm"
            />
          </div>

          <Button type="submit" className="w-full h-9 sm:h-10">
            <PlusCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
            <span className="text-sm sm:text-base">Assign Task</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TaskForm;
