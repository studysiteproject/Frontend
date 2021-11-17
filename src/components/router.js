import Header from "./header";
import Footer from "./footer";

import MainPage from "../pages/Main";

import { BrowserRouter, Route , Routes } from "react-router-dom";

export default () => (
    <BrowserRouter>
        <Header/>
        <Routes>
            <Route path='/' element={<MainPage/>}></Route>
        </Routes>
        <Footer/>
    </BrowserRouter>
)