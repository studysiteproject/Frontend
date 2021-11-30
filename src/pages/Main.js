import '../scss/pages/Main.scss'

import Category from "../components/category";
import Banner from '../components/base/banner';
import Search from "../components/input";
import CreateStudyButton from "../components/button";
import StudyList from '../components/StudyList';

function MainPage(){
    return (
        <>
            <Category/>
            <Banner/>
            <div className="flex-row-end">
                <Search/>
                <CreateStudyButton/>
            </div>
            <StudyList/>
        </>
    );
}

export default MainPage