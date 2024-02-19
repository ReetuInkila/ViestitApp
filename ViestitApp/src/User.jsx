import './user.css'

const User = ({userName, handleNameChange}) => {

    return (
        <div className="user">
            <label>Username : 
                <input 
                    id="usr"
                    value={userName}
                    onChange={handleNameChange}
                />
            </label>
        </div>
    )
}

export default User
