import { useNavigate,Link } from 'react-router-dom';
import { useEffect } from 'react';

export function Register() {
    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();

        const form = e.target;
        const user = {
            username: form[0].value,
            email: form[1].value,
            firstname: form[2].value,
            lastname: form[3].value,
            password: form[4].value,
            confirmPassword: form[5].value
        }

        fetch("http://localhost:8000/user/signup", {
            method: "POST",
            headers : {
                "Content-type" : "application/json"
            },
            body: JSON.stringify(user)
        })
          navigate("/home/");
    }

    useEffect(() => {
        fetch("/user/isUserAuth", {
            headers: {
                "x-access-token" : localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? navigate("/home/") : null)
    }, [])

    return(
        <>
        <form onSubmit={e => handleRegister(e)}>
            <table className='table'>
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
                                        <label>Email: </label>
                                    </td>
                                    <td>
                                        <input required type="email" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>First Name: </label>
                                    </td>
                                    <td>
                                        <input required type="text" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Last Name: </label>
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
                                <tr>
                                    <td>
                                        <label>Confirm Password: </label>
                                    </td>
                                    <td>
                                        <input required type="password" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
            <button type="submit" className='btn btn-success'>Register</button>
        </form>
        Already have an account? Click <Link to="/login">HERE</Link> to log in!
        </>
    )
}

export default Register;