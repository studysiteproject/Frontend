import '../scss/pages/MyStudyList.scss'

import Footer from "../components/base/footer"
import Header from "../components/base/header"
import { useState } from 'react'
import { CheckUserInfo } from '../components/util/Checkinfo';
import { GetEditValue } from '../components/util/GetEditValue';

function MyStudyListPage(){

    const [profileimage, setprofileimage] = useState("https://catchstudy-images.s3.ap-northeast-2.amazonaws.com/profile/10/098bea02d929beaa0bd712e602a4dd7b6de5a3791cda4646370088c41ac8292d.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLW5vcnRoZWFzdC0yIkcwRQIgMoq%2BcdvumXk11LKNAmqNFYfI89NVTe1v5V613u%2BoCowCIQDL%2Bt5XBYc%2BYWLBF%2BSor2TI1sfxSEqWsKUK5aX12yPyNSr%2FAgjQ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDkwNTkwMTA4MjI4OSIM2jhQaz0uExBvMyccKtMCF1%2Bofp0T7ZfCBeY2%2FczyHwqNkdNXmX1SJFh3oX%2FmFWEosTYGA%2FhTWVm9XXv44LPUz5GEkQETVqv1MZTqvMQDj6FbkkYTqdGaH7tr09h3WPMoF84nOFbtUWWgYEX0GnRYN5aDRjlMvwLEoTGspnbG%2B%2Bnd31%2BvN3VJUFn6%2FR98k8iS%2FqUhVqF6VIosKGWOkB2FnPqkS60TBhCWvk0dedTGIPPJ%2BB0RR33%2B9ZypF6NWuxi1sAMKbd2Mj0PsSK7gVGtJWiFqGwX%2FsTLMzjnhAwH6HSRYUZYjnl21DyNPe3XX05nE%2Fy4ujeCovBg%2FBXaMxav60xTPAac5uBvsJNBg9Wzz8I8yi193sXEOK2r4YpdWsf%2BFw%2FvRooOFWAvOmAPeF41uvXfhlmAlZDteLCQAafQ2LMaLftPjMmn6FJmZsz9cECuCB13jIDesQweLIi%2ByeYB1418yMMyw5I4GOrMCsbGT%2BFuVX%2B6NbgrQWvoeSEsFxmGR9I3pGvsys0vOU%2FHismYpDmAPBEzRBP61jyY9KDHCyWqhC9fnwAw9t9R06E9EHWttud4kI7QeDW371uZearKW7Ye67d08fl5gJkQzWB2nNlNXW13QR5DAJyB2iVO%2Fx77fUpiOFgn9kyZtzr5yiNcVYXMk5htI1ZHeRKW2cJONIaq1J8LyvtifuI4XzBWLV2Rn1tn7ne0HHJO8yhi96VFMWTBHgCyHjE%2F31qagVgFITKZfnwlrcXYCyHhpyPK4vW4IdRm4g%2FBPNFkM4fCt%2FBNIhv2Rajq7umtcT7RScHtNFP6r2FQMgWIjpb7q%2Ftrh%2BW%2FfxdLFNNuxLVUkrRBlewu52%2FXUZA2Niyhhqsxxn6uhl%2BpW865YTFP3m8G%2FwWLa5w%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220108T063532Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA5F27JQ2YSIOHYKNG%2F20220108%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=63be3a1336b92ec527d69ddd740430d9f734b070aa90fe593584b137e99b00a9");
    const [UserInfo, SetUserInfo] = useState(
        {
            "Name": "테스트",
            "Email": "",
            "job": "",
            "techlist": [],
            "urllist": [],
            "profileimage": ""
        }
    )

    const valuetest = {
        "id":1,
        "name":"테스트 기술",
        "category": "카테고리",
        "icon_url":"url"
    }

    return(
        <>
            <Header/>

                <button onClick={()=>{console.log(UserInfo)}}>값 확인</button>
                <button onClick={()=>{console.log(UserInfo)}}>배열 값 변경</button>
                <button onClick={()=>{
                    const newTechlist = GetEditValue.AddJsonInArray(UserInfo["techlist"], valuetest);
                    const newUserInfo = GetEditValue.SetValueInJson(UserInfo, "techlist", newTechlist);
                    SetUserInfo(newUserInfo);
                }}>배열에 값 추가</button>
                <button onClick={()=>{
                    const newTechlist = GetEditValue.DeleteJsonInArray(UserInfo["techlist"], valuetest);
                    GetEditValue.SetValueInJson(UserInfo, "techlist", newTechlist);
                    }}>배열에서 값 삭제</button>

                <div className="List-Frame">


                    {/* 프로필 요약 부분 */}
                    <div className="Profile-item">
                        <div className="image">
                            <img src={profileimage}/>
                        </div>

                        <div className="Profile-info">
                            <div className='Font-Md Bold' style={{textOverflow:'ellipsis'}}>김동연</div>
                            <div className='Font-Sm Semi Bold' style={{textOverflow:'ellipsis'}}>{
                                123
                            }</div>
                            <button class="Button-Sm">프로필 관리</button>
                        </div>

                    </div>

                    {/* 스터디 목록 조회 부분 */}
                    <div className="StudyList-item">
                        2
                    </div>
                </div>

            <Footer/>
        </>
    )
}

export default MyStudyListPage