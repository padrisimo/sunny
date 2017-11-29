import { FETCH_REPORTS } from '../actions';

export default function reducer(state = {
    reports:{},
    isfetched: false
 }, action) {
    switch (action.type) {       
        case FETCH_REPORTS:
            return {reports: action.payload.data, isfetched: true};     
        default:
            return state;
    }
};