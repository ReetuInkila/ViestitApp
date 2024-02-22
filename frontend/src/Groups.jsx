import './groups.css'
import AddGroup from './AddGroup';
import { useState, useEffect } from 'react'
import axios from 'axios'

const Groups = ({ setSelectedGroup }) => {
    const[newGroup, setNewGroup] = useState('')
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        axios
        .get('https://viestit-backend-rx347ght6q-lz.a.run.app/api/groups')
        .then(response => {
            setGroups(response.data)
        })  
    }, [])

    const handleGroupClick = (groupId) => {
        setSelectedGroup(groupId);
    };

    const handleNewGroup = () => {
        if (newGroup.trim() !== '') {
            const newGroupData = {
                name: newGroup
            };
    
            // Send the new group to the backend
            axios
                .post('https://viestit-backend-rx347ght6q-lz.a.run.app/api/addgroup', newGroupData)
                .then(response => {
                    const newGroupId = response.data.id // Extract ID from response
                    const copy = [...groups]
                    copy.push({ id: newGroupId, name: newGroup }) // Use the ID received from the server
                    setGroups(copy)
                    setNewGroup('')
                })
                .catch(error => {
                    console.error('Error adding group:', error)
                })
        }
    }
    

    return (
        <div className="groups">
            {groups.map((group) => (
                <li key={group.id}>
                    <button onClick={() => handleGroupClick(group.id)}>{group.name}</button>
                </li>
            ))}
            <AddGroup newGroup={newGroup} setNewGroup={setNewGroup} handleNewGroup={handleNewGroup}/>
        </div>
    );
};

export default Groups;
