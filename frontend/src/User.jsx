import './user.css'

const User = ({userName, handleNameChange}) => {

    return (
        <div className="user">
            <input 
                id="usr"
                placeholder="Username"
                value={userName}
                onChange={handleNameChange}
            />
        </div>
    )
}

export default User
