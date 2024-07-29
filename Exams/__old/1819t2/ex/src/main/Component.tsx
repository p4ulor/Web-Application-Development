import React, { useEffect, useReducer } from 'react'

type UrisParams = {
    uris: string[]
}

type UriParams = {
    uri: string
}

export function Uris({uris}: UrisParams): JSX.Element {
    return (
        <div>
            {uris.map(uri => <Uri key={uri} uri={uri} />)}
        </div>
    )
}

type State = {
    state: 'getting' | 'retrying' | 'finished'
    status: number
}

type Action = 
{ type: 'get' } |
{ type: 'retry' } |
{ type: 'finish', status: number }

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'get': return { state: 'getting' } as State
        case 'retry': return { state: 'retrying' } as State
        case 'finish': return { state: 'finished', status: action.status }
    }
}

function Uri({uri}: UriParams): JSX.Element {
    const [{state, status}, dispatch] = useReducer(reducer, {state: 'getting'} as State)

    useEffect(() => {
        let isCancelled = false
        if (state != 'finished') {
            fetch(uri)
                .then(res =>{
                    if (!isCancelled)
                        dispatch({type: 'finish', status: res.status})
                })
                .catch(res => {
                    if (!isCancelled)
                        dispatch({type: 'retry'})
                })
            return () => {isCancelled = true}
        }
    }, [state])

    let message
    switch (state) {
        case 'getting':
        case 'retrying':
            message = state
            break
        case 'finished':
            message = status
    }

    return (
        <p>
            {uri}: {message}
        </p>
    )
}