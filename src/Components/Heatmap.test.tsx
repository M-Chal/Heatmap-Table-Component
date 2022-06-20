import { getColor, parseValues } from "./Heatmap.utils";
describe('ParseValues', function () {
    it('should parse date correctly count 1', function () {
        const parsedValues = parseValues([{ date: "1999-12-31", transactionType: "success" , amount: 100}], 1999)
        const valueCount = parsedValues[1].count;
        expect(valueCount).toBe(100)
    });
    it('should parse date correctly count 2', function () {
        // @ts-ignore  
        const parsedValues = parseValues([{ date: "1999-12-31", transactionType: "success", amount: 100 }, { date: "1999-12-31", transactionType: "success", amount: 100}], 1999)
        const valueCount = parsedValues[1].count;
        expect(valueCount).toBe(200)
    });
    it('should parse date correctly count -1', function () {
        const parsedValues = parseValues([{ date: "1999-12-31", transactionType: "failed", amount: 100 }], 1999)
        const valueCount = parsedValues[1].count;
        expect(valueCount).toBe(-100)
    });
});

describe('GetColor', function () {
    it('Get max color 5 5', function () {
        const value = getColor(5, 5);
        expect(value).toBe(5)
    });
    it('Get max color 25 5', function () {
        const value = getColor(5, 25);
        expect(value).toBe(1)
    });
});