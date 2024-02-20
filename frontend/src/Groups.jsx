import './groups.css'
import AddGroup from './AddGroup';
import { useState } from 'react'

const Groups = ({ setSelectedGroup }) => {
    const[newGroup, setNewGroup] = useState('')
    const [groups, setGroups] = useState([
        { id: 1, name: 'group1' },
        { id: 2, name: 'group2' },
        { id: 3, name: 'group3' }
    ]);

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
