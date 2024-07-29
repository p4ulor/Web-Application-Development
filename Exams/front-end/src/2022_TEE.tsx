import * as React from 'react'

export function _2022_TEE() {

    return (
        <div>
            <Ex6 urls={["http://httpbin.org/delay/2", "http://httpbin.org/delay/3"]} />
        </div>
    )
}

class URLListing {
    url: string
    isFetching: boolean
    content: string
    constructor(url: string, isFetching: boolean, content: string) {
        this.url = url; this.isFetching = isFetching; this.content = content
    }
}

export function Ex6({ urls }: { urls: Array<string> }) {
    const [urlsStatus, setUrlsStatus] = React.useState<Array<URLListing>>(urls.map(url => {
        return new URLListing(url, false, undefined)
    }))

    console.log("URLs:",urlsStatus)

    function get(url: string) {
        async function performGet() {
            let updatedUrlsBeingFetched = urlsStatus.map(urlbeingfetched => {
                if (urlbeingfetched.url == url) {
                    urlbeingfetched.isFetching = true
                    return urlbeingfetched
                } else return urlbeingfetched
            })
            setUrlsStatus([...updatedUrlsBeingFetched])

            let content = await doFetch(url)
            content = content.slice(0, content.indexOf("origin"))

            updatedUrlsBeingFetched = urlsStatus.map(urlbeingfetched => {
                if (urlbeingfetched.url == url) {
                    urlbeingfetched.isFetching = false
                    urlbeingfetched.content = content
                    return urlbeingfetched
                } else return urlbeingfetched
            })
            setUrlsStatus([...updatedUrlsBeingFetched])

        }
        performGet()
    }

    function doFetch(url: string) {
        console.log("fetching")
        return fetch(url, {
            method: "GET",
            body: null,
        }).then(async response => {
            if (!response.ok) {
                return response.json().then(message => {
                    let errorMsg = `Error ${response.status}`
                    return errorMsg
                })
            }
            const txt = await response.text()
            return txt
        }).catch(e => { return `Fetch error ->${e}` })
    }

    function render() {
        let keys = 0
        return urlsStatus.map(urlStatus => {
            return (
                <div key={keys++} >
                    <h2>{urlStatus.url}</h2>
                    <button onClick={() => get(urlStatus.url)}>Fetch</button>
                    <p>Is fetching? {urlStatus.isFetching ? <>...</> : <></>}</p>
                    <p>Contents: {urlStatus.content==undefined ? <>none yet</> : <>{urlStatus.content}</>}</p>
                    <br/>
                </div>
            )
        })
    }

    return (
        <div>
            {render()}
        </div>
    )
}

