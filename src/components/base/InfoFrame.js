import '../../scss/base/InfoFrame.scss';

function InfoFrame(props){

    var Frame_style = {
        width: '0px'
    }
    
    // 정해진 width 값이 존재하는 경우
    if (typeof props.width !== 'undefined') {
        Frame_style['width'] = props.width;
    }

    if (typeof props.minWidth !== 'undefined') {
        Frame_style['minWidth'] = props.minWidth;
    }

    return (
        <div className="Info-Frame" style={Frame_style}>
            <div className="Info-Logo">
                <img className="Logo" src="/img/docker.svg" />
                <div className="Info-View">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default InfoFrame;