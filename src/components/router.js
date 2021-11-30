import Header from "./base/header";
import Footer from "./base/footer";

import MainPage from "../pages/Main";
import LoginPage from "../pages/Login";
import RegisterPage from '../pages/Register';

import { BrowserRouter, Route , Routes } from "react-router-dom";

export default () => (
    <BrowserRouter>
        <Header/>
        <Routes>
            <Route path='/' element={<MainPage/>}></Route>
            <Route path='/login' element={<LoginPage/>}></Route>
            <Route path='/register' element={<RegisterPage/>}></Route>
        </Routes>
        <Footer/>
    </BrowserRouter>
)