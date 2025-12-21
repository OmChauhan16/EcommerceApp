import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


//Async thunk to fetch users orders 
export const fetchUserOrders = createAsyncThunk("orders/fetchUserOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.data)
        }
    }
)

//Async Thunk to fetch order details by Id
export const fetchOrderDetails = createAsyncThunk(
    "orders/fetchOrderDetails", async (orderId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            )
            console.log(response.data, 'response');

            return response.data;

        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const finalizeCheckout = createAsyncThunk(
    "checkout/finalizeCheckout",
    async (checkoutId, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);



const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        totalOrders: 0,
        orderDetails: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        //Fetch user orders
        builder
            .addCase(fetchUserOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

            //Fetch Order Details
            .addCase(fetchOrderDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.orderDetails = action.payload;
            })
            .addCase(fetchOrderDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            //finalize checkout
            .addCase(finalizeCheckout.pending, (state) => {
                state.loading = true;
            })
            .addCase(finalizeCheckout.fulfilled, (state, action) => {
                state.loading = false;
                state.orders.unshift(action.payload); // ✅ add new order instantly
            })
            .addCase(finalizeCheckout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Finalize failed";
            });

    }
})

export default orderSlice.reducer;