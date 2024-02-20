const AddGroup = ({newGroup, setNewGroup, handleNewGroup}) => {

    const handleGroupChange = (event) => {
        setNewGroup(event.target.value)  
    }

    return (
        <div className="addGroup">
            <input 
                id="group"
                value={newGroup}
                onChange={handleGroupChange}
            />
            <button onClick={handleNewGroup}>add group</button>
        </div>
    )
}

export default AddGroup