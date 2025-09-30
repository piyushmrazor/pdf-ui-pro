import { useAppSelector } from '@/redux/hooks';
import { selectStatusChartData } from '@/redux/selectors';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const TeamStatusChart = () => {
  // Use memoized selector for chart data
  const data = useAppSelector(selectStatusChartData);

  const COLORS = {
    Working: 'hsl(var(--status-working))',
    Break: 'hsl(var(--status-break))',
    Meeting: 'hsl(var(--status-meeting))',
    Offline: 'hsl(var(--status-offline))',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Team Status Overview</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Current distribution of team member statuses</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => {
                const isMobile = window.innerWidth < 640;
                return isMobile 
                  ? `${((percent as number) * 100).toFixed(0)}%`
                  : `${name} ${((percent as number) * 100).toFixed(0)}%`;
              }}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem',
                fontSize: '0.875rem'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '0.75rem' }}
              iconSize={12}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TeamStatusChart;
