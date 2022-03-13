import { collection, getDocs, setDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firestore';
import { Schedule, DialogSchedule, MonthSchedules } from '../../redux/stateTypes';
import dayjs from 'dayjs';

const rootCollection = 'schedules';
const monthScheduleCollection = 'monthSchedule';

type FirestoreSchedule = {
    id: number;
    title: string;
    date: string | number;
    location: string;
    description: string;
}

// 取得する制限などをパラメーターがで管理できるようにする
// Promiseオブジェクトを返して、呼び出し側からその結果に応じて処理を変更できるようにする
const fetchSchedules = async (year: number, month: number): Promise<MonthSchedules> => {
    const monthSchedulesKey = getMonthSchedulesKey(year, month);
    const monthScheduleRef = createCollectionRef(monthSchedulesKey);
    const schedules: MonthSchedules = {};
    (await getDocs(monthScheduleRef)).docs.forEach(doc => {
        const firestoreSchedule = doc.data() as FirestoreSchedule;
        const schedule = { ...firestoreSchedule, date: dayjs(firestoreSchedule.date) };
        const key = monthSchedulesKey + '_' + schedule.date.date();
        schedules[key] = schedules[key] ? schedules[key].concat(schedule) : [schedule];
    });
    return schedules;
}

const addSchedule = async (form: DialogSchedule): Promise<number> => {
    const { date } = form;
    const id = new Date().getTime();
    if (date) {
        const ref = createCollectionRef(getMonthSchedulesKey(date.year(), date.month() + 1));
        await setDoc(doc(ref, String(id)), {
            ...form,
            id: id,
            date: date.toJSON(),
        });
        return id;
    } else {
        throw ('undefined year and month and day.');
    }
}

const updateSchedule = async (schedule: Schedule): Promise<void> => {
    const { id, date } = schedule;
    if (date) {
        await updateDoc(doc(db, rootCollection, getMonthSchedulesKey(date.year(), date.month() + 1), monthScheduleCollection, String(id)), {
            ...schedule,
            date: date.toJSON(),
        });
    } else {
        throw ('undefined date.');
    }
}

const deleteSchedule = async (schedule: Schedule): Promise<void> => {
    const { id, date } = schedule;
    if (date) {
        await deleteDoc(doc(db, rootCollection, getMonthSchedulesKey(date.year(), date.month() + 1), monthScheduleCollection, String(id)));
    } else {
        throw ('undefined year and month and day.');
    }
}

const createCollectionRef = (key: string) => {
    return collection(db, rootCollection, key, monthScheduleCollection);
}

const getMonthSchedulesKey = (year: number, month: number): string => {
    return String(year) + '_' + String(month);
}

export const schedulesAPI = { fetchSchedules, addSchedule, updateSchedule, deleteSchedule };
