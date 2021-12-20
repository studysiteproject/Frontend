import '../../scss/base/header.scss'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { UserAuthActionList } from '../../redux-modules/UserReducer';

function Header() {

    // 로그인 상태 확인
    const islogin = useSelector((state) => state.userReducer.islogin);
    const dispatch = useDispatch();

    const [clickprofile, setclickprofile] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {

            // localStorage에서 islogin 값을 얻어온다.
            const value = JSON.parse(window.localStorage.getItem("islogin"));
            if(value) dispatch(UserAuthActionList.SetLoginState(value))

            // 토큰 & 유저 인덱스가 설정되지 않은 상태일 때
            if (!document.cookie.includes('access_token') || !document.cookie.includes('index'))
            {   
                dispatch(UserAuthActionList.SetLoginState(false));
                localStorage.setItem("islogin", false);
            }
        }
    },[]);

    // 로그인 된 상태일 때
    if (islogin){
        return (
            <div className="Header">
                <div className="logo-div">
                    <Link to="/">
                        <img className="logo-img" src="/img/docker.svg"></img>
                    </Link>
                </div>
                <nav>
                    <ul className="gnb">
                        <li className="text"><Link to="/" style={{ textDecoration: 'none', color: '#222222' }}>스터디관리</Link></li>
                        <li className="icon">
                            <div style={{position: 'relative'}}>
                                <img src="/img/icon/user_circle.svg" 

                                    // 해당 아이콘 클릭 시, 메뉴 확인
                                    onClick={()=>{setclickprofile(!clickprofile)}}
                                />
                                {
                                    clickprofile
                                    ? <div class="menu-profile" 
                                        
                                        // 클릭 시 보이는 메뉴에서 마우스를 벗어나면 다시 숨긴다.
                                        onMouseLeave={()=>{setclickprofile(false)}}
                                    >
                                        <ul>
                                            <li><Link to="/profile" style={{ textDecoration: 'none', color: '#222222' }}>프로필 확인</Link></li>
                                            <li><Link to="/logout" style={{ textDecoration: 'none', color: '#222222' }}>로그아웃</Link></li>
                                        </ul>
                                    </div> 
                                    : null
                                }
                            </div>
                        </li>
                        
                    </ul>
                </nav>
            </div>
        );
    }

    // 로그인이 되지 않은 상태일 때
    else{
        return (
            <div className="Header">
                <div className="logo-div">
                    <Link to="/">
                        <img className="logo-img" src="/img/docker.svg"></img>
                    </Link>
                </div>
                <nav>
                    <ul className="gnb">
                        <li className="text"><Link to="/register" style={{ textDecoration: 'none', color: '#222222' }}>회원가입</Link></li>
                        <li className="text"><Link to="/login" style={{ textDecoration: 'none', color: '#222222' }}>로그인</Link></li>
                    </ul>
                </nav>
            </div>
        );
    }

  
}

export default Header;