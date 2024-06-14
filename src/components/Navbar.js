import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete, Box, Modal } from '@mui/material'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import { API_KEY } from '../API';
import { Login } from '../login/Login';
// import { FavoriteModal } from './FavoriteModal';
// import Fade from "@mui/material/Fade";

export const Navbar = () => {
    const [input, setInput] = useState('');
    const [list, setList] = useState([]);
    const [isOpen, setOpen] = useState(false);
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
                fetchData(input).then(res => {
                    setList(res)
                    setOpen(res.length)
                });
            }, 500)
            return () => clearTimeout(delayDebounce)
        } else {
            setList([]);
            setOpen(false);
        }
    }, [input])
    const handleInput = e => {
        setInput(e.target.value.toLowerCase().trim())
    }
    const onRecipeSelect = (event, value) => {
        setOpen(false);
        const selectedRecipe = list.find(recipe => recipe.title === value);
        if(selectedRecipe) {
            navigate(`/recipe/${selectedRecipe.id}`)
        }
    }

    const [loginOpen, setloginOpen] = useState(false);
    const handleLoginOpen = () => setloginOpen(true);
    const handleLoginClose = () => setloginOpen(false);
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
                    open={isOpen}
                    onChange={onRecipeSelect}
                    id='navbar-autocomplete'
                    renderInput={(params) => <TextField {...params}
                        label="Search recipe"
                        onSelect={handleInput}
                        sx={{ width: 250}}/>}
                    />
                </div>
                {/* <div className='navbar-favorites' onClick={handleLoginOpen}>
                    <FavoriteIcon/>
                </div> */}
                <button className='login-btn' onClick={handleLoginOpen}>Login</button>
                <Modal
                open={loginOpen}
                onClose={handleLoginClose}>
                    {/* <Fade in={loginOpen}> */}
                    <Login />
                    {/* </Fade> */}
                </Modal>
            </div>
        </div>
    )
}