import { useState, useEffect } from 'react'

import User from './User'
import Groups from './Groups'
import Chat from './Chat'

const App = () => {
    const [userName, setUserName] = useState('')
    const [selectedGroup, setSelectedGroup] = useState('')

    const handleNameChange = (event) => {
        setUserName(event.target.value)  
    }

    useEffect(() => {
        //console.log(selectedGroup)
    },[selectedGroup]);



    return (
        <div>
            <div className='left-column'>
                <User userName={userName} handleNameChange={handleNameChange}/>
                <Groups setSelectedGroup={setSelectedGroup}/>
            </div>
            <Chat userName={userName} selectedGroup={selectedGroup}/>
        </div>
    )
}

export default App
