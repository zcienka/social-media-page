import React from 'react'
import Loading from './pages/HomePage/Loading'
import Posts from './pages/HomePage/Posts'
import Post from './pages/HomePage/Post'
import Navbar from './components/Navbar'
import SearchPost from './pages/HomePage/SearchPost'

function App() {
    return (<>
            <Navbar/>
            <SearchPost/>
            <Posts/>
            {/*<Post/>*/}
        </>
    );
}

export default App
