import {configureStore} from "@reduxjs/toolkit"
import cat from "./slices/cat"

export const store = configureStore({
    reducer :{
        category: cat
    }
})