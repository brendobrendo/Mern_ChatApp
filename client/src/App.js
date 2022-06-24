
import Register from "./views/Register";
import Login from "./views/Login";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Main from './views/Main';
import Chat1 from './views/Chat1';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home/" element={<Main />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Login />} />  
        <Route path="/chat1" element={<Chat1 />} />  
      </Routes>
  </BrowserRouter>
  );
}

export default App;