import axios from "axios"
import { FETCH_TEATCHERS_START, FETCH_TEATCHERS_SUCCEESS, FETCH_TEATCHERS_ERROR } from './actionsTypes'

export function fetchTeatchers() {
    return async dispatch => {

        dispatch(fetchTeatchersStart())

        let url = 'http://dashboard.kholodov.xyz/api/teachers'
        const token = localStorage.getItem('token')
        console.log(token)

        try {
            let response = axios.get(url, {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
            // let res = await _response;
            // const response = fetch(url, {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${token}`
            //     }
            // })
            //console.log(response)

            let teatchers = []


            Object.keys(response.data).forEach((data) => {
                teatchers.push({
                    teatcher: data
                })
            })

            dispatch(fetchTeatchersSucceess(teatchers))
            // console.log(teatchers);
            


        } catch (e) {
            dispatch(fetchTeatchersError(e))

        }
    }
}

export function fetchTeatchersStart() {
    return {
        type: FETCH_TEATCHERS_START
    }
}

export function fetchTeatchersSucceess(teatchers) {
    return {
        type: FETCH_TEATCHERS_SUCCEESS,
        teatchers: teatchers
    }
}

export function fetchTeatchersError(e) {
    return {
        type: FETCH_TEATCHERS_ERROR,
        error: e
    }
}

