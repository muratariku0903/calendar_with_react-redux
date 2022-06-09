import algoliasearch from 'algoliasearch';
import { APP_ID, SEARCH_API_KEY, ADMIN_API_KEY, INDEX_NAME } from "./config";
import { userAPI } from '../../firebase/api/user';
import { Schedule } from '../../redux/stateTypes';
import { SearchedScheduleHighlightResult, SearchedSchedule } from './types';
import { deleteHtmlTagFromStr } from '../../functions';


const addSchedule = async (schedule: Schedule): Promise<void> => {
    const client = algoliasearch(APP_ID, ADMIN_API_KEY);
    const index = client.initIndex(INDEX_NAME);
    const userId = userAPI.getUid();
    try {
        await index.saveObject({ objectID: schedule.id, ...schedule, userId }, { autoGenerateObjectIDIfNotExist: true });
        console.log('Add schedule to algolia index.');
    } catch (e) {
        throw (`Error adding schedule to algolia index because:${e}`);
    }
}

const updateSchedule = async (schedule: Schedule): Promise<void> => {
    const client = algoliasearch(APP_ID, ADMIN_API_KEY);
    const index = client.initIndex(INDEX_NAME);
    const userId = userAPI.getUid();
    try {
        await index.partialUpdateObject({ objectID: schedule.id, ...schedule, userId }, { createIfNotExists: false });
        console.log('Update schedule to algolia index.');
    } catch (e) {
        throw (`Error updating schedule to algolia index because:${e}`);
    }
}

const deleteSchedule = async (id: Schedule['id']): Promise<void> => {
    const client = algoliasearch(APP_ID, ADMIN_API_KEY);
    const index = client.initIndex(INDEX_NAME);
    const objectId = String(id);
    try {
        await index.deleteObject(objectId);
        console.log('Delete schedule from algolia index.');
    } catch (e) {
        throw (`Error deleting schedule from algolia index because:${e}`);
    }
}



const searchSchedules = async (query: string): Promise<SearchedSchedule[]> => {
    const client = algoliasearch(APP_ID, SEARCH_API_KEY);
    const index = client.initIndex(INDEX_NAME);
    const schedules: SearchedSchedule[] = [];
    try {
        (await index.search(query)).hits.map(hit => {
            const res = hit._highlightResult as SearchedScheduleHighlightResult;
            const schedule = {
                id: Number(res.id.value),
                title: deleteHtmlTagFromStr(res.title.value),
                date: Number(res.date.value),
                time: { start: Number(res.time.start.value), end: Number(res.time.end.value) },
                location: deleteHtmlTagFromStr(res.location.value),
                description: deleteHtmlTagFromStr(res.description.value),
                userId: res.userId.value,
            }
            schedules.push(schedule);
        });
        console.log('Search schedule from algolia index.');
        return schedules;
    } catch (e) {
        throw (`Error searching schedule from algolia index because:${e}`);
    }
}


export const algoliaApi = { addSchedule, deleteSchedule, updateSchedule, searchSchedules };
