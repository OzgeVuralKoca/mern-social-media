import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layouts from "./layouts";
import NotFound from "./notFound";
import Login from "./login";
import Register from "./register"
import Home from "./home";
import Profile from "./profile"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Layouts />} >
            <Route index element={<Home />}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </ Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
