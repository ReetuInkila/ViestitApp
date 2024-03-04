import './group.css'
import { useState } from 'react'
import axios from 'axios'

/**
 * Group selecting field component
 * @param {function} setSelectedGroup - Function to set the selected group
 * @param {function} onLogout - Function to handle logout
 */
const Groups = ({ setSelectedGroup, onLogout }) => {
    const [groupName, setGroupName] = useState('')

    // Function to handle group selection
    const handleGroup = () => {
        if (groupName.trim() !== '') {
            const groupData = {
                name: groupName.trim()
            }
            axios
                .get(`api/groupid/${groupName}`)
                .then(response => {
                    setSelectedGroup(response.data.groupId)
                })
                .catch(error => {
                    if (window.confirm(`No group named ${groupName}. Do you want to add it?`)) {
                        axios
                            .post(`api/addgroup`, groupData)
                            .then(response => {
                                const newGroupId = response.data.id // Extract ID from response
                                setSelectedGroup(newGroupId)
                            })
                            .catch(error => {
                                console.error('Error adding group:', error)
                            })
                    } else {
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
    )
}

export default Groups
