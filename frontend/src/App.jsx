import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Blog from './pages/blog/blog';
import Home from './pages/home/home';

const App = () => {
 return (
  <div className='container'>
   <Routes>
    <Route path='/' Component={Home} />
    <Route path='/blog/:id' Component={Blog} />
   </Routes>
  </div>
 );
};

export default App;
