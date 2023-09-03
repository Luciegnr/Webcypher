
import './style.scss'

const ConnectedUsers = ({ users }) =>

    <section className="container-connectedUser" >
        {users.map((user, index) => (
            <div key={index} className="horizontal-scroll">
                <div className="horizontal-scroll__item">
                    <p> {user.username}</p>
                </div>
            </div>
        )
        )}
    </section >

export default ConnectedUsers;