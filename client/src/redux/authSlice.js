import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from "../api/axiosInstance";

const createAuthRequest = (name, requestType, path, dataField) => {
    return createAsyncThunk(
        `auth/${name}`,
        async (payload = null) => {
            try {
                const response = await api[requestType](path, payload);
                return response.data[dataField];
            } catch (error) {
                throw error.response.data.error;
            }
        }
    );
};

const registerUser = createAuthRequest('registerUser', 'post', '/auth/register', 'user');
const loginUser = createAuthRequest('loginUser', 'post', '/auth/login', 'user');
const getUser = createAuthRequest('getUser', 'get', '/auth/get-auth-user', 'user');
const logoutUser = createAuthRequest('logoutUser', 'post', '/auth/logout', 'message');


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        error: null,
        authError: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(registerUser.pending, (state) => {
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(logoutUser.pending, (state) => {
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(getUser.pending, (state, action) => {
                state.authError = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.authError = action.payload;
            });
    },


});

export {registerUser, loginUser, getUser, logoutUser};
export const {setUser, setError} = authSlice.actions;
export default authSlice.reducer;
