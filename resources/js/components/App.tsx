import TimelineList from "./components/TimelineList/TimelineList";

import React, { useEffect } from "react";

import store from "./store";
import { Provider } from "react-redux";
import { getPosts } from "./action/post";

import "./App.css";
function App() {
    useEffect(() => {
        store.dispatch(getPosts());
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
