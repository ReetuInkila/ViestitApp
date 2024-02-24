import './group.css'
import { useState } from 'react'
import axios from 'axios'

const Groups = ({ setSelectedGroup, onLogout }) => {
    const [groupName, setGroupName] = useState('')

    const handleGroup = () => {
        if (groupName.trim() !== '') {
            const groupData = {
                name: groupName.trim()
            }
            axios
                .get(`${process.env.REACT_APP_API_URL || 'https://viestit-backend-rx347ght6q-lz.a.run.app/api'}/groupid/${groupName}`)
                .then(response => {
                    setSelectedGroup(response.data.groupId)
                })
                .catch(error => {
                    if (window.confirm(`No group named ${groupName}. Do you want to add it?`)) {
                        axios
                            .post(`${process.env.REACT_APP_API_URL || 'https://viestit-backend-rx347ght6q-lz.a.run.app/api'}/addgroup`, groupData)
                            .then(response => {
                                const newGroupId = response.data.id // Extract ID from response
                                setSelectedGroup(newGroupId)
                            })
                            .catch(error => {
                                console.error('Error adding group:', error)
                            })
                    }else{
                        setSelectedGroup(null)
                        setGroupName('')
                    }
                })
        }
    }

    return (
        <div className="selectGroup"> 
            <input 
                id="group"
                value={groupName}
                placeholder="Group name"
                onChange={(e) => setGroupName(e.target.value)}
            />
            <button onClick={handleGroup}>Select</button>
            <button id='logout' onClick={onLogout}>Logout</button>
        </div>
    );
};

export default Groups;
