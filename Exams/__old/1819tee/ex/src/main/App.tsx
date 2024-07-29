import React, { useState, useEffect } from 'react'
import { Uris } from './Component'

function App(): JSX.Element {
    return (
        <Uris uriList={['https://www.youtube.com', 'https://www.google.com', 'https://www.facebook.com', 'https://www.twitter.com']} />
    )
}

export { App } 