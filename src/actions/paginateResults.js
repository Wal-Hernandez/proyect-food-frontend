import React from 'react'
import { PAGINATE_RESULTS } from '../types';

function paginateResults(response) {
    let results = response.filter(
        elem => elem
    )
    const PAGE_SIZE = 9;
    let paginated_games = [];
    let page_count = Math.ceil(results.length / PAGE_SIZE)
    for (let i = 0; i < page_count; i++) {
        paginated_games.push(results.splice(0, PAGE_SIZE))
    }
    return {
        type: PAGINATE_RESULTS, payload: paginated_games
    };
}

export default paginateResults