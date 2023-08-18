import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Post {
    id: number;
    title: string;
    content: string;
}

export const getPosts = createAsyncThunk("timeline/getPosts", async () => {
    const response = await axios.get("/api/posts");
    // console.log("res:", response);

    return response.data as Post[];
});

export const addPost = createAsyncThunk(
    "timeline/addPost",
    async (formData: any) => {
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
