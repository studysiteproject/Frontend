import axios from 'axios';
import { ActivePopup, UnActivePopup } from './InfoManage';

// 유저 로그인을 진행하는 API
export function RegisterAPI(data){

    const dispatch = useDispatch();

    axios.post(`${process.env.REACT_APP_DJANGO_API_URL}/user/create`, data, { withCredentials: true, credentials: "include" })
    .then(res => {
        dispatch(ActivePopup("info", "회원가입에 성공하였습니다."));
        dispatch(UnActivePopup(2));
        return res;
    })
    .catch(function (error) {
        dispatch(ActivePopup("error", "회원가입에 실패하였습니다."));
        dispatch(UnActivePopup(2));
        return error;
    });

}