import {Routes, Route} from 'react-router-dom';
import Recipes from './pages/Recipes';
import NotFound from './pages/NotFound';
import CreateForm from './pages/CreateForm';
import HomePage from './pages/HomePage'
import './App.css'


function App() {

  return (
    <main>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/recipe' element={<Recipes />} />
        <Route path='/addRecipe' element={<CreateForm />} />
        <Route path='/restaurant' />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </main>
  )
}

export default App
