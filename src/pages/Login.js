import { Link } from 'react-router-dom';
import '../scss/pages/Login.scss'

function LoginPage(){
    return (
        <div className="Login">
            <div className="Login-View">
                <img src="img/docker.svg" />
                <div className="Login-View-input">

                    {/* ID & PW 입력 창 */}
                    <div className="Login-View-input-info">
                        <input type="text" className="Login-View-input-info id" placeholder="ID"/>
                        <hr style={{margin: '0px', color: 'rgba(0, 0, 0, 0.10)'}}/>
                        <input type="password" className="Login-View-input-info password" placeholder="Password"/>
                    </div>

                    {/* 로그인 버튼 */}
                    <div class="Login-View-input-button">
                        <button className="Button-Md" onClick={()=>{alert("로그인 버튼 테스트")}}>
                            <text>로그인</text>
                        </button>
                    </div>
                    
                    {/* 이동 버튼 */}
                    <ul className="Login-View-input-links">
                        <li className="text"><Link to="/" style={{ textDecoration: 'none', color: '#222222' }}>아이디 찾기</Link></li>
                        <li className="text"><Link to="/" style={{ textDecoration: 'none', color: '#222222' }}>비밀번호 찾기</Link></li>
                        <li className="text"><Link to="/signup" style={{ textDecoration: 'none', color: '#222222' }}>회원가입</Link></li>
                    </ul>

                </div>
            </div>
        </div>
    );
}

export default LoginPage