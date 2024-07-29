import React, { useState, useEffect } from 'react'
import { Uris } from './Component'

function App(): JSX.Element {
    const [state, setState] = useState(['https://www.youtube.com', 'https://www.google.com', 'https://www.facebook.com', 'https://www.twitter.com'])

    setTimeout(() => {
        const array = Array.from(state)
        array[2] = 'https://www.reddit.com'
        setState(array)
    }, 2000)

    return (
        <Uris uris={state} />
    )
}

export { App } 