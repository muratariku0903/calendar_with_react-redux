import { collection, getDocs, query, setDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { fetchSchedules, addSchedules, deleteSchedule, setScheduleLoading, updateSchedule, SchedulesActions } from '../schedules';
import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { db } from '../../../firebase/firestore';
import { Schedule, MonthSchedules, State, DialogSchedule, ScheduleDate } from '../../stateTypes';
import { getDateCntOfMonth } from '../../../services/calendar';
import { createSchedulesKey } from '../../../services/schedules';
import dayjs from 'dayjs';
import { schedulesAPI } from '../../../firebase/api/schedules';


type FirestoreSchedule = {
    id: number;
    title: string;
    date: string | number;
    location: string;
    description: string;
}

type SchedulesThunkAction = ThunkAction<void, State, undefined, SchedulesActions>;

const getMonthSchedulesKey = (year: number, month: number): string => {
    return String(year) + '_' + String(month);
}

// reducerに伝達する本来のアクションよりも前に処理するアクションってこと。つまり、アクションとreducerの間のeffectということ。
// 前月の予定とかも表示させたい
export const asyncFetchSchedules = (year: number, month: number): SchedulesThunkAction => async (dispatch: Dispatch<Action>) => {
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
            });
        } catch (e) {
            console.log('Error fetch documents: ', e);
        }
        if (dateSchedules.length) schedules[monthSchedulesKey + '_' + date] = dateSchedules;
    }
    dispatch(fetchSchedules(schedules));
}

export const asyncAddSchedule = (form: DialogSchedule): SchedulesThunkAction => async (dispatch: Dispatch<Action>) => {
    dispatch(setScheduleLoading());
    const { date } = form;
    const id = new Date().getTime();
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

export const asyncDeleteSchedule = (schedule: Schedule): SchedulesThunkAction => async (dispatch: Dispatch<Action>) => {
    try {
        await schedulesAPI.deleteSchedule(schedule);
        dispatch(deleteSchedule(createSchedulesKey(schedule.date), schedule.id));
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}

export const asyncUpdateSchedule = (prevDate: ScheduleDate, schedule: Schedule): SchedulesThunkAction => async (dispatch: Dispatch<Action>) => {
    const { id, date } = schedule;
    console.log(prevDate);
    if (date && prevDate) {
        if (date.toJSON() === prevDate.toJSON()) {
            try {
                await updateDoc(doc(db, 'schedules', getMonthSchedulesKey(date.year(), date.month() + 1), String(date.date()), String(id)), {
                    ...schedule,
                    date: date.toJSON(),
                });
                console.log("Document update.", schedule.id);
                dispatch(updateSchedule(id, createSchedulesKey(date), schedule));
            } catch (e) {
                console.error("Error updating document: ", e);
            }
        } else {
            try {
                await deleteDoc(doc(db, 'schedules', getMonthSchedulesKey(prevDate.year(), prevDate.month() + 1), String(prevDate.date()), String(id)));
                console.log("Document delete.");
                dispatch(deleteSchedule(createSchedulesKey(prevDate), id));
            } catch (e) {
                console.error("Error deleting document: ", e);
            }
            try {
                await setDoc(doc(collection(db, 'schedules', getMonthSchedulesKey(date.year(), date.month() + 1), String(date.date())), String(id)), {
                    ...schedule,
                    date: date.toJSON(),
                });
                console.log("Document written with ID: ");
                dispatch(addSchedules(createSchedulesKey(date), schedule, id));
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    } else {
        console.log('undefined date of schedule.');
    }
}
