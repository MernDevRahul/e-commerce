import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../utils/axios'

export const fetchProducts = createAsyncThunk("/product/get",async(__dirname,thunkAPI)=>{    
    try {
        const res = await axios.get("/product/get");        
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
})

const productSlice = createSlice({
    name:'product',
    initialState:{
        products:null,
        loading:false,
        error:null,
    },
    reducers:{
        update: (state, action, ind)=>{
            state.product[ind]={
                ...state.product[ind],
                ...action.payload
            };
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export const { update } = productSlice.actions;
export default productSlice.reducer; 