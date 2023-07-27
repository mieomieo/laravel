import {GET_POSTS,POST_ERROR, ADD_POST, DELETE_POST} from '../action/type';

const initialState = {
    posts: [],
    loading:true,
    error:{}
}

export default function(state=initialState,action)
{
    const {type,payload} = action;

    switch(type)
    {
        case GET_POSTS:
        return{
            ...state,
            posts:payload,
            loading:false
        }
        case ADD_POST:
            return{
                ...state,
                posts: [payload,...state.posts],
                loading:false
            }
        case DELETE_POST:
            return{
                ...state,
                posts: state.posts.filter(post => post.id!== payload),
                loading:false
            }
        default:
            return state;
    }
}