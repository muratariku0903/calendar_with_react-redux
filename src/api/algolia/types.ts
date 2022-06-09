import { Schedule, User } from '../../redux/stateTypes';

type SearchedScheduleHighlightResultItem<T> = {
    matchLevel: string;
    matchedWords: any[];
    value: T;
}

export type SearchedScheduleHighlightResult = {
    id: SearchedScheduleHighlightResultItem<Schedule['id']>;
    title: SearchedScheduleHighlightResultItem<Schedule['title']>;
    date: SearchedScheduleHighlightResultItem<Schedule['date']>;
    time: { start: SearchedScheduleHighlightResultItem<Schedule['time']['start']>, end: SearchedScheduleHighlightResultItem<Schedule['time']['end']> };
    location: SearchedScheduleHighlightResultItem<Schedule['location']>;
    description: SearchedScheduleHighlightResultItem<Schedule['description']>;
    userId: SearchedScheduleHighlightResultItem<User['id']>;
}

export type SearchedSchedule = Schedule & { userId: User['id'] };
