import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import SinglePost from './Components/SinglePost';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/:id' element={<SinglePost />}/>
      </Routes>
    </Router>
  );
}

export default App;
