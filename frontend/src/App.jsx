import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import { Toaster } from "react-hot-toast"
import { Navigate, Route, Routes } from "react-router-dom"
import { useCallback } from "react"
import { useAuthContext } from "./context/AuthContext"
function App() {
  const {authUser} = useAuthContext();
  return (
    <div className='p-2 h-screen flex items-center justify-center'>
      <Routes>
        <Route path="/" element={authUser ? <Home/>: <Navigate to={'/Login'} />} />
        <Route path="/SignUp" element={authUser ? <Navigate to={'/'} />: <SignUp/>} />
        <Route path="/Login" element={authUser ? <Navigate to={'/'} />: <Login/>} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
