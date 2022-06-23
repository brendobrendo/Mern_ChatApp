import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';

export function Login() {
    const navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault();

        const form = e.target;
        const user = {
            username: form[0].value,
            password: form[1].value
        }
        fetch("http://localhost:8000/user/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem("token", data.token)
                console.log("Logged In successfully")
                navigate("/home/");
            })
            // .then(history.push("/home/"))
            .catch(error => (console.log(error)))
        // .then(history.push("/profile"))
        // .then(data => {data.isLoggedIn ? history.push("/profile") : null})
    }

    useEffect(() => {
        fetch("/user/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => data.isLoggedIn ? navigate("/") : null)
    }, [])

    return (
        <>
            <form onSubmit={e => handleLogin(e)}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label>Username: </label>
                            </td>
                            <td>
                                <input required type="text" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Password: </label>
                            </td>
                            <td>
                                <input required type="password" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" className='btn btn-primary'>Log In</button>
            </form>
            Don't have an account yet? Click <Link to="/register">HERE</Link> to register!
        </>
    )
}

export default Login;