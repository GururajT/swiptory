import { useState } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Homepages from './Pages/Homepage/homepage';
import Homes from './Pages/Home/Home';
import Bookmarks from './Pages/Bookmarks/Bookmark';
import StoryFeature from './story/story';
import StoryPopup from './story/story';


function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepages/>}></Route>
          <Route path="/Home" element={<Homes/>}></Route>
          <Route path="/bookmark" element={<Bookmarks/>}></Route>
          <Route path="/story" element={<StoryPopup/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
