import React from 'react'
import Navbar from './components/Navbar'
import {Route, BrowserRouter, Routes} from 'react-router-dom'
import HomePage from "./pages/HomePage"
import LogIn from "./pages/LogInSignUp/LogIn"
import SignUp from "./pages/LogInSignUp/SignUp"
import FullPost from "./components/FullPost"

function App() {
    return (<BrowserRouter basename={process.env.PUBLIC_URL}>
            <Navbar/>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/signup"} element={<SignUp/>}/>
                <Route path={"/login"} element={<LogIn/>}/>
                <Route path={"/post/:id"} element={<FullPost/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
