import { collection, getDocs, query, setDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { fetchSchedules, addSchedules, deleteSchedule, setScheduleLoading, SchedulesActions } from '../schedules';
import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { db } from '../../../firebase/firestore';
import { Schedule, MonthSchedules, State, DialogSchedule } from '../../stateTypes';
import { getDateCntOfMonth } from '../../../services/calendar';
import { createSchedulesKey } from '../../../services/schedules';
import dayjs from 'dayjs';

type FirestoreSchedule = {
    id: number;
    title: string;
    date: string | number;
    location: string;
    description: string;
}

const getMonthSchedulesKey = (year: number, month: number): string => {
    return String(year) + '_' + String(month);
}

// reducerに伝達する本来のアクションよりも前に処理するアクションってこと。つまり、アクションとreducerの間のeffectということ。
// 前月の予定とかも表示させたい
export const asyncFetchSchedules = (year: number, month: number): ThunkAction<void, State, undefined, SchedulesActions> => async (dispatch: Dispatch<Action>) => {
    dispatch(setScheduleLoading());
    const dateCnt = getDateCntOfMonth(year, month);
    const monthSchedulesKey = getMonthSchedulesKey(year, month);
    const schedules: MonthSchedules = {}; // キーは何年何月何日
    for (let date = 1; date <= dateCnt; date++) {
        // これさ、その月の日数分クエリを発行するけど、データベースに存在する分だけ発行すれば良い気がするんだけど、
        const monthSchedulesRef = collection(db, 'schedules', monthSchedulesKey, String(date));
        const monthSchedulesQuery = query(monthSchedulesRef);
        const dateSchedules: Schedule[] = [];
        try {
            (await getDocs(monthSchedulesQuery)).docs.forEach(dateSchedule => {
                const firestoreSchedule = dateSchedule.data() as FirestoreSchedule;
                const schedule = { ...firestoreSchedule, date: dayjs(firestoreSchedule.date) }
                dateSchedules.push(schedule);
            })
        } catch (e) {
            console.log('Error fetch documents: ', e);
        }
        if (dateSchedules.length) schedules[monthSchedulesKey + '_' + date] = dateSchedules;
    }
    dispatch(fetchSchedules(schedules));
}

export const asyncAddSchedule = (form: DialogSchedule): ThunkAction<void, State, undefined, SchedulesActions> => async (dispatch: Dispatch<Action>) => {
    dispatch(setScheduleLoading());
    const { date } = form;
    const id = dayjs().unix();
    if (date) {
        try {
            await setDoc(doc(collection(db, 'schedules', getMonthSchedulesKey(date.year(), date.month() + 1), String(date.date())), String(id)), {
                ...form,
                id: id,
                date: date.toJSON(),
            });
            console.log("Document written with ID: ");
            dispatch(addSchedules(createSchedulesKey(date), form, id));
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    } else {
        console.log('undefined year and month and day.');
    }
}

export const asyncDeleteSchedule = (schedule: Schedule): ThunkAction<void, State, undefined, SchedulesActions> => async (dispatch: Dispatch<Action>) => {
    const { id, date } = schedule;
    if (date) {
        try {
            await deleteDoc(doc(db, 'schedules', getMonthSchedulesKey(date.year(), date.month() + 1), String(date.date()), String(id)));
            console.log("Document delete.");
            dispatch(deleteSchedule(createSchedulesKey(date), id));
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    } else {
        console.log('undefined year and month and day.');
    }
}

export const asyncUpdateSchedule = (schedule: Schedule): ThunkAction<void, State, undefined, SchedulesActions> => async (dispatch: Dispatch<Action>) => {
    const { id, date } = schedule;
    if (date) {
        try {
            await updateDoc(doc(db, 'schedules', getMonthSchedulesKey(date.year(), date.month() + 1), String(date.date()), String(id)), schedule);
            console.log("Document update.");
            dispatch(deleteSchedule(createSchedulesKey(date), id));
        } catch (e) {
            console.error("Error updating document: ", e);
        }
    } else {
        console.log('undefined year and month and day.');
    }
}
