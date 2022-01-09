function SetValueInJson(MyJson, key, value){
    let newjson = {...MyJson}
    newjson[key] = value
    return newjson
}

function AddValueInArray(MyArray, value){

    let newarray = [...MyArray];
    
    // 이미 존재하는 값 인지 확인
    let isExist = false

    // 만약 이미 존재하는 스킬일경우 isExist 값을 참으로 변경
    newarray.map((item)=>{
        if (item == value){
            isExist = true
        }
    })

    // 이미 존재하는 값일경우 추가하지 않는다.
    if (!isExist){
        newarray.push(value);
    }

    // 변경된 배열 적용
    return newarray;
}

function DeleteValueInArray(MyArray, value){
    var newarray = [...MyArray];
    
    // 삭제를 원하는 값이 존재할 경우 목록에서 삭제
    newarray.map((item, i)=>{
        if (item.value == value){
            newarray.splice(i,1);
        }
    })

    return newarray
}

function AddJsonInArray(MyArray, input_json){

    let newarray = [...MyArray];
    
    // 이미 존재하는 값 인지 확인
    let isExist = false

    // 만약 이미 존재하는 스킬일경우 isExist 값을 참으로 변경
    newarray.map((item)=>{
        if (JSON.stringify(item) === JSON.stringify(input_json)){
            isExist = true
        }
    })

    // 이미 존재하는 값일경우 추가하지 않는다.
    if (!isExist){
        newarray.push(input_json);
    }

    // 변경된 배열 반환
    return newarray;
}

function DeleteJsonInArray(MyArray, input_json){
    var newarray = [...MyArray];
    
    // 삭제를 원하는 값이 존재할 경우 목록에서 삭제
    newarray.map((item, i)=>{
        if (JSON.stringify(item) === JSON.stringify(input_json)){
            newarray.splice(i,1);
        }
    })

    return newarray
}

export const GetEditValue = {
    SetValueInJson,
    AddValueInArray,
    DeleteValueInArray,
    AddJsonInArray,
    DeleteJsonInArray
}