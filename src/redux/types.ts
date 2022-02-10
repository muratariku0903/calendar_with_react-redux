// カレンダーのstate
export type CalendarState = {
    year: number;
    month: number;
    currentDay: number;
}

// アプリ全体の表示を切り替えられるstateがあれば便利だね。

// 全体のstate
export type State = {
    calendar: CalendarState;
}
