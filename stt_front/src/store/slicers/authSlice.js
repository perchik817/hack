import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { api } from '../requests/api';

export const login = createAsyncThunk('auth/login', async ({ password, email }) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.post(`${api}/login`, { password, email });
        const token = response.data.access_token;
        console.log(token)
        localStorage.setItem('access_token', token);
        localStorage.setItem('email', email);
        return { email, token };
    } catch (error) {
        throw error;
    }
});


export const signup = createAsyncThunk('/register', async ({ username, password, email }) => {
    const response = await axios.post( `${api}register`, { username, password, email });
    const token = response.data.access_token;
    localStorage.setItem('access_token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    return { email, token};

});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('access_token') || null,
        username: localStorage.getItem("username") || null,
        email: localStorage.getItem("email") || null,
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem('access_token');
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(signup.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload;
            })
            .addCase(signup.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;