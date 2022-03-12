import { collection, getDocs, query, setDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firestore';
import { Schedule } from '../../redux/stateTypes';
import { getMonthSchedulesKey } from '../../services/schedules';

const deleteSchedule = async (schedule: Schedule): Promise<void> => {
    const { id, date } = schedule;
    if (date) {
        await deleteDoc(doc(db, 'schedules', getMonthSchedulesKey(date.year(), date.month() + 1), String(date.date()), String(id)));
        console.log('success delete.');
    } else {
        console.log('undefined year and month and day.');
    }
}

export const schedulesAPI = {
    deleteSchedule: deleteSchedule,
}
