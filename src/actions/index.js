import axios from 'axios';

export const FETCH_REPORTS = 'FETCH_REPORTS';

const ROOT_URL = 'http://localhost:3030';

export function fetchReports() {
    const request = axios.get(`${ROOT_URL}/weather`);

    return {
        type: FETCH_REPORTS,
        payload: request
    };
}