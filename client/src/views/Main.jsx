import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';

const Main = (props) => {

    const history = useHistory();
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/user/isUserAuth", {
            method: 'POST',
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => {
                setUser(data.username)
                console.log("User Auth response", data)
                return data.isLoggedIn ? null : history.push("/login")
            })
    }, []);


    return (
        <div>
                <div className='topbar'>
                    <h1>Home Page</h1>
                    <div className='topRight'>
                        <button className='btn btn-info btn-outline-dark'><Link to="/home">Home</Link></button>
                        <button className='btn btn-info btn-outline-dark'>
                            <Link to="/logOut">Log Out</Link>
                        </button>
                </div>
            </div>
        </div>
    )
}

export default Main;