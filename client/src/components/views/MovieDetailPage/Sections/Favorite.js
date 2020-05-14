import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { set } from 'mongoose';

function Favorite(props) {
    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)
    const variable = {
        userFrom: props.userFrom,
        movieId: props.movieId,
        movieTitle: props.movieInfo.original_title,
        movieImage: props.movieInfo.backfrop_path,
        MovieRunTime: props.movieInfo.runtime

    }


    useEffect(() => {

        
        Axios.post('/api/favorite/favoriteNumber', variable)
            .then(response => {
                if(response.data.success) {
                    setFavoriteNumber(response.data.favoriteNumber)
                }else{
                    alert('Failed to get favorite number')
                }
            })

            Axios.post('/api/favorite/favorited', variable)
            .then(response => {
                if(response.data.success) {
                    setFavorited(response.data.favorited)
                }else{
                    alert('Failed to get favorite info')
                }
            })


    }, [])

    const onClickFavorite = () => {
        if(Favorited){
            Axios.post('/api/favorite/removeFromFavorite', variable)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber - 1)
                    setFavorited(!Favorited)
                    

                }else{
                    alert('Failed to remove from Favorite')
                }
            })

        }else{
            Axios.post('/api/favorite/addToFavorite', variable)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber + 1)
                    setFavorited(!Favorited)

                }else{
                    alert('Failed to add to Favorite')
                }
            })

        }
    }

        return(

            <div>
                <button onClick={onClickFavorite}>{Favorited ? "remove from Watchlist" : "Add to Watchlist"}</button>

            </div>
        )


}
export default Favorite;