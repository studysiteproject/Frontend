import '../scss/category.scss'

import { useSelector, useDispatch } from 'react-redux';
import { actionList } from '../redux-modules/SelectReducer.js'

function Category(props) {

    const select = useSelector((state) => state.selectReducer.select)
    const dispatch = useDispatch()

    var categorylist = ['전체', '개발', '디자인', '공무원'];
    
        return (
            <div className="Category">
                <div className="category-items">

                    {
                        categorylist.map((category, i) => {
                            
                            // 코드를 저장하는 변수
                            let code;
                            
                            // 선택된 카테고리일때와 아닐때 다르게 출력된다.
                            select == i
                            ? code = <div className="category-item-select" onClick={()=>{dispatch(actionList.changeSelect(i))}}>
                                    <div className="category-item-text">{category}</div>
                                    <div className="category-item-mark"></div>
                                </div>
                            : code = <div className="category-item" onClick={()=>{dispatch(actionList.changeSelect(i))}}>
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