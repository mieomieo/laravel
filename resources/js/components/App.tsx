import TimelineList from "./components/TimelineList/TimelineList";

import React, {  useEffect } from "react";

import store from "./store";
import { Provider } from "react-redux";
import { getPosts } from "./action/post";
import { useDispatch } from "react-redux";

import "./App.css";
function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const res= store.dispatch(getPosts());
        console.log('render App:',res);
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
