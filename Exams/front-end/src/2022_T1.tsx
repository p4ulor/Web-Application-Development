import * as React from 'react'

let timeout: NodeJS.Timeout
export function _2022_T1(){
    return <MsgDisplayer period={1000} messages={new Array("ay", "aye", "bruh", "acabou")}/>
}

function MsgDisplayer({period, messages} : {period: number, messages: Array<string>}){
    const [counter, setCounter] = React.useState<number>(undefined)
    const [currentMessage, setCurrentMessage] = React.useState("")

    React.useEffect(() => {
        setCounter(0)
    }, [])

    React.useEffect(() => {
        function count(){
            console.log(counter)
            if(counter==messages.length) setCounter(0)
            else setCounter(counter+1)
            setCurrentMessage(messages[counter])
        }
        if(counter!=undefined) timeout = setTimeout(count, period)
    }, [counter])

    return (
        <div>
            <h1>{counter ? counter : 0}</h1>
            <Component text={currentMessage}/>
        </div>
    )
}

function Component({text} : { text: string }){
   
    return (
        <div> 
            <h2>{text}</h2>
        </div>
    )
}

