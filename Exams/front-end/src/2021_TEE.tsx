import * as React from 'react'

let timeout: NodeJS.Timeout
export function _2021_TEE(){
    const [counter, setCounter] = React.useState<number>(undefined)
    const [isRunning, setIsRunning] = React.useState(false)

    const [counterInterval, setCounterInterval] = React.useState<number>(undefined)

    React.useEffect(() => {
        function count(){
            setCounter(counter+1)
        }
        if(counter!=undefined) timeout = setTimeout(count, counterInterval)
    }, [counter])

    function onStart(){
        if(isRunning) {
            clearTimeout(timeout)
            setIsRunning(false)
            setCounter(undefined)
        } else {
            setIsRunning(true)
            setCounter(0)
        }
    }
    
    function onChangeTextArea(e: React.ChangeEvent<HTMLTextAreaElement>){
        const maybeANumber = new Number(e.target.value).valueOf()
        let daNumber = maybeANumber
        if(isNaN(maybeANumber)) daNumber = Number.POSITIVE_INFINITY
        setCounterInterval(daNumber)
    }

    return (
        <div> 
            <button onClick={onStart}>Start (click again to stop)</button>
            <p>Timer incrementation interval:</p>
            <textarea cols={10} rows={3} value={counterInterval} onChange={(e) => onChangeTextArea(e)}>{}</textarea>
            <h1>{counter ? counter : 0}</h1>
        </div>
    )
}

