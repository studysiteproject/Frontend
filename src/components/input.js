import '../scss/search.scss';
import { REGEX, REGEX_MESSAGE } from '../data/regex';
import { useState } from 'react';

{/* 검색창 */}
function Search(props) {

    const [beforeSearch, setbeforeSearch] = useState("");
    const _ = require('lodash');

    // 한글의 자음 / 모음만 존재하는 검색어는 제외
    function isword(data){
        if(data.match(new RegExp(REGEX.KOREAN_NOT_WORD))){
            props.setMainSearch(beforeSearch);
        }
        else{
            props.setMainSearch(data);
            setbeforeSearch(data);
        }
    }

    const isword_action = _.debounce(isword, 500);

    return (
        <div className="Search">
            <img src="/img/icon/search.svg"></img>
            <input type="search" className="search-input" placeholder="검색어를 입력하세요" 
            onChange={(e)=>{isword_action(e.target.value)}} />
        </div>
    );
  
}

export default Search;