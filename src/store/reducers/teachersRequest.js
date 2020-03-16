import { FETCH_TEATCHERS_START, FETCH_TEATCHERS_SUCCEESS, FETCH_TEATCHERS_ERROR } from '../actions/actionsTypes'


const initialState = {
    teatcher: [],
    loading:false,
    error : null
}

export default function teatcherReducer(state = initialState, action) {

    switch (action.type) {

        case FETCH_TEATCHERS_START:
            return {
                ...state, loading:true
            }
        case FETCH_TEATCHERS_SUCCEESS:
            return {
                ...state, teatcher:action.teatchers, loading:false  
            }
        case FETCH_TEATCHERS_ERROR:
            return {
                ...state, error:action.error, loading:false
            }

        default:
            return state
    }
}