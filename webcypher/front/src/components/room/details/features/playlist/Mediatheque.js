import React, { useState, useEffect, useCallback } from "react";
import MediathequeServices from "@services/mediatheque";
import AudioServices from "@services/audio";
import './style.css'
import { toast } from "react-toastify";


function Mediatheque({ id, updateParty, queue }) {

    const [mediaItems, setMediaItems] = useState([]);
    // NOTE : function to define the media in the media library that are not in the queue
    const retrieveRooms = useCallback(() => {
        MediathequeServices.get_all().then((response) => {
            var media = response.data.data.filter(ar => !queue.find(rm => (rm._id === ar.id)))
            setMediaItems(media);
        });
    }, [queue]);

    useEffect(() => {
        retrieveRooms();
    }, [retrieveRooms]);

    // NOTE : function to call the audio service to add the media to the queue
    const handleAddItem = (items) => {
        AudioServices.addMediaToRoom(id, items).then(async (response) => {
            if (response.status === 201) {
                toast.success(`Votre audio a été ajouter avec succès à la queue`, {
                    position: "bottom-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                queue = response.data.room.items
                updateParty(response.data.room)
                retrieveRooms();
            }
        });
    };

    return (
        <div>
            <div className="container-form">
                <h3 >Médiathèque : </h3>
                <p> (sélectionnez vos médias)</p>
            </div>
            {/* NOTE if there is media to add we display the list else we display 'no audio' message */}
            {mediaItems.length > 0 ? (
                <ul className='list-media'>
                    {mediaItems.map((mediaItem) => (
                        <li onClick={() => handleAddItem(mediaItem._id)} key={mediaItem._id}>
                            {mediaItem.name}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Il semblerait que vous n'ayez pas de médias a ajouter depuis votre médiathèque</p>
            )}
        </div>
    )
}
export default Mediatheque;