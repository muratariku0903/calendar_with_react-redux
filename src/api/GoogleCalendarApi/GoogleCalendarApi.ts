import { API_KEY, CLIENT_ID, GOOGLE_CALENDAR_ID, DISCOVERY_DOC, SCOPE } from "./config";
import { JapaneseHoliday } from "./types";
import { getMonth } from '../../services/calendar';
import dayjs, { Dayjs } from 'dayjs';


class GoogleCalendarApi {
    private API_KEY = API_KEY;
    private CLIENT_ID = CLIENT_ID;
    private DISCOVERY_DOC = DISCOVERY_DOC;
    private GOOGLE_CALENDAR_ID = GOOGLE_CALENDAR_ID;
    private SCOPE = SCOPE;

    public async fetchMonthHolidays(year: number, month: number): Promise<JapaneseHoliday[]> {
        return new Promise((resolve, reject) => {
            if (gapi) {
                gapi.load('client:auth2', () => {
                    gapi.client.init({
                        apiKey: this.API_KEY,
                        clientId: this.CLIENT_ID,
                        // scope: this.SCOPE,
                    }).then(() => {
                        const requestPath = this.createRequestPath(year, month);
                        gapi.client.request({ path: requestPath })
                            .then(res => {
                                console.log(`Fetch holidays of ${year}:${month} from api.`);
                                resolve(res.result.items);
                            })
                            .catch(e => {
                                reject(`Failed request of ${requestPath} because: ${e}`);
                            });
                    }).catch(() => {
                        reject('Failed to connected Google Calendar API.');
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
            try {
                const monthHolidays = await this.fetchMonthHolidays(year, month);
                holidays = holidays.concat(monthHolidays);
            } catch (e) {
                throw (`Error fetching prev and next month holiday from api because ${e}`);
            }
        }
        console.log('Fetch prev and next month holidays from api.');
        return holidays;
    }

    private getYearMonthObjs(year: number, month: number): { year: number, month: number }[] {
        return [
            this.getYearMonthObj(year, month - 1),
            this.getYearMonthObj(year, month),
            this.getYearMonthObj(year, month + 1),
        ]
    }

    private getYearMonthObj(year: number, month: number): { year: number, month: number } {
        if (month < 1) {
            year--;
            month = 12;
        } else if (month > 12) {
            year++;
            month = 1;
        }
        return { year, month };
    }

    private createRequestPath(year: number, month: number): string {
        const encode = encodeURIComponent(this.GOOGLE_CALENDAR_ID);
        const { start, end } = this.getTimeZone(getMonth(year, month));
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

    private getTimeText(date: Dayjs | number): string {
        const pad = (t: number) => ('00' + t).slice(-2);
        return `${dayjs(date).year()}-${pad(dayjs(date).month() + 1)}-${pad(dayjs(date).date())}T00:00:00Z`;
    }
}

export default GoogleCalendarApi;
