import {Routes, Route} from 'react-router-dom';
import Recipes from './pages/Recipes';
import NotFound from './pages/NotFound';
import CreateForm from './pages/CreateForm';
import HomePage from './pages/HomePage'
import UpdateForm from './pages/UpdateForm'
import FastFood from './pages/FastFood'
import './styles/App.css'


function App() {

  return (
    <main>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/recipes' element={<Recipes />} />
        <Route path='/addRecipe' element={<CreateForm />} />
        <Route path='/updateRecipe/:id' element={<UpdateForm />}/>
        <Route path='/eatOut' element={<FastFood />}/>
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </main>
  )
}

export default App
