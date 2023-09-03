import * as React from 'react';
import { PlayArrowIcon, DeleteIcon, } from '@config/icons';
import './style.css'

function ListMedia({ index, current, item, socket, handleItemClick, handleRemoveAudio, id }) {


    return (
        <div key={index} className='list-media'>
            {current && current._id && item._id === current._id ?
                <div className='item-media'>
                    <div onClick={() => handleItemClick(item)}> {item.name} </div>
                    <PlayArrowIcon />
                </div>
                :
                <div className='item-media'>
                    <div onClick={() => handleItemClick(item)}> {item.name} </div>
                    {socket ? <DeleteIcon onClick={() => handleRemoveAudio(id, item._id)} /> : ""}

                </div>
            }
        </div>
    )
}

export default ListMedia;