import { API_KEY, CLIENT_ID, GOOGLE_CALENDAR_ID, DISCOVERY_DOC } from "./config";
import { JapaneseHoliday } from "./types";
import dayjs, { Dayjs } from 'dayjs';


class GoogleCalendarApi {
    private API_KEY = API_KEY;
    private CLIENT_ID = CLIENT_ID;
    private DISCOVERY_DOC = DISCOVERY_DOC;
    private GOOGLE_CALENDAR_ID = GOOGLE_CALENDAR_ID;
    private REQUEST_PATH = '';

    public async fetchHolidays(year: number, month: number): Promise<JapaneseHoliday[]> {
        this.setRequestPath(year, month);
        return new Promise((resolve, reject) => {
            if (gapi) {
                gapi.load('client:auth2', () => {
                    gapi.client.init({
                        apiKey: this.API_KEY,
                        clientId: this.CLIENT_ID,
                    }).then(() => {
                        console.log(this.REQUEST_PATH);
                        gapi.client.request({ path: this.REQUEST_PATH })
                            .then(res => {
                                resolve(res.result.items);
                            })
                            .catch(() => {
                                reject('Failed request for' + this.getRequestPath());
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

    private setRequestPath(year: number, month: number): void {
        const encode = encodeURIComponent(this.GOOGLE_CALENDAR_ID);
        const { start, end } = this.getTimeZone(dayjs(`${year}-${month}`));
        const param = this.getParam(start, end);
        this.REQUEST_PATH = `${this.DISCOVERY_DOC}${encode}/events?${param}`;
    }

    private getRequestPath(): string {
        return this.REQUEST_PATH;
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
