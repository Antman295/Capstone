import {Routes, Route} from 'react-router-dom';
import Recipes from './pages/Recipes';
import NotFound from './pages/NotFound';
import './App.css'

function App() {

  return (
    <main>
      <Routes>
        <Route path='/recipe' element={<Recipes />} />
        <Route path='/fastFood' />
        <Route path='/restaurant' />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </main>
  )
}

export default App
