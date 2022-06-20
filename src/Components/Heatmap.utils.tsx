import { DataProp, calendarData } from "./Heatmap";


function getRange(count: number) {
    return Array.from({ length: count }, (_, i) => i);
}
function shiftDate(date: any, numDays: number): string {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate.toLocaleDateString('en-CA');
}

export const parseValues = (values: DataProp["data"], year: number): calendarData[] => {
    const parsedValues: any = [];
    let heatMapData: calendarData[] = [{ date: new Date("1999-12-31"), count: 0, success: 0, failed: 0 }];
    const lastDay = new Date(year, 11, 31);
    //Add default values for each day in the year
    getRange(365).map(index => {
        const date = shiftDate(lastDay, -index);
        parsedValues[date] = { success: 0, failed: 0, sumSuccess:0, sumFailed: 0}
    });

    values.forEach(element => {
        // Defensive code
        if (!parsedValues[element?.date]) {
            parsedValues[element?.date] = { success: 0, failed: 0, sumSuccess:0, sumFailed: 0 }
        }
        if (element?.transactionType === 'success') {
            parsedValues[element?.date].success += 1;
            parsedValues[element?.date].sumSuccess += element?.amount;
        }
        else {
            parsedValues[element?.date].failed += 1;
            parsedValues[element?.date].sumFailed += element?.amount;
        }
    });

    for (var key in parsedValues) {
        const element = parsedValues[key];
        const data = { count: element.sumSuccess - element.sumFailed, date: new Date(key), success: element.success, failed: element.failed, sumSuccess: element.sumSuccess, sumFailed: element.sumFailed };
        heatMapData.push(data);
    }
    return heatMapData;
}

export const getColor = (value: number, maxValue: number) => Math.round((value * 5) / maxValue);