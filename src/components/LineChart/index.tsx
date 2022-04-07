import { addMonths, format } from 'date-fns';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import CustomizedLabel from './CustomizedChartItems/CustomizedLabels';
import CustomizedTooltipStyles from './CustomizedChartItems/CustomizedTooltip';

const LineChartComponent = ({ totalCost, percentage }: any) => {
  const computeData = () => {
    const TOTAL_MONTHS = 12;
    const DATE_FORMATTER = 'MMM';
    let data = [];
    let cost = 0;
    let date = '';
    for (let month = 0; month < TOTAL_MONTHS; month++) {
      // current month
      if (month === 0) {
        cost += totalCost;
        date = format(new Date(), DATE_FORMATTER);
      } else {
        cost = cost + cost * (percentage / 100);
        date = format(addMonths(new Date(), month), DATE_FORMATTER);
      }
      // round to two decimal point
      cost = Math.round(cost * 100) / 100;
      data.push({
        COST: cost,
        DATE: date,
      });
    }
    return data;
  };

  return (
    <ResponsiveContainer>
      <LineChart
        data={computeData()}
        margin={{
          top: 20,
          right: 40,
          left: 40,
          bottom: 20,
        }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis axisLine={false} tickLine={false} dataKey='DATE' height={40} />
        <Tooltip {...CustomizedTooltipStyles} />
        <Legend
          wrapperStyle={{ bottom: '0px', color: '#50a14f' }}
          payload={[{ value: `* Assuming ${percentage}% increase per month`, type: 'line', id: 'ID01' }]}
        />
        <Line type='monotone' dataKey='COST' stroke='#50a14f' {...{ label: <CustomizedLabel /> }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
