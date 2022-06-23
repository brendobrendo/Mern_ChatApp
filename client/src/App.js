import React, { useState } from "react";
import './App.css';
import LogReg from "./views/LogReg";
import UserList from "./views/UserList";
import axios from "axios";
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Main from './components/Main';
import Chat1 from './views/Chat1';
import Chat2 from './views/Chat2';
import Chat3 from './views/Chat3';

function App() {
  return (
    <div className="App">
      <Switch>
        {/* route long to short */}
        {/* <Routes> */}
        <h1>Welcome to the Chat App!</h1>
        {isLoggedIn && <button onClick={logout}>Logout</button>}
        <Route>
          <LogReg setLoggedIn={() => setIsLoggedIn(true)} path="/" />
          <UserList path="/users" />
        </Route>
        <Link to="/users">Get Users List</Link>

        <Route path="/home">
          <Main />
        </Route>

        <Route exact path={"/register"}>
          <Register />
        </Route>
        <Route exact path={"/login"} >
          <LogReg />
        </Route>
        <Route exact path={"/logout"} >
          <LogReg />
        </Route>
        <Route exact path={"/profile"} >
          <Redirect to="/projects" />
        </Route>
        <Route exact path={"/"}>
          <Redirect to="/projects" />
        </Route>
        {/* </Routes> */}
      </Switch>
    </div>
  );
}

export default App;