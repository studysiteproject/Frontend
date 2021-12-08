import '../scss/pages/Main.scss'

import Header from '../components/base/header'
import Footer from '../components/base/footer'
import Category from "../components/category";
import Banner from '../components/base/banner';
import Search from "../components/input";
import CreateStudyButton from "../components/button";
import StudyList from '../components/StudyList';

function MainPage(){
    return (
        <>
            <Header/>
            <Category/>
            <Banner/>
            <div className="flex-row-end">
                <Search/>
                <CreateStudyButton/>
            </div>
            <StudyList/>
            <Footer/>
        </>
    );
}

export default MainPage