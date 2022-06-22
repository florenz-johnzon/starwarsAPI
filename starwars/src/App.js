import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from './components/home/home';
import People from './components/people/people';
import Planets from './components/planets/planets';
import Saved from './components/saved/saved';
import Starships from './components/starships/starships';


function App() {
  return (
    <div className="App">
<Router>
      <div>
        <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
          <Route exact path="/home" element={<Home />} />
          <Route path="/people" element={<People />} />
          <Route path="/planets" element={<Planets />} />
          <Route path="/starships" element={<Starships/>}/>
          <Route path="/saved" element={<Saved/>}/>
        </Routes>
      </div>
    </Router>
</div>
  );
}

export default App;
