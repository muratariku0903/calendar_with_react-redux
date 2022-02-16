// カレンダーのstate
export type CalendarState = {
    year: number;
    month: number;
}

// おそらく、ここに予定のstateが加わることであろう。


// アプリ全体の表示を切り替えられるstateがあれば便利だね。
//  stateは最小限にしたい

// 全体のstate
export type State = {
    calendar: CalendarState;
}
