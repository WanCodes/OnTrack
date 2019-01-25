const initalState = {
    books:[],
    pageCount:0,
    currentPage:null
}

const reducer = (state = initalState, action) => {

    switch (action.type){
        case 'UPDATE_BOOKS':
            return {
                ...state,
                books: action.value.books,
                pageCount:action.value.pageCount,
                currentPage:action.value.currentPage
            }
        default: return state;
    }
}

export default reducer;