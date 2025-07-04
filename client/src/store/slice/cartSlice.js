import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchCart = createAsyncThunk('/cart/get',async(__dirname, thunkAPI)=>{
    try {
        const res = await axios.get('/cart/get');
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
})

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        cart:null,
        loading:false,
        error:null,
    },
    reducer:{
        remove:(state, action)=>{
            if(state.cart){
                state.cart= state.cart.filter(item=>item._id !== action.payload);
            }
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export const { remove } = cartSlice.actions;

export default cartSlice.reducer