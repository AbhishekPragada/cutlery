import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_KEY } from '../API';
import axios from 'axios';

export const RecipePage = () => {
    const { id } = useParams();
    const [recipeDetails, setRecipeDetails] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);

    const loadImage = (imageUrl) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = imageUrl;
          img.onload = resolve;
        });
    };

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                setIsLoading(true);

                const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
                await Promise.all([response.data, loadImage(response.data.image)]);

                setRecipeDetails(response.data);
            } catch (error) {
                //TODO: throw an error page
            } finally {
                setIsLoading(false);
            }
        };
        fetchRecipeDetails();
    }, [id]);

    if(isLoading) {
        return <div>Loading the details....</div>
    }

    return(
        <div className='recipe-page'>
            <div className='recipe-page-head-section'>
                <div className='recipe-page-h-lhs'>
                    <div className='recipe-image'><img src={recipeDetails?.image}/></div>
                </div>
                <div className='recipe-page-h-rhs'>
                    <h1>{recipeDetails?.title}</h1>               
                    <div className='recipe-ingredients'>
                        {
                            recipeDetails?.extendedIngredients?.map(
                                item => {
                                    return (
                                        <div className='recipe-ingredient'>
                                            <div className='recipe-ingredient-image' 
                                                style={{ backgroundImage: `url(https://spoonacular.com/cdn/ingredients_100x100/${item.image})`}}/>
                                            <div className='recipe-ingredient-name'>{item.nameClean}</div>
                                            <div className='recipe-ingredient-quantity'></div>
                                        </div>
                                    )
                                }
                            )
                        } 
                    </div>
                </div>
            </div>
        </div>
    )
}