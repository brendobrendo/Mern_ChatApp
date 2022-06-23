
import Register from "./views/Register";
import Login from "./views/Login";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Main from './views/Main';
import Chat1 from './views/Chat1';
import Chat2 from './views/Chat2';
import Chat3 from './views/Chat3';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          {/* route long to short */}
          {/* <Routes> */}

          <Route path="/home/" element={<Main />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Login />} />  
          {/* <Route path= "/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logout">
            <Login />
          </Route> */}
          {/* </Routes> */}
      </Routes>
  </BrowserRouter>
  );
}

export default App;