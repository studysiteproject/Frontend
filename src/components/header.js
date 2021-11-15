import '../css/header.css'

function Header() {
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

export default Header;