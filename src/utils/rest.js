import {useEffect, useReducer} from 'react'
import axios from 'axios'

const INITIAL_STATE = {
    loading: false, 
    data: {}
}

const reducer = (state, action) => {
    if (action.type === 'REQUEST') {
        return {...state, loading: true}
    }
    if (action.type === 'SUCCESS') {
        return {loading: false, data: action.data}
    }
    return state
}
 

const init = baseURL => {
    const useGet = (resource) => {
        const [data, dispatch] = useReducer(reducer, {loading: true, data: {}})
        const load = async() => {
            dispatch({type: 'REQUEST'})
            const res = await axios.get(baseURL + resource + '.json')
            dispatch({type: 'SUCCESS', data: res.data})
        }
        useEffect(() => {
            load()
        }, [resource])
        return {...data, refetch: load}
    }
    
    const usePost = (resource) => {
        const [postData, dispatch] = useReducer(reducer, INITIAL_STATE)
        const post = async(data) => {
            dispatch({type: 'REQUEST'})
            const res = await axios.post(baseURL + resource + '.json', data)
            dispatch({type: 'SUCCESS', data: res.data})
        }
        return [postData, post]
    }
    
    const useDelete = (resource) => {
        const [deleteData, dispatch] = useReducer(reducer, INITIAL_STATE)
        const remove = async(id) => {
            dispatch({type: 'REQUEST'})
            const res = await axios.delete(baseURL + resource + id + '.json')
            dispatch({type: 'SUCCESS', data: res.data})
        }
        return [deleteData, remove]
    }

    const usePatch = (resource) => {
        const [patchData, dispatch] = useReducer(reducer, INITIAL_STATE)
        const patch = async(data) => {
            dispatch({type: 'REQUEST'})
            const res = await axios.patch(baseURL + resource + '.json', data)
            dispatch({type: 'SUCCESS', data: res.data})
        }
        return [patchData, patch]
    }

    return {
        useGet,
        usePost,
        useDelete,
        usePatch
    }
}

export default init
