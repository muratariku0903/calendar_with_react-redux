import { db } from '../firestore';
import { collection, getDocs, setDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Schedule, DialogSchedule, SchedulesState } from '../../redux/stateTypes';
import { createSchedulesKey } from '../../services/schedules';
import { isSameMonth, getMonth } from '../../services/calendar';
import dayjs from 'dayjs';

const rootCollection = 'schedules';
const userScheduleCollection = 'userSchedule';
const monthScheduleCollection = 'monthSchedule';

const fetchSchedules = async (year: number, month: number): Promise<SchedulesState['monthSchedules']> => {
    const schedules: SchedulesState['monthSchedules'] = {};
    try {
        const uid = getAuthUid();
        const stamp = getMonth(year, month).unix();
        const monthScheduleKeys = getPrevNextMonthSchedulesKeys(stamp);
        const monthScheduleRefs = createCollectionRefs(uid, monthScheduleKeys);
        for (const ref of monthScheduleRefs) {
            (await getDocs(ref)).docs.forEach(doc => {
                const schedule = doc.data() as Schedule;
                const key = createSchedulesKey(schedule.date);
                schedules[key] = schedules[key] ? schedules[key].concat(schedule) : [schedule];
            });
            console.log('Fetch schedules from firestore.');
        }
    } catch (e) {
        throw (`Error fetching schedules from firestore because:${e}`);
    }
    return schedules;
}

const addSchedule = async (form: DialogSchedule): Promise<number> => {
    const id = new Date().getTime();
    try {
        const uid = getAuthUid();
        const key = getMonthSchedulesKey(form.date);
        const docRef = createDocRef(uid, key, String(id));
        await setDoc(docRef, { ...form, id });
        console.log('Add schedule to firestore.');
    } catch (e) {
        throw (`Error adding schedule to firestore because:${e}`);
    }
    return id;
}

const updateSchedule = async (prevDate: Schedule['date'], schedule: Schedule): Promise<void> => {
    const { id, date } = schedule;
    try {
        const uid = getAuthUid();
        const prevKey = getMonthSchedulesKey(prevDate);
        const prevDocRef = createDocRef(uid, prevKey, String(id));
        const key = getMonthSchedulesKey(date);
        const docRef = createDocRef(uid, key, String(id));
        if (isSameMonth(date, prevDate)) {
            await updateDoc(docRef, schedule);
        } else {
            await deleteDoc(prevDocRef);
            await setDoc(docRef, schedule);
        }
        console.log('Update schedule of firestore.');
    } catch (e) {
        throw (`Error updating schedule of firestore because:${e}`);
    }
}

const deleteSchedule = async (schedule: Schedule): Promise<void> => {
    const { id, date } = schedule;
    try {
        const uid = getAuthUid();
        const key = getMonthSchedulesKey(date);
        const docRef = createDocRef(uid, key, String(id));
        await deleteDoc(docRef);
        console.log('Delete schedule of firestore')
    } catch (e) {
        throw (`Error deleting schedule of firestore because:${e}`);
    }
}

const getAuthUid = (): string => {
    const auth = getAuth().currentUser;
    if (auth) return auth.uid;
    throw ('Can not get auth uid because not logged in.');
}

const createCollectionRef = (uid: string, key: string) => {
    return collection(db, rootCollection, uid, userScheduleCollection, key, monthScheduleCollection);
}

const createCollectionRefs = (uid: string, keys: string[]) => {
    const refs = [];
    for (const key of keys) {
        refs.push(createCollectionRef(uid, key));
    }
    return refs;
}

const createDocRef = (uid: string, key: string, id: string) => {
    return doc(db, rootCollection, uid, userScheduleCollection, key, monthScheduleCollection, id);
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
    if (month > 12) return `${year + 1}_${1}`;
    if (month < 1) return `${year - 1}_${12}`;
    return `${year}_${month}`;
}

export const schedulesAPI = { fetchSchedules, addSchedule, updateSchedule, deleteSchedule };
