import '../scss/search.scss';

{/* 검색창 */}
function Search() {

    return (
        <div className="Search">
            <img src="img/icon/search.svg"></img>
            <input type="search" className="search-input" placeholder="검색어를 입력하세요"></input>
        </div>
    );
  
}

export default Search;