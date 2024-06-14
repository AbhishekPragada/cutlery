import React from 'react';

export const TagsBar = (props) => {
    const tagsList = ['snacks', 'lunch', 'breakfast']
    return (
        <div className='tagsbar-cnt'>
            {tagsList.map((tags, index) => {
                return (
                    <div className='tags'>{tags}</div>
                )
            })
            }
        </div>
    )
}