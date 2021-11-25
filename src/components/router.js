import Header from "./header";
import Footer from "./footer";

import MainPage from "../pages/Main";
import LoginPage from "../pages/Login";

import { BrowserRouter, Route , Routes } from "react-router-dom";

export default () => (
    <BrowserRouter>
        <Header/>
        <Routes>
            <Route path='/' element={<MainPage/>}></Route>
            <Route path='/login' element={<LoginPage/>}></Route>
        </Routes>
        <Footer/>
    </BrowserRouter>
)