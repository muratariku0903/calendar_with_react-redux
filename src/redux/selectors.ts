import { State } from './types';
import { weekCnt } from '../constants';

// 二次元配列でカレンダーのセル群を取得したい

export type CalendarCell = number | null;

export const getCalendarCells = (store: State): CalendarCell[][] => {
    const { year, month } = store.calendar;
    const prevBlankCnt = new Date(year, month, 1).getDay();
    const nextBlankCnt = weekCnt - new Date(year, month + 1, 0).getDay() - 1;
    const lastDate = new Date(year, month + 1, 0).getDate();
    const totalCellCnt = prevBlankCnt + lastDate + nextBlankCnt;
    const calendarCells: CalendarCell[][] = [];
    let cells: CalendarCell[] = [];
    for (let i = 0; i < prevBlankCnt; i++) cells.push(null);
    // これさ、-prevBlankCnt + 1の方がきれいじゃない？
    // あと、weekではなく、cellな気がするけど。
    for (let week = prevBlankCnt + 1, date = 1; week <= totalCellCnt; week++, date++) {
        cells.push(date > lastDate ? null : date);
        if (week % 7 === 0) {
            calendarCells.push(cells);
            cells = [];
        }
    }

    return calendarCells;
}

// 日にちから曜日を取得する関数も用意したほうが良いかも
