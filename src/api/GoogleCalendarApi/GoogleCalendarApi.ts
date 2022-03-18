import { API_KEY, CLIENT_ID, GOOGLE_CALENDAR_ID, DISCOVERY_DOC } from "./config";
import { JapaneseHoliday } from "./types";
import dayjs, { Dayjs } from 'dayjs';


class GoogleCalendarApi {
    private API_KEY = API_KEY;
    private CLIENT_ID = CLIENT_ID;
    private DISCOVERY_DOC = DISCOVERY_DOC;
    private GOOGLE_CALENDAR_ID = GOOGLE_CALENDAR_ID;

    public async fetchMonthHolidays(year: number, month: number): Promise<JapaneseHoliday[]> {
        return new Promise((resolve, reject) => {
            if (gapi) {
                gapi.load('client:auth2', () => {
                    gapi.client.init({
                        apiKey: this.API_KEY,
                        clientId: this.CLIENT_ID,
                    }).then(() => {
                        const requestPath = this.createRequestPath(year, month);
                        gapi.client.request({ path: requestPath })
                            .then(res => {
                                resolve(res.result.items);
                            })
                            .catch(() => {
                                reject('Failed request for' + requestPath);
                            });
                    }).catch(() => {
                        reject('Failed to connected Google Calendar API');
                    });
                });
            } else {
                reject('Failed to connected Internet');
            }
        });
    }

    public async fetchHolidays(year: number, month: number): Promise<JapaneseHoliday[]> {
        const yearMonthObjs = this.getYearMonthObjs(year, month);
        let holidays: JapaneseHoliday[] = [];
        for (const { year, month } of yearMonthObjs) {
            const monthHolidays = await this.fetchMonthHolidays(year, month);
            holidays = holidays.concat(monthHolidays);
        }
        return holidays;
    }

    private getYearMonthObjs(year: number, month: number): { year: number, month: number }[] {
        let prevMonth = month - 1, nextMonth = month + 1;
        let nextYear = year, prevYear = year;
        if (month === 1) {
            prevMonth = 12;
            prevYear--;
        }
        if (month === 12) {
            nextMonth = 1;
            nextYear++;
        }
        return [
            { year: prevYear, month: prevMonth },
            { year: year, month: month },
            { year: nextYear, month: nextMonth },
        ];
    }

    private createRequestPath(year: number, month: number): string {
        const encode = encodeURIComponent(this.GOOGLE_CALENDAR_ID);
        const { start, end } = this.getTimeZone(dayjs(`${year}-${month}`));
        const param = this.getParam(start, end);
        return `${this.DISCOVERY_DOC}${encode}/events?${param}`;
    }

    private getParam(start: string, end: string): string {
        return `timeMin=${start}&timeMax=${end}&singleEvents=true`;
    }

    private getTimeZone(date: Dayjs | number): { start: string, end: string } {
        return {
            start: this.getTimeText(date),
            end: this.getTimeText(dayjs(date).add(1, 'month')),
        }
    }

    public getTimeText(date: Dayjs | number): string {
        const pad = (t: number) => ('00' + t).slice(-2);
        return `${dayjs(date).year()}-${pad(dayjs(date).month() + 1)}-${pad(dayjs(date).date())}T00:00:00Z`;
    }
}

export default new GoogleCalendarApi;
