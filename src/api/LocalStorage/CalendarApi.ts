type Calendar = {
    year: number;
    month: number;
    firstDateOfWeekTimeStamp: number;
}

const setCalendar = (year: number, month: number, firstDateOfWeekTimeStamp: number): void => {
    localStorage.setItem('calendar', JSON.stringify({ year, month, firstDateOfWeekTimeStamp }));
}

const getCalendar = (): { year: number, month: number, firstDateOfWeekTimeStamp: number } => {
    return JSON.parse(localStorage.getItem("calendar") as string) as Calendar;
}

const deleteCalendar = (): void => {
    localStorage.removeItem('calendar');
}

export const localStorageApi = { setCalendar, getCalendar, deleteCalendar };
