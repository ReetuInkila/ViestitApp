import { useState } from 'react'

import User from './User'
import Groups from './Groups'
import Chat from './Chat'

const App = () => {
    const [userName, setUserName] = useState('')
    const [selectedGroup, setSelectedGroup] = useState(null)

    const handleNameChange = (event) => {
        setUserName(event.target.value)  
    }

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
