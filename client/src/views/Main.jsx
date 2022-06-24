import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Main = (props) => {

    const navigate = useNavigate();
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
                return data.isLoggedIn ? null : navigate("/home/")
            })
    }, []);


    return (
        <>
        <h1>Home Page</h1>
            <button>
                <a href="/logOut">Log Out</a>
            </button>
        </>
    )
}

export default Main;