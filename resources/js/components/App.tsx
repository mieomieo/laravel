import TimelineList from "./components/TimelineList/TimelineList";

import React, { useState, useEffect } from "react";
import PostForm from "./components/PostForm";
import Posts from "./components/posts/Posts";
import store from "./store";
import { Provider } from "react-redux";
import { getPosts } from "./action/post";

import "./App.css";
function App() {
    useEffect(() => {
        store.dispatch(getPosts());
        //  console.log('render App');
    }, []);
    return (
        <>
            <Provider store={store}>
                <TimelineList></TimelineList>
     
            </Provider>
        </>
    );
}

export default App;
