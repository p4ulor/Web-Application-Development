import * as React from 'react' //"Used" in places where we put HTML elements mixed with JS. See lines in 3123 'react'. search for keywords 'declare global'
import * as ReactDOM from 'react-dom/client'

import {_2021_T1} from './2021_T1'
import {_2021_T2} from './2021_T2'
import {_2021_TEE} from './2021_TEE'
import {_2022_T1} from './2022_T1'
import {_2022_T2} from './2022_T2'
import {_2022_TEE} from './2022_TEE'
import {_2022_23_T1} from './2022-23-inv_T1'

const root = ReactDOM.createRoot(document.getElementById('root')) 

/****************  Executar com: npm run start ****************/

//renderThis(<_2021_T1/>)
renderThis(<_2021_T2/>)
//renderThis(<_2021_TEE/>)
//renderThis(<_2022_T1/>)
//renderThis(<_2022_T2/>)
//renderThis(<_2022_TEE/>)
//renderThis(<_2022_23_T1/>)

function renderThis(exam: JSX.Element | React.ReactFragment){
    root.render(exam)
}

window.onload = (event) =>{
    console.log('Page Loaded')
}