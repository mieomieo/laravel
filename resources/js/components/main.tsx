import React from "react";
import ReactDOM from "react-dom/client";
import App from './App'

if (document.getElementById("app")) {
    const Index = ReactDOM.createRoot(document.getElementById("app"));
    console.log("app");
    Index.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
// if (document.getElementById('app')) {
//     ReactDOM.render(<Example/>,document.getElementById('app'));
// }
