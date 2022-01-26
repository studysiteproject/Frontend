import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BasicInfo } from "../data/profile";

function TESTPAGE(props){

    const renderTooltip = (value) => (
        <Tooltip>{value}</Tooltip>  // 사용자의 기술 이름을 표시해준다.
    );

    return(
        <div>
            {
                (props.Array).map((item)=>{
                    return(
                        <OverlayTrigger placement="top" overlay={renderTooltip(item.name)}>
                            <img
                                className='icon'
                                src={`${BasicInfo.TECH_ICON_BASE_URL}/${item['category']}/${item['icon_url']}`}
                            />
                        </OverlayTrigger>
                    )
                })
            }
        </div>
    )
}

export default TESTPAGE;