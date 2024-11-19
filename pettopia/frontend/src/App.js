import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import FreeBoard from './pages/FreeBoard';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/freeboard" element={<FreeBoard/>}/>
      </Routes>
    </div>
  );
}

export default App;
