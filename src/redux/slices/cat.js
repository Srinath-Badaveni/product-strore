import {createSlice} from "@reduxjs/toolkit"

const cat = createSlice ({
    name:"category",
    initialState : {
        category : '',
        categories: []
    },
    reducers: {
        setCat: (state,action) =>{
            state.category = action.payload || ''
        },
        setCategories: (state,action) =>{
            state.categories.push(action.payload)
        }
    }
})


export const {setCat} = cat.actions;
export const {setCategories} = cat.actions;

export default cat.reducer;