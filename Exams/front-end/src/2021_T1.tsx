import * as React from 'react'

export function _2021_T1(){
    const [textArea, setTextArea] = React.useState("")
    const [isFetching, setIsFetching] = React.useState(false)
    const uri = React.useRef(undefined) //avoids re-rendering

    const [controller, setController] = React.useState(new AbortController())
    const signal = controller.signal

    React.useEffect(() => {
       console.log("rendered", `is fetching? -> ${isFetching}`)
       console.log(textArea)
    })

    function onButtonClick(){
        console.log("uri=", uri.current)
        async function perFormFetch(){
            setIsFetching(true)
            const data = await doFetch(uri.current)
            setTextArea(data)
            setIsFetching(false)
        }
        perFormFetch()
    }

    function updateUri(e: React.ChangeEvent<HTMLInputElement>) {
        if(isFetching) abortFetching()
        uri.current = e.target.value
        console.log("uri=", uri.current)
    }

    function abortFetching() {
        console.log('Now aborting');
        controller.abort()
        setController(new AbortController()) //https://stackoverflow.com/a/64795615/9375488
    }

    function doFetch(url: string) {
        signal.addEventListener("abort", () => {
            console.log("aborted!")
        })

        const x = fetch(url, {
            method: "GET",
            body: null ,
            signal: signal //https://stackoverflow.com/a/47250621/9375488
        }).then(async response => {
            if(!response.ok){
                return response.json().then(message => {
                    let alertMsg = `Error ${response.status}`
                    return alertMsg
                })
            }
    
            const txt = await response.clone().text() //doing .clone() avoids "stream already read" https://stackoverflow.com/a/54115314/9375488
            
            /* let jsonObj: string
            try { jsonObj = await response.json() 
            } catch(e){
                console.log("Error converting to json->"+e+". doFetch will return text")
                jsonObj = txt
            } */
            return txt
        }).catch(e => {
            return `Fetch error ->${e}. Uri changed to -> ${uri.current}`
        })
        return x
    }

    return (
        <div> {/* Usar https://httpbin.org/delay/3 para experimentar o cancelamento */}
            <>URI:</><input type="text" placeholder="uri" ref={uri} onChange={(e) => updateUri(e)} ></input> {/* Pq é q o ref ja nao funciona???!! e ja nao há .value em uri.current.value ??? */}
            <button disabled={isFetching} onClick={onButtonClick}>GET</button>
            <br/>
            <textarea cols={30} rows={10} value={textArea} readOnly>{}</textarea>
        </div>
    )
}

