import { collection, getDocs, query, where, addDoc, doc } from 'firebase/firestore';
import { fetchSchedules, addSchedules, setScheduleLoading, SchedulesActions } from '../schedules';
import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { db } from '../../../firebase/firestore';
import { Schedule, MonthSchedules, State } from '../../stateTypes';
import { getDateCntOfMonth } from '../../../services/calendar';
import { createSchedulesKey } from '../../../services/schedules';
import dayjs from 'dayjs';

type FirestoreSchedule = {
    title: string;
    date: string | number;
    location: string;
    description: string;
}


const querySnapshot = async (q: any) => await getDocs(q);

const getMonthSchedulesKey = (year: number, month: number): string => {
    return String(year) + '_' + String(month);
}

// reducerに伝達する本来のアクションよりも前に処理するアクションってこと。つまり、アクションとreducerの間のeffectということ。
export const asyncFetchSchedules = (year: number, month: number): ThunkAction<void, State, undefined, SchedulesActions> => async (dispatch: Dispatch<Action>) => {
    const dateCnt = getDateCntOfMonth(year, month);
    const monthSchedulesKey = getMonthSchedulesKey(year, month);
    dispatch(setScheduleLoading());
    const schedules: MonthSchedules = {}; // キーは何年何月何日
    for (let date = 1; date <= dateCnt; date++) {
        const monthSchedulesRef = collection(db, 'schedules', monthSchedulesKey, String(date));
        const monthSchedulesQuery = query(monthSchedulesRef);
        const dateSchedules: Schedule[] = [];
        querySnapshot(monthSchedulesQuery)
            .then(res => {
                res.docs.forEach(dateSchedule => {
                    const firestoreSchedule: FirestoreSchedule = dateSchedule.data() as FirestoreSchedule;
                    const schedule: Schedule = { ...firestoreSchedule, date: dayjs(firestoreSchedule.date) }
                    dateSchedules.push(schedule);
                })
            })
            .catch(err => {
                console.log(err);
            });
        schedules[monthSchedulesKey + '_' + date] = dateSchedules;
    }
    dispatch(fetchSchedules(schedules));
}

export const asyncAddSchedule = (schedule: Schedule): ThunkAction<void, State, undefined, SchedulesActions> => async (dispatch: Dispatch<Action>) => {
    dispatch(setScheduleLoading());
    const { date } = schedule;
    const year = date?.year();
    const month = date?.month();
    const day = date?.date();
    if (year && month && day) {
        try {
            const docRef = await addDoc(collection(db, 'schedules', getMonthSchedulesKey(year, month + 1), String(day)), {
                ...schedule,
                date: schedule.date?.unix()
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    } else {
        console.log('undefined year and month.');
    }

    dispatch(addSchedules(createSchedulesKey(date), schedule));
}
