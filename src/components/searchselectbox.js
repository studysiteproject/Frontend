import React, { useState } from 'react';
import Select from 'react-select';

// 상위 props에서 아래 4개의 값을 전달해야한다.
// 1. options 배열
// 2. placeholder
// 3. 선택한 값(choice)과 해당 값의 변경 함수(setChoice) (useState 이용)
function SearchSelectBox(props) {
  
  return (
    <>
      <Select
        styles={{
          menu: provided => ({...provided, zIndex: 999}),
        }}
        value={""}
        item={props.options.find(op => { // choice state에 따라 디폴트 option 세팅
          return op.value === props.choice
        })}
        placeholder={props.placeholder}
        onChange={(item) => {
            props.setChoice(item.value);
        }}
        options={props.options}
        isSearchable={true}
      />
    </>
  );
}

export default SearchSelectBox