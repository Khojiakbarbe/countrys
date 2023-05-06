import { useState } from "react";
import {BsMoon} from 'react-icons/bs'


export default function Navbar() {

    const [mode, setMode] = useState(false)

    if (mode) {
        document.body.style.backgroundColor = '#202C36'
        document.body.style.color = 'white'
    } else {
        document.body.style.backgroundColor = 'white'
        document.body.style.color = 'black'
    }

    return (
        <div style={mode ? {backgroundColor : '#2B3844', color:'white'} : {backgroundColor:'white', color:'black'}}>
            <div className="container">
                <div className="row p-2">
                    <div className="col">
                        <h1>Where in the world?</h1>
                    </div>
                    <div className="col" style={{textAlign:'end'}}>
                        <p style={{cursor:'pointer'}} onClick={() => setMode(!mode)}><BsMoon/> Dark mode</p>
                    </div>
                </div>
            </div>
        </div>
    )
}