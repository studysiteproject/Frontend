const changeSelect = value => ({
    type: 'CHANGE_SELECT',
    payload: { category: value }
});

export { changeSelect }