import axios from "axios";
import {
    GET_POSTS,
    POST_ERROR,
    ADD_POST,
    DELETE_POST,
    UPDATE_POST,
} from "./type";

export const getPosts = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/posts");
        dispatch({
            type: GET_POSTS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

export const addPost = (formData) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const res = await axios.post("/api/post", formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
// update post

export const updatePost = (postId, formData) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const res = await axios.put(`/api/post/${postId}`, formData, config);
        console.log("response update:",res.data);
        
        dispatch({
            type: UPDATE_POST,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
//Delete Post

export const deletePost = (postId) => async (dispatch) => {
    try {
        await axios.delete(`/api/post/${postId}`);
        dispatch({
            type: DELETE_POST,
            payload: postId,
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
