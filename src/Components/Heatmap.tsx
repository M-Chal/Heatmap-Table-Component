// @ts-ignore  
import CalendarHeatmap from "react-calendar-heatmap";
// @ts-ignore  
import ReactTooltip from "react-tooltip";

import "react-calendar-heatmap/dist/styles.css";
import "./styles.css";
import { getColor, parseValues } from "./Heatmap.utils";

export type DataProp = {
  year: number,
  data: [{
      amount: number; date: string, transactionType: 'success' | 'failed' 
  }]
}
export type calendarData = {
  success?: number, failed?: number, count?: number, date?: Date, sumSuccess?: number, sumFailed?: number
}

const Heatmap = ({
  year = 2022,
  data
}: DataProp) => {
  //Creating a list of all days in a year and filling out each with the required data
  const parsedValues = parseValues(data, year);
  //Picking out all the net transactions from each day
  const valuesCount = parsedValues.map(value => value?.count);
  //Getting the highest and lowest value from the array
  const maxValue = Math.max(...valuesCount as number[]);
  const minValue = Math.min(...valuesCount as number[]);

  return (
    <div style={{ width: '90%' }}>
      <CalendarHeatmap
        startDate={new Date(year, 0, 0)}
        endDate={new Date(year, 11, 31)}
        values={parsedValues}
        showWeekdayLabels={true}
        weekdayLabels={['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']}
        classForValue={(value: any) => {
          if (!value || value?.count === 0) {
            return "color-empty";
          }
          if (value?.count > 0) {
            return `color-green-${getColor(value?.count, maxValue)}`;
          }
          else {
            return `color-red-${getColor(value?.count, minValue)}`;
          }

        }}
        tooltipDataAttrs={(value: any) => {
          return {
            'data-tip': value?.date ? `${value?.date?.toISOString()?.slice(0, 10)} £${Math.round(value?.sumSuccess || 0)} has succeeded in ${value?.success || 0} transactions and £${Math.round(value?.sumFailed || 0)} failed in ${value?.failed || 0} transactions` : 'No data available this day',
          };
        }}
      />
      <ReactTooltip />
    </div>
  );
}

export default Heatmap;
