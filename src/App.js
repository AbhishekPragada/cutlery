import logo from './logo.svg';
import './App.scss';
import axios from 'axios';
import React from 'react';
import { Navbar } from './components/Navbar';
import { Card } from './components/Card';

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
      <Navbar />
      
      <header className="App-header">
        {data && <Card data={data}/>}
      </header>
    </div>
  );
}

export default App;
