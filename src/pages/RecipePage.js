import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_KEY } from '../API';
import axios from 'axios';
import DOMPurify from 'dompurify';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export const RecipePage = () => {
    const { id } = useParams();
    const [recipeDetails, setRecipeDetails] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);

    const loadImage = imageUrl => {
        return new Promise(resolve => {
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
        return <span class="loader"></span>
    }

    return(
        <div className='recipe-page'>
            <div className='recipe-page-head-section'>
                <div className='recipe-page-h-lhs'>
                    <div className='recipe-title'>
                    <span className='header-text-32'>
                        {recipeDetails?.title}
                    </span>
                    &nbsp;
                    {recipeDetails?.vegetarian ? 
                                    <img className='recipe-deatils-icon' src="https://img.icons8.com/?size=48&id=61083&format=png" />
                                    : <img className='recipe-deatils-icon' src="https://img.icons8.com/?size=96&id=61082&format=png" />
                    }
                    </div>
                    <div className='recipe-image'>
                        <img alt={recipeDetails?.title} src={recipeDetails?.image}/>
                    </div>
                    <div className='recipe-description'>
                        <span className='recipe-description-head header-text-24'>Description</span>
                        <span className='recipe-description-body' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(recipeDetails?.summary || '') }} />
                    </div>
                </div>
                <div className='recipe-page-h-rhs'>             
                    <div className='recipe-details-line'>
                        <div className='recipe-details-line-LHS'>
                            <div className='recipe-details-line-time'>
                                <AccessTimeIcon />
                                &nbsp;{`${recipeDetails?.readyInMinutes} min`}
                            </div>
                            <div className='recipe-details-line-serving'>
                                <img className='recipe-deatils-icon' src="https://img.icons8.com/?size=64&id=k3eu76xI1ql7&format=png"/> 
                                &nbsp;{`${recipeDetails?.servings} people`}
                            </div>
                        </div>
                        <div className='recipe-details-line-RHS'>
                            Gluten Free: {`${recipeDetails?.glutenFree}`} &nbsp;
                            Diary Free: {`${recipeDetails?.dairyFree}`} &nbsp;
                            Vegan: {`${recipeDetails?.vegan}`}
                        </div>
                    </div>            
                    <div className='recipe-ingredients'>
                        <span className='header-text-24'>Ingredients</span>
                        <div className='recipe-ingredients-list'>
                            {
                                recipeDetails?.extendedIngredients?.map(
                                    item => {
                                        return (
                                            <div className='recipe-ingredient'>
                                                <div className='recipe-ingredient-image-cnt'>
                                                    <div className='recipe-ingredient-image' 
                                                        style={{ backgroundImage: `url(https://spoonacular.com/cdn/ingredients_100x100/${item.image})`}}/>
                                                </div>
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
            <div className='recipe-process'></div>
        </div>
    )
}