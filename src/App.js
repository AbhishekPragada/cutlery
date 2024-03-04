import './App.scss';
import axios from 'axios';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Card } from './components/Card';
import { Home } from './pages/Home';
import { RecipePage } from './pages/RecipePage';

function App() {
  const [data, setData] = React.useState();
  const fetchRecipe = async () => {
    try {
      const response = await axios.get('https://api.spoonacular.com/recipes/716429/information?apiKey=API_KEY&includeNutrition=true');
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch recipe", error);
    }
  };
  React.useEffect(() => {
    fetchRecipe();
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recipe/:id' element={<RecipePage />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
