type Calendar = {
    year: number;
    month: number;
    firstDateOfWeek: number;
}

const setCalendar = (year: number, month: number, firstDateOfWeek: number): void => {
    localStorage.setItem('calendar', JSON.stringify({ year, month, firstDateOfWeek }));
}

const getCalendar = (): { year: number, month: number, firstDateOfWeek: number } => {
    return JSON.parse(localStorage.getItem("calendar") as string) as Calendar;
}

const deleteCalendar = (): void => {
    localStorage.removeItem('calendar');
}

export const localStorageApi = { setCalendar, getCalendar, deleteCalendar };
