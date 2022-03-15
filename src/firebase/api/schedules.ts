import { db } from '../firestore';
import { collection, getDocs, setDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { Schedule, DialogSchedule, MonthSchedules, ScheduleTime, ScheduleDate } from '../../redux/stateTypes';
import { isSameMonth } from '../../services/calendar';
import dayjs from 'dayjs';

const rootCollection = 'schedules';
const monthScheduleCollection = 'monthSchedule';

type FirestoreSchedule = {
    id: number;
    title: string;
    date: string | number;
    time: ScheduleTime;
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
        console.log(getMonthSchedulesKey(date?.year(), date?.month() + 1));
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

const updateSchedule = async (prevDate: ScheduleDate, schedule: Schedule): Promise<void> => {
    const { id, date } = schedule;
    if (date && prevDate) {
        if (isSameMonth(date, prevDate)) {
            await updateDoc(createDocRef(getMonthSchedulesKey(date.year(), date.month() + 1), String(id)), {
                ...schedule,
                date: date.toJSON(),
            });
        } else {
            await deleteDoc(createDocRef(getMonthSchedulesKey(prevDate.year(), prevDate.month() + 1), String(id)));
            await setDoc(doc(createCollectionRef(getMonthSchedulesKey(date.year(), date.month() + 1)), String(id)), {
                ...schedule,
                date: date.toJSON(),
            });
        }
    } else {
        throw ('undefined date.');
    }
}

const deleteSchedule = async (schedule: Schedule): Promise<void> => {
    const { id, date } = schedule;
    if (date) {
        await deleteDoc(createDocRef(getMonthSchedulesKey(date.year(), date.month() + 1), String(id)));
    } else {
        throw ('undefined year and month and day.');
    }
}

const createCollectionRef = (key: string) => {
    return collection(db, rootCollection, key, monthScheduleCollection);
}

const createDocRef = (key: string, id: string) => {
    return doc(db, rootCollection, key, monthScheduleCollection, id);
}

const getMonthSchedulesKey = (year: number, month: number): string => {
    return String(year) + '_' + String(month);
}

export const schedulesAPI = { fetchSchedules, addSchedule, updateSchedule, deleteSchedule };
