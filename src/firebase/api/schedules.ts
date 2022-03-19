import { db } from '../firestore';
import { collection, getDocs, setDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { Schedule, DialogSchedule, SchedulesState } from '../../redux/stateTypes';
import { createSchedulesKey } from '../../services/schedules';
import { isSameMonth, getMonth } from '../../services/calendar';
import dayjs from 'dayjs';

const rootCollection = 'schedules';
const monthScheduleCollection = 'monthSchedule';

const fetchSchedules = async (year: number, month: number): Promise<SchedulesState['monthSchedules']> => {
    const monthScheduleKeys = getPrevNextMonthSchedulesKeys(getMonth(year, month).unix());
    const monthScheduleRefs = createCollectionRefs(monthScheduleKeys);
    const schedules: SchedulesState['monthSchedules'] = {};
    for (const ref of monthScheduleRefs) {
        try {
            (await getDocs(ref)).docs.forEach(doc => {
                const schedule = doc.data() as Schedule;
                const key = createSchedulesKey(schedule.date);
                schedules[key] = schedules[key] ? schedules[key].concat(schedule) : [schedule];
            });
            console.log('Fetch schedules from firestore.');
        } catch (e) {
            console.log('Error fetching schedules from firestore.', e);
        }
    }
    return schedules;
}

const addSchedule = async (form: DialogSchedule): Promise<number> => {
    const id = new Date().getTime();
    try {
        const ref = createCollectionRef(getMonthSchedulesKey(form.date));
        await setDoc(doc(ref, String(id)), { ...form, id });
        console.log('Add schedule to firestore.');
    } catch (e) {
        console.log('Error adding schedule to firestore.', e);
    }
    return id;
}

const updateSchedule = async (prevDate: Schedule['date'], schedule: Schedule): Promise<void> => {
    const { id, date } = schedule;
    try {
        if (isSameMonth(date, prevDate)) {
            await updateDoc(createDocRef(getMonthSchedulesKey(date), String(id)), schedule);
        } else {
            await deleteDoc(createDocRef(getMonthSchedulesKey(prevDate), String(id)));
            await setDoc(doc(createCollectionRef(getMonthSchedulesKey(date)), String(id)), schedule);
        }
        console.log('Update schedule of firestore.');
    } catch (e) {
        console.log('Error updating schedule of firestore', e);
    }
}

const deleteSchedule = async (schedule: Schedule): Promise<void> => {
    try {
        await deleteDoc(createDocRef(getMonthSchedulesKey(schedule.date), String(schedule.id)));
        console.log('Delete schedule of firestore')
    } catch (e) {
        console.log('Error deleting schedule of firestore', e)
    }
}

const createCollectionRef = (key: string) => {
    return collection(db, rootCollection, key, monthScheduleCollection);
}

const createCollectionRefs = (keys: string[]) => {
    const refs = [];
    for (const key of keys) {
        refs.push(createCollectionRef(key));
    }
    return refs;
}

const createDocRef = (key: string, id: string) => {
    return doc(db, rootCollection, key, monthScheduleCollection, id);
}

const getPrevNextMonthSchedulesKeys = (stamp: number): string[] => {
    const prevMonthScheduleKey = getMonthSchedulesKey(dayjs.unix(stamp).add(-1, 'month').unix());
    const currMonthScheduleKey = getMonthSchedulesKey(stamp);
    const nextMonthScheduleKey = getMonthSchedulesKey(dayjs.unix(stamp).add(1, 'month').unix());
    return [prevMonthScheduleKey, currMonthScheduleKey, nextMonthScheduleKey];
}

const getMonthSchedulesKey = (stamp: number): string => {
    const date = dayjs.unix(stamp);
    const year = date.year();
    const month = date.month() + 1;
    if (month > 12) {
        return `${year + 1}_${1}`;
    }
    if (month < 1) {
        return `${year - 1}_${12}`;
    }
    return `${year}_${month}`;
}

export const schedulesAPI = { fetchSchedules, addSchedule, updateSchedule, deleteSchedule };
