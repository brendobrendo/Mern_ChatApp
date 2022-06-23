import React, { useState } from "react";
import './App.css';
import LogReg from "./views/LogReg";
import UserList from "./views/UserList";
import axios from "axios";
import {
  Link,
  Switch,
  Route,
  Redirect,
  useHistory,
  BrowserRouter
} from "react-router-dom";
import Main from './views/Main';
import Chat1 from './views/Chat1';
import Chat2 from './views/Chat2';
import Chat3 from './views/Chat3';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  const logout = () => {
    axios
      .post(
        "http://localhost:8000/api/logout",
        {},
        {
          // need to send the cookie in request so server can clear it
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        setIsLoggedIn(false);
      })
      .catch(console.log);

    history.push("/");
  };

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Switch>
            {/* route long to short */}
            {/* <Routes> */}
            {/* <h1>Welcome to the Chat App!</h1> */}
            {isLoggedIn && <button onClick={logout}>Logout</button>}
            <Route>
              <LogReg setLoggedIn={() => setIsLoggedIn(true)} path="/" />
              <UserList path="/users"/>
            </Route>
            <Link to="/users">Get Users List</Link>

            <Route path="/main">
              <Main />
            </Route>
            <Route exact path={"/login"} >
              <LogReg />
            </Route>
            <Route exact path={"/logout"} >
              <LogReg />
            </Route>
            {/* <Route exact path={"/"}>
              <Redirect to="/home" />
            </Route> */}
            {/* </Routes> */}
          </Switch>
        </BrowserRouter>  
      </div>
    </>
  );
}

export default App;