import React from "react";
import ReactDOM from "react-dom";
import { Router, Routes, Links } from './components/router.js'
import routeConfig from './router.js'
import "./index.css";

function App() {
    return (
      <div>
        <Router basename={routeConfig.basename}>
            <div>
                <Links config={routeConfig} />
                <hr />
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Routes config={routeConfig}/>
                </React.Suspense>
            </div>
        </Router>
      </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));
