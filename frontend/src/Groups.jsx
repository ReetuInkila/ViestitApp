import './groups.css'
import SelectGroup from './SelectGroup';
import { useState } from 'react'
import axios from 'axios'

const Groups = ({ setSelectedGroup }) => {
    const[groupName, setGroupName] = useState('')

    const handleNewGroup = () => {
        if (groupName.trim() !== '') {
            const groupData = {
                name: groupName
            }
            axios
                .get(`https://viestit-backend-rx347ght6q-lz.a.run.app/api/groupid/${groupName}`)
                .then(response => {
                    setSelectedGroup(response.data.groupId)
                })
                .catch(error => {
                    if (window.confirm(`No group named ${groupName}. Do you want to add it?`)) {
                        axios
                            .post('https://viestit-backend-rx347ght6q-lz.a.run.app/api/addgroup', groupData)
                            .then(response => {
                                const newGroupId = response.data.id // Extract ID from response
                                setSelectedGroup(newGroupId)
                            })
                            .catch(error => {
                                console.error('Error adding group:', error)
                            })
                    }
                })
        }
    }
    
    

    return (
        <div className="group">
            <SelectGroup groupName={groupName} setGroupName={setGroupName} handleGroup={handleNewGroup}/>
        </div>
    );
};

export default Groups;
