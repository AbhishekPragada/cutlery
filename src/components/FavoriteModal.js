import React from 'react';
import { FavoriteCard } from './FavoriteCard';

export const FavoriteModal = () => {
    // localStorage.setItem('items', JSON.stringify(items));
    // localStorage.getItem('items');
    return (
        <div className='favoriteModal'>
            <h2>Favorites</h2>
            <div className='favorite-list'>
                <FavoriteCard />
            </div>
        </div>
    )
}