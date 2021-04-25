import {useEffect, useState} from 'react'
import {useLocation, useHistory} from "react-router-dom";

export const useUrlParams = () => {
    const [params, setParams] = useState({})
    const location = useLocation()
    const history = useHistory()

    const updateParams = (newParams) => {
        const _newParams = {
            ...params,
            ...newParams
        }
        setParams(_newParams)
        const newUrlParamString = '?' + Object.keys(_newParams).map(key => `${key}=${_newParams[key]}`).join('&')
        history.push({
            search: newUrlParamString
        })
    }

    useEffect(() => {
        // location.search look like "?page=5&temp=2"
        const _params = {}
        if (location.search) {
            const modifiedSearchString = location.search.substring(1, location.search.length)
            const stringParams = modifiedSearchString.split("&") // ['page=5', 'temp=abc']
            const arrayParams = stringParams.map(p => {
                const [key, value] = p.split("=")
                return {
                    key,
                    value
                }
            })
            arrayParams.forEach(p => {
                _params[p.key] = p.value
            })
        }
        setParams(_params)
    }, [location.search])

    return [params, updateParams]
}
