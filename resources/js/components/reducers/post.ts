import {
    GET_POSTS,
    POST_ERROR,
    ADD_POST,
    DELETE_POST,
    UPDATE_POST,
} from "../action/type";

const initialState = {
    posts: [],
    // loading:true,
    // error:{}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                // loading:false
            };
        case ADD_POST:
            // console.log("payload create:",payload);

            return {
                ...state,
                posts: [...state.posts, payload],
                // loading:false
            };
        case DELETE_POST:
            // console.log("payload delete:",payload);
            
            return {
                ...state,
                posts: state.posts.filter((post) => post.id !== payload),
                // loading:false
            };
        case UPDATE_POST:
            console.log("reducer UPDATE");
            console.log("redux state:",payload);
            
            const index = state.posts.findIndex(
                (post) => post.id === payload.id
            );
            const newArr = [...state.posts];
            newArr[index] = payload;
            return {
                ...state,
                posts: newArr
            };
        default:
            return state;
    }
}
