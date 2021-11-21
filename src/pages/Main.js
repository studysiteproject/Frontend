import '../scss/pages/Main.scss'

import Category from "../components/category";
import Banner from '../components/banner';
import Search from "../components/input/search";
import CreateStudyButton from "../components/button/CreateStudyButton";
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