import '../scss/category.scss'

function Category(props) {

    var categorylist = ['전체', '개발', '디자인', '공무원'];
    
        return (
            <div className="Category">
                <div className="category-items">

                    {
                        categorylist.map((category, i) => {
                            
                            // 코드를 저장하는 변수
                            let code;
                            
                            // 선택된 카테고리일때와 아닐때 다르게 출력된다.
                            props.select == i
                            ? code = <div className="category-item-select" onClick={()=>{props.setselect(i)}}>
                                    <div className="category-item-text">{category}</div>
                                    <div className="category-item-mark"></div>
                                </div>
                            : code = <div className="category-item" onClick={()=>{props.setselect(i)}}>
                                    <div className="category-item-text">{category}</div>
                                    <div className="category-item-mark"></div>
                                </div>

                            return(code)
                        })
                    }
                    
                </div>
                <div className="category-line"></div>
            </div>
        );
  
}

export default Category;