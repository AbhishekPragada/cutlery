import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete } from '@mui/material'
import axios from 'axios';

export const Navbar = () => {
    const [input, setInput] = useState('');
    const [list, setList] = useState([]);
    const fetchData = async ()=>{
        try{
            const response = await axios.get('https://dummyjson.com/products')
            return response.data.products
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData().then(res => setList(res));
    }, [])
    const handleInput = e => {
        setInput(e.target.value.toLowerCase().trim())
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
                    options={list.map(item => item.title)}
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