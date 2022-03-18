import { db } from '../firestore';
import { collection, getDocs, setDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { Schedule, DialogSchedule, SchedulesState } from '../../redux/stateTypes';
import { createSchedulesKey } from '../../services/schedules';
import { isSameMonth } from '../../services/calendar';
import dayjs from 'dayjs';

const rootCollection = 'schedules';
const monthScheduleCollection = 'monthSchedule';

// 取得する制限などをパラメーターがで管理できるようにする
const fetchSchedules = async (year: number, month: number): Promise<SchedulesState['monthSchedules']> => {
    const prevMonthScheduleKey = getMonthSchedulesKey(year, month - 1);
    const currMonthScheduleKey = getMonthSchedulesKey(year, month);
    const nextMonthScheduleKey = getMonthSchedulesKey(year, month + 1);
    const monthScheduleRefs = createCollectionRefs([prevMonthScheduleKey, currMonthScheduleKey, nextMonthScheduleKey]);
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
    console.log(schedules);

    return schedules;
}

const addSchedule = async (form: DialogSchedule): Promise<number> => {
    const { date } = form;
    const id = new Date().getTime();
    const d = dayjs.unix(date);
    try {
        const ref = createCollectionRef(getMonthSchedulesKey(d.year(), d.month() + 1));
        await setDoc(doc(ref, String(id)), { ...form, id });
        console.log('Add schedule to firestore.');
    } catch (e) {
        console.log('Error adding schedule to firestore.', e);
    }
    return id;
}

const updateSchedule = async (prevDate: Schedule['date'], schedule: Schedule): Promise<void> => {
    const { id, date } = schedule;
    const d = dayjs.unix(date);
    const prevD = dayjs.unix(prevDate);
    try {
        if (isSameMonth(date, prevDate)) {
            await updateDoc(createDocRef(getMonthSchedulesKey(d.year(), d.month() + 1), String(id)), schedule);
        } else {
            await deleteDoc(createDocRef(getMonthSchedulesKey(prevD.year(), prevD.month() + 1), String(id)));
            await setDoc(doc(createCollectionRef(getMonthSchedulesKey(d.year(), d.month() + 1)), String(id)), schedule);
        }
        console.log('Update schedule of firestore.');
    } catch (e) {
        console.log('Error updating schedule of firestore', e);
    }
}

const deleteSchedule = async (schedule: Schedule): Promise<void> => {
    try {
        const { id, date } = schedule;
        const d = dayjs.unix(date);
        await deleteDoc(createDocRef(getMonthSchedulesKey(d.year(), d.month() + 1), String(id)));
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

const getMonthSchedulesKey = (year: number, month: number): string => {
    if (month > 12) {
        return `${year + 1}_${1}`;
    }
    if (month < 1) {
        return `${year - 1}_${12}`;
    }
    return `${year}_${month}`;
}

export const schedulesAPI = { fetchSchedules, addSchedule, updateSchedule, deleteSchedule };
