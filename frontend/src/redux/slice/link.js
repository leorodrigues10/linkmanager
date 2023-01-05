import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {axiosInstance} from "../../utils/axios";

export const addLink = createAsyncThunk("add/link", async ({data}, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post("/links/", data);
            return response.data;
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);

export const getLinks = createAsyncThunk("get/link", async () => {
    const response = await axiosInstance.get("links/");
    return response.data;
});


export const deleteLinks = createAsyncThunk("delete/link", async ({id}, {dispatch, rejectWithValue}) => {
        try {
            const response = await axiosInstance.delete(`links/${id}/`);
            dispatch(getLinks())
            return response.data;
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);

export const updateLink = createAsyncThunk('update/link', async ({data, id}, {dispatch, rejectWithValue}) => {
    try {
        const response = await axiosInstance.put(`links/${id}`, data);
        dispatch(getLinks())
        return response.data
    } catch (e) {
        return rejectWithValue(e)
    }
})


export const retrieveLink = createAsyncThunk('retrieve/link', async ({id}, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.get(`links/${id}`);
        return response.data;
    } catch (e) {
        return rejectWithValue(e)
    }
})


const initialState = {
    links: [],
    isSubmitting: false,
    isDeleting: false
};

const slice = createSlice({
    name: "link",
    initialState,
    reducers: {},
    extraReducers: {
        [addLink.pending]: (state) => {
            state.isSubmitting = true;
        },
        [addLink.fulfilled]: (state, action) => {
            const {data} = action.payload
            state.links.push(data);
            state.isSubmitting = false;
        },
        [addLink.rejected]: (state) => {
            state.isSubmitting = false;
        },
        [getLinks.fulfilled]: (state, action) => {
            const {data} = action.payload
            state.links = data;
        },
        [deleteLinks.pending]: (state) => {
            state.isDeleting = true;
        },
        [deleteLinks.fulfilled]: (state, action) => {
            state.isDeleting = false;
        },
        [deleteLinks.rejected]: (state) => {
            state.isDeleting = false;
        },

    },
});

export default slice.reducer;
