import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete, Box } from '@mui/material'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_KEY } from '../API';

export const Navbar = () => {
    const [input, setInput] = useState('');
    const [list, setList] = useState([]);
    const navigate = useNavigate();
    const fetchData = async (searchValue)=>{
        try{
            const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${input}`)
            return response.data.results || [];
        } catch (error) {
            return [];
        }
    }

    useEffect(() => {
        if(input) {
            const delayDebounce = setTimeout(() => {
                fetchData(input).then(res => setList(res));
            }, 500)
            return () => clearTimeout(delayDebounce)
        }
    }, [input])
    const handleInput = e => {
        setInput(e.target.value.toLowerCase().trim())
    }
    const onRecipeSelect = (event, value) => {
        const selectedRecipe = list.find(recipe => recipe.title === value);
        if(selectedRecipe) {
            navigate(`/recipe/${selectedRecipe.id}`)
        }
    }
    return (
        <div className='navbar'>
            <div className='navbar-cnt'>
                <div className='navbar-icon'>
                    Cutlery
                </div>
                <div className='navbar-search'>
                    <Autocomplete
                    disablePortal
                    options={list && list.map(item => item.title)}
                    onChange={onRecipeSelect}
                    id='navbar-autocomplete'
                    renderInput={(params) => <TextField {...params}
                        label="Search recipe"
                        onSelect={handleInput}
                        sx={{ width: 250}}/>}
                    />
                </div>
                <div className='navbar-quick-nav'></div> 
            </div>
        </div>
    )
}