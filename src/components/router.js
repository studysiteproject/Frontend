import MainPage from "../pages/Main";
import LoginPage from "../pages/Login";
import RegisterPage from '../pages/Register';
import EmailReAuthPage from "../pages/EmailReAuth";
import EmailAuthPage from "../pages/EmailAuth";

import { BrowserRouter, Route , Routes } from "react-router-dom";

export default () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<MainPage/>}></Route>
            <Route path='/login' element={<LoginPage/>}></Route>
            <Route path='/register' element={<RegisterPage/>}></Route>
            <Route path='/auth/email/resend' element={<EmailReAuthPage/>}></Route>
            <Route path='/auth/email/:token' element={<EmailAuthPage/>}></Route>
        </Routes>
    </BrowserRouter>
)