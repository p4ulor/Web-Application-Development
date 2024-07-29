import React, { useState, useEffect, useReducer } from 'react'

type UrisParam = {
    uriList: string[]
}

type UriParam = {
    uri: string
    removeCb: () => void
}

export function Uris({ uriList }: UrisParam): JSX.Element {
    const [list, setList] = useState(uriList)

    function removeUri(uri: string) {
        const newList = Array.from(list)
        const idx = newList.indexOf(uri)
        newList.splice(idx, 1)
        setList(newList)
    }

    return (
        <div>
            { list.map(uri => <Uri key={uri} uri={uri} removeCb={() => removeUri(uri)} /> ) }
        </div>
    )
}

type State = {
    state: 'loading' | 'success' | 'error'
    errorMsg: string
    status: number
}

type Action = 
{ type: 'set-success', status: number } |
{ type: 'set-error', errorMsg: string }

function reducer(state: State, action: Action): State {
    switch(action.type) {
        case 'set-success': return {state: 'success', status: action.status} as State
        case 'set-error': return {state: 'error', errorMsg: action.errorMsg} as State
    }
}

function Uri({uri, removeCb}: UriParam): JSX.Element {
    const [{state, errorMsg, status}, dispatch] = useReducer(reducer, {state: 'loading'} as State)

    useEffect(() => {
        let isCanceled = false
        fetch(uri)
            .then(res => {
                if (isCanceled) return
                dispatch({type: 'set-success', status: res.status})
            })
            .catch(err => {
                if (isCanceled) return
                dispatch({type: 'set-error', errorMsg: err})
            })
        return () => {
            isCanceled = true
        }
    }, [uri])

    let msg: string
    switch (state) {
        case 'loading': 
            msg = '...'
            break
        case 'success':
            msg = `${status}`
            break
        case 'error':
            msg = errorMsg
            break
    }

    return (
        <div>
            <p>{uri}: {msg}</p>
            <button onClick={() => removeCb()}>Remover</button>
        </div>
    )
}