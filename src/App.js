import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes, Navigate, useParams} from "react-router-dom";
import ListMessage from "./components/ListMessage";
import NewMessage from "./components/NewMessage";
import ItemMessage from "./components/ItemMessage";


function App() {
  return (
      <BrowserRouter>
        <div id="container">

          <Routes>
            <Route path='/' element={<ListMessage />} />
            <Route path='/posts/new' element={<NewMessage />} />
            <Route path='/posts/:id' element={<ItemMessage />} />
          </Routes>

        </div>
      </BrowserRouter>
      );
}

export default App;
