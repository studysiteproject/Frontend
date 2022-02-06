import MainPage from "../pages/Main";
import LoginPage from "../pages/Login";
import LogoutPage from "../pages/Logout";
import RegisterPage from '../pages/Register';
import EmailReAuthPage from "../pages/EmailReAuth";
import EmailAuthPage from "../pages/EmailAuth";
import ProfilePage from "../pages/Profile";

import { BrowserRouter, Route , Routes } from "react-router-dom";
import MyStudyListPage from "../pages/MyStudyList";
import StudyAddPage from "../pages/StudyAdd";
import BasePage from "./base/base";
import SettingsPage from "../pages/Settings";
import StudyEditPage from "../pages/StudyEdit";
import StudyDetailPage from "../pages/StudyDetail";
import { PasswordResetPage, PasswordResetReqPage } from "../pages/PasswordReset";

export default () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<MainPage/>}></Route>
            <Route path='/login' element={<LoginPage/>}></Route>
            <Route path='/logout' element={<LogoutPage/>}></Route>
            <Route path='/profile' element={<ProfilePage/>}></Route>
            <Route path='/register' element={<RegisterPage/>}></Route>
            <Route path='/settings' element={<SettingsPage/>}></Route>
            <Route path='/study/add' element={<StudyAddPage/>}></Route>
            <Route path='/study/edit/:study_id' element={<StudyEditPage/>}></Route>
            <Route path='/study/detail/:study_id' element={<StudyDetailPage/>}></Route>
            <Route path='/study/manage' element={<MyStudyListPage/>}></Route>
            <Route path='/auth/email/resend' element={<EmailReAuthPage/>}></Route>
            <Route path='/auth/email/:token' element={<EmailAuthPage/>}></Route>
            <Route path='/auth/password/reset' element={<PasswordResetReqPage/>}></Route>
            <Route path='/auth/password/reset/:token' element={<PasswordResetPage/>}></Route>
        </Routes>
        <BasePage/>
    </BrowserRouter>
)