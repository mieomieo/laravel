import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
interface Post {
    id: number;
    title: string;
    content: string;
}
interface TimelineState {
    posts: Post[];
    //   loading:boolean
}
const initialState: TimelineState = {
    posts: [],
    //   loading:true,
};
const timelineSlice = createSlice({
    name: "timelineSlice",
    initialState: {
        posts: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                const updatedPost = action.payload;
                console.log("update payload:", updatedPost);
                const index = state.posts.findIndex(
                    (post) => post.id === updatedPost.id
                );
                if (index !== -1) {
                    state.posts[index] = updatedPost;
                }
            })
            .addCase(deletePost.fulfilled,(state,action)=>{
              state.posts = state.posts.filter(post => post.id !== action.payload);
            });
    },
});
export const getPosts = createAsyncThunk("timeline/getPosts", async () => {
    const response = await axios.get("/api/posts");
    // console.log("res:", response);

    return response.data as Post[];
});
export const addPost = createAsyncThunk(
    "timeline/addPost",
    async (formData: any) => {
        console.log("addPost");

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await axios.post("/api/post", formData, config);
        return response.data as Post;
    }
);
export const updatePost = createAsyncThunk(
    "timeline/updatePost",
    async ({ postId, formData }: { postId: number; formData: any }) => {
        // console.log("update response:");
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await axios.put(
            `/api/post/${postId}`,
            formData,
            config
        );

        return response.data as Post;
    }
);
export const deletePost = createAsyncThunk(
    "timeline/deletePost",
    async (postId: number) => {
        await axios.delete(`/api/post/${postId}`);
        return postId;
    }
);

export default timelineSlice.reducer;
