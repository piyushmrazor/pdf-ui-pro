import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { assignTask } from '@/redux/slices/membersSlice';
import { RootState } from '@/redux/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

const TaskForm = () => {
  const dispatch = useDispatch();
  const members = useSelector((state: RootState) => state.members.members);
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
        <CardTitle>Assign New Task</CardTitle>
        <CardDescription>Create and assign tasks to team members</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="member">Team Member</Label>
            <Select value={selectedMember} onValueChange={setSelectedMember}>
              <SelectTrigger id="member">
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

          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Enter task description"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <Button type="submit" className="w-full">
            <PlusCircle className="h-4 w-4 mr-2" />
            Assign Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TaskForm;
