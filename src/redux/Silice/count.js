import { createSlice } from "@reduxjs/toolkit";

const countListSlice = createSlice({
    name: "count",
    initialState: {
        count: 1
    },
    reducers: {
        countDown: (state)=>{
            state.count+=1
        }
    }
})

export default countListSlice;
export const {countDown} = countListSlice.actions