// import {combineReducers} from 'redux';
// import post from './post'

// export default combineReducers({
//     post
// });

// import {createSlice,PayloadAction } from '@reduxjs/toolkit'

// const initialState = {
//     posts:[],
//     loading:true,
// };

// interface Post {
//     id: number;
//     title: string;
//     content: string;
//   }
  
//   interface TimelineState {
//     posts: Post[];
//     loading: boolean;
//   }

// export default createSlice({
//     name:'timelineSlice',
//     initialState,
//     reducers:{
//         getPosts:(state,action: PayloadAction<Post[]>) =>{
//             state.posts = action.payload;
//             state.loading = false;
//         },
//         addPost:(state,action: PayloadAction<Post>)=>{
//             state.posts.push(action.payload);
//         },
//         deletePost:(state,action)=>{

//         },
//         updatePost:(state,action)=>{

//         }
//     }

// })
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Post {
  id: number;
  title: string;
  content: string;
}

interface TimelineState {
  posts: Post[];
  loading:boolean
}

const initialState: TimelineState = {
  posts: [],
  loading:true,

};

const timelineSlice = createSlice({
  name: 'timelineSlice',
  initialState,
  reducers: {
    getPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
      state.loading = false;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const updatedPost = action.payload;
      const index = state.posts.findIndex(post => post.id === updatedPost.id);
      if (index !== -1) {
        state.posts[index] = updatedPost;
      }
    },
  },
});

export const { getPosts, addPost, deletePost, updatePost } = timelineSlice.actions;

export default timelineSlice.reducer;
