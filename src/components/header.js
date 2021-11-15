import '../css/header.css'

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

    if (access_token_exits && user_index){
        return (
            <div className="Header">
                <div className="logo-div">
                    <a href="#">
                        <img className="logo-img" src="img/docker.svg"></img>
                    </a>
                </div>
                <nav>
                    <ul className="gnb">
                        <li className="text"><a href="">스터디관리</a></li>
                        <li className="icon"><a href=""><img src="img/icon/user_circle.svg"></img></a></li>
                    </ul>
                </nav>
            </div>
        );
    }
    else{
        return (
            <div className="Header">
                <div className="logo-div">
                    <a href="#">
                        <img className="logo-img" src="img/docker.svg"></img>
                    </a>
                </div>
                <nav>
                    <ul className="gnb">
                        <li className="text"><a href="">회원가입</a></li>
                        <li className="text"><a href="">로그인</a></li>
                    </ul>
                </nav>
            </div>
        );
    }

  
}

export default Header;