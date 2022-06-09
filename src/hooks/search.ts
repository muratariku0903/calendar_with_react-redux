import { useState, useEffect } from 'react';
import { Schedule } from '../redux/stateTypes';
import { algoliaApi } from '../api/algolia/algoliaApi';
import { userAPI } from '../firebase/api/user';
import { omitObjectProperty } from '../functions/index';

export const useSearchSchedules = (keyword: string | null): Schedule[] => {
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const userId = userAPI.getUid();

    useEffect(() => {
        (async () => {
            if (!keyword) return;

            try {
                const searchedSchedules = await algoliaApi.searchSchedules(keyword);
                const filteredSearchedSchedules: Schedule[] = [];
                searchedSchedules.map(searchedSchedule => {
                    if (searchedSchedule.userId === userId) {
                        omitObjectProperty(searchedSchedule)('id');
                        filteredSearchedSchedules.push(searchedSchedule);
                    }
                });
                setSchedules(filteredSearchedSchedules);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [keyword]);

    return schedules;
}
