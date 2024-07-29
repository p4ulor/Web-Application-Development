import * as React from 'react'

let timeout: NodeJS.Timeout
export function _2021_T2(){

    const [counter, setCounter] = React.useState<number>(undefined)
    const [isRunning, setIsRunning] = React.useState(false)
    const [laps, setLaps] = React.useState([])

    React.useEffect(() => {
        return () => {
            clearTimeout(timeout)
            console.log("destructor called")
        }
    }, [])

    React.useEffect(() =>{
        //console.log("rendered")
    })

    React.useEffect(() => {
        console.log("counter updated")
        function count(){
            setCounter(counter+1)
        }
        if(counter!=undefined) timeout = setTimeout(count, 1000)
    }, [counter])

    function onStart(){
        if(isRunning) {
            clearTimeout(timeout)
            setIsRunning(false)
            setCounter(undefined)
            setLaps([])
        } else {
            setIsRunning(true)
            setCounter(0)
        }
        /* function count(){ 
            setCounter(counter+1) //will not work, it only increments 1 time https://stackoverflow.com/a/53024497/9375488
            console.log("aye", counter)
        }
        timeout = setInterval(count, 1000) */
    }

    function onLap(){
        //setIsRunning(false)
        clearTimeout(timeout)
        if(counter==0) { //because when spamming Lap, counter==0 and it won't trigger the counter
            function count(){
                clearTimeout(timeout)
                setCounter(counter+1)
            }
            if(counter!=undefined) timeout = setTimeout(count, 1000)
        } 
        else setCounter(0)
        setLaps([...laps, `${counter}s at ${new Date().toLocaleTimeString()}, `])
    }

    return (
        <div> 
            <button onClick={onStart}>Start (click again to stop)</button>
            <button onClick={onLap} disabled={!isRunning}>Lap</button>
            <h1>{counter ? counter : 0}</h1>
            <h2>Laps: {laps}</h2>
        </div>
    )
}

