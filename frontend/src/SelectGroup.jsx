const SelectGroup = ({groupName, setGroupName, handleGroup}) => {

    const handleGroupChange = (event) => {
        setGroupName(event.target.value)  
    }

    return (
        <div className="selectGroup">
            <input 
                id="group"
                value={groupName}
                onChange={handleGroupChange}
            />
            <button onClick={handleGroup}>Select</button>
        </div>
    )
}

export default SelectGroup