import '../scss/header.scss'
import { Link } from 'react-router-dom';

const getCookieValue = (key) => {
    let cookieKey = key + "="; 
    let result = "";
    const cookieArr = document.cookie.split(";");
    
    for(let i = 0; i < cookieArr.length; i++) {
      if(cookieArr[i][0] === " ") {
        cookieArr[i] = cookieArr[i].substring(1);
      }
      
      if(cookieArr[i].indexOf(cookieKey) === 0) {
        result = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
        return result;
      }
    }
    return result;
}

function Header() {

    let access_token_exits = getCookieValue("access") ? true : false
    let user_index = getCookieValue("access") ? true : false

    // 로그인 된 상태일 때
    if (access_token_exits && user_index){
        return (
            <div className="Header">
                <div className="logo-div">
                    <Link to="/">
                        <img className="logo-img" src="img/docker.svg"></img>
                    </Link>
                </div>
                <nav>
                    <ul className="gnb">
                        <li className="text"><Link to="/" style={{ textDecoration: 'none', color: '#222222' }}>스터디관리</Link></li>
                        <li className="icon"><Link to="/" style={{ textDecoration: 'none', color: '#222222' }}><img src="img/icon/user_circle.svg"></img></Link></li>
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
                        <img className="logo-img" src="img/docker.svg"></img>
                    </Link>
                </div>
                <nav>
                    <ul className="gnb">
                        <li className="text"><Link to="/signup" style={{ textDecoration: 'none', color: '#222222' }}>회원가입</Link></li>
                        <li className="text"><Link to="/login" style={{ textDecoration: 'none', color: '#222222' }}>로그인</Link></li>
                    </ul>
                </nav>
            </div>
        );
    }

  
}

export default Header;