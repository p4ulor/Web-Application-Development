import * as React from 'react'

let timeout: NodeJS.Timeout
export function _2022_T2(){
    return <Ex6 uri="http://httpbin.org/delay/2" periodMS={3000} />
}

function Ex6({uri, periodMS} : {uri: string, periodMS: number}){
    const [counter, setCounter] = React.useState<number>(undefined)

    const [statusCode, setStatusCode] = React.useState<number>(undefined)
    const [timeTaken, setTimeTaken] = React.useState<number>(undefined)
    const [content, setContent] = React.useState("")
    const [error, setError] = React.useState(undefined)
    const [wasRequestTimedOut, setWasRequesTimeout] = React.useState(false)

    const [isFetching, setIsFetching] = React.useState(false)

    const [controller, setController] = React.useState(new AbortController())
    const signal = controller.signal

    signal.addEventListener("abort", () => {
        console.log("aborted!")
    })

    function abortFetching() {
       /*  console.log('Now aborting');
        controller.abort()
        setController(new AbortController()) //https://stackoverflow.com/a/64795615/9375488 */
    }

    React.useEffect(() => {
        async function performFetch(){
            const then = new Date().getSeconds()
            setIsFetching(true)
            const content = await doFetch(uri)
            setIsFetching(false)
            setContent(content)
            const dif = new Date().getSeconds() - then
            setTimeTaken(dif)
            if(dif > periodMS/1000) {
                abortFetching()
                setWasRequesTimeout(true)
            }
            else setWasRequesTimeout(false)
        }

        function count(){
            console.log(counter)
            setCounter(counter+1)
            performFetch()
        }
        if(counter!=undefined) timeout = setTimeout(count, periodMS)
    }, [counter])

    function start(){
        setCounter(0)
    }

    function stop(){
        clearTimeout(timeout)
        setCounter(undefined)
    }

    function doFetch(url: string) {
        console.log("fetching")
        return fetch(url, {
            method: "GET",
            body: null,
            signal: signal //https://stackoverflow.com/a/47250621/9375488
        }).then(async response => {
            if(!response.ok){
                return response.json().then(message => {
                    let errorMsg = `Error ${response.status}`
                    setError(`Error ${response.status}. ${message}`)
                    return errorMsg
                })
            }
            setStatusCode(response.status)
            const txt = await response.text() 
            return txt
        }).catch(e => {
            setError(`Fetch error ->${e}`)
            return `Fetch error ->${e}`
        })
    }

    console.log("timeout?", wasRequestTimedOut)

    return (
        <div>
            <button onClick={start}>START</button>
            <button onClick={stop}>STOP</button>
            <>URI = {uri}</>
            <h2>Is running {counter==undefined ? <>no</> : <>yes</>}</h2>
            <h2>Is fetching {isFetching ? <>yes</> : <>no</>}</h2>
            <h2>Counter = {counter}. Period ms = {periodMS}</h2>
            <h1>Status code: {statusCode}</h1>
            <h1>Time taken for response: {timeTaken}</h1>
            <h1>{!wasRequestTimedOut ? content.slice(0, content.indexOf("origin")) : <>Timeout</>}</h1>
            {error ? <h1>{error}</h1> : <></>}
        </div>
    )
}

