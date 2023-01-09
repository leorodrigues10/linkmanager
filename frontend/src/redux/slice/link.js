import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {axiosInstance} from "../../utils/axios";
import {format, formatDistanceToNow, getTime} from 'date-fns';


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
        const response = await axiosInstance.put(`links/${id}/`, data);
        dispatch(getLinks())
        return response.data
    } catch (e) {
        return rejectWithValue(e)
    }
})


export const retrieveLink = createAsyncThunk('retrieve/link', async ({id}, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.get(`links/${id}/`);
        return response.data;
    } catch (e) {
        return rejectWithValue(e)
    }
})

export const getTags = createAsyncThunk('get/tags', async () => {
    const response = await axiosInstance.get('/links/tags/')
    console.log(response.data)
    return response.data
})


export const startCrawl = createAsyncThunk('crawl', async (data, {rejectWithValue}) => {
       try{
           const response = await axiosInstance.post('/links/crawl/', data)
           console.log(response.data)
           return response.data
       }catch(e) {
           return rejectWithValue(e)
       }
})


const initialState = {
    links: [],
    link: null,
    update: false,
    isSubmitting: false,
    isDeleting: false,
    tags: [],
    socketData: [],
    scrollIndex: 0
};

const slice = createSlice({
        name: "link",
        initialState,
        reducers: {
            getLink(state, action) {
                state.update = true
                state.link = action.payload
            },
            resetLink(state, action) {
                state.update = false
                state.link = null
            },
            setSocketData(state, action) {
                state.socketData.push(format(new Date(), 'dd MMM yyyy HH:mm'))
                state.socketData.push(action.payload)
            },
            setScrollIndex(state, action) {
                state.scrollIndex = action.payload
            }
        },
        extraReducers: {
            [addLink.pending]:
                (state) => {
                    state.isSubmitting = true;
                },
            [addLink.fulfilled]:
                (state, action) => {
                    const {data} = action.payload
                    state.links.unshift(data);
                    state.isSubmitting = false;
                },
            [addLink.rejected]:
                (state) => {
                    state.isSubmitting = false;
                },
            [getLinks.fulfilled]:
                (state, action) => {
                    const {data} = action.payload
                    state.links = data.reverse();
                },
            [deleteLinks.pending]:
                (state) => {
                    state.isDeleting = true;
                },
            [deleteLinks.fulfilled]:
                (state, action) => {
                    state.isDeleting = false;
                },
            [deleteLinks.rejected]:
                (state) => {
                    state.isDeleting = false;
                },
            [getTags.fulfilled]:
                (state, action) => {
                    const {data} = action.payload
                    state.tags = data;
                    },
            [startCrawl.pending]:
                (state) => {
                state.isSubmitting = true;
                },
            [startCrawl.fulfilled]:
                (state, action) => {
                const {data} = action.payload
                state.isSubmitting = false;
                },
            [startCrawl.rejected]:
                (state) => {
                state.isSubmitting = false;
                },

        }
        ,
    })
;

export const {getLink, resetLink, setSocketData, setScrollIndex} = slice.actions;

export default slice.reducer;
