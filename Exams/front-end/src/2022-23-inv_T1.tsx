import * as React from 'react'

export function _2022_23_T1(){
    return (
        <Ex5 uri={"https://httpbin.org/delay/3"} period={6000}/>
    )
}

export function Ex5({uri, period} : {uri: string, period: number}){
    const [textArea, setTextArea] = React.useState("")

    const [controller, setController] = React.useState(new AbortController())
    const [signal] = React.useState(controller.signal)

    React.useEffect(() => {
        const interval = setInterval(async () => { //o prof valoriza mt mais se se usar setInterval em vez de setTimeout...
            console.log('useEffect running', new Date().toLocaleTimeString())
            setTextArea("fetching...")
            const content = await doFetch(uri)
            console.log("fetching done", new Date().toLocaleTimeString())
            setTextArea(content)
        }, period)
        return () => {
            clearInterval(interval)
            abortFetching()
        }
    }, [])

    function abortFetching() {
        console.log('Now aborting');
        controller.abort()
        //setController(new AbortController()) //https://stackoverflow.com/a/64795615/9375488
    }

    function doFetch(url: string) {
        console.log("fetching")
        return fetch(url, {
            method: "GET",
            body: null,
            signal: signal //https://stackoverflow.com/a/47250621/9375488
        })
        .then(async response => { return await response.text() })
        .catch(e => { return `Fetch error ->${e}`})
    }

    return(
        <div>
            <textarea name="" id="" cols={50} rows={50} value={textArea} readOnly/>
        </div>
    )
}