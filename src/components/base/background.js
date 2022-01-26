function Background(props){

    var Background_style = {
        display:'flex',
        justifyItems: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        
        background: 'rgba(219, 219, 219, 0.5)'
    }

    // 정해진 width 값이 존재하는 경우
    if (typeof props.padding !== 'undefined') {
        Background_style['padding'] = props.padding;
    }

    return (
        <div style={Background_style}>
            {props.children}
        </div>
    )

}

export default Background;