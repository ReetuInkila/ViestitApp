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
        if(newGroup.trim() !== ''){
            const copy= [...groups];
            const newId = Math.max(...copy.map(group => group.id)) + 1
            copy.push({id:newId, name:newGroup})
            setGroups(copy)
            setNewGroup('')
        }
    };

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
