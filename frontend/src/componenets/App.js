import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layouts from "./layouts";
import NotFound from "./NotFound";
import Login from "./Login";
import Register from "./register"
import Home from "./HomeComponents/home";
import Profile from "./ProfileComponent/Profile";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Layouts />} >
            <Route index element={<Home />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
