import React from 'react';
import {useEffect, useState} from 'react';
import Loading from "./pages/HomePage/Loading"
import Posts from './pages/HomePage/Posts'
import Post from './pages/HomePage/Post'
import Navbar from './components/Navbar'
import AddPost from './pages/HomePage/SearchPost'

function App() {
    return (<>
            <Navbar/>
            <AddPost/>
            {/*<Posts/>*/}
            <Post/>
        </>
    );
}

export default App
