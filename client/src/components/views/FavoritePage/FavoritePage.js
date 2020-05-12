import React, {useEffect, useState} from 'react'
import './favorite.css'
import Axios from 'axios';
import {Popover} from 'antd';
import{API_URL , API_KEY, IMAGE_URL} from '../../Config'



function FavoritePage(props) {

    const variables = {userFrom: localStorage.getItem('userId')}
    const [FavoritedMovies, setFavoriteMovies] = useState([])

    useEffect(() => {
        
        fetchFavoriteMovies();
            
    }, [])

    const fetchFavoriteMovies = () =>{
        Axios.post('/api/favorite/getFavoriteMovie', variables)
        .then(response => {
            if(response.data.success){
                console.log(response.data.favorites)
                setFavoriteMovies(response.data.favorites)
            }else{
                alert('Failed to get favorite movie')
            }
        })
    }

    const onClickRemove = (movieId) => {
        console.log("hello")

        const variable = {
            movieId: movieId,
            userFrom: localStorage.getItem('userId')
        }
        Axios.post('/api/favorite/removeFromFavorite', variable)
            .then(response => {
                if(response.data.success){
                    fetchFavoriteMovies();
                }else{
                    alert('Failed to remove from Favorite')
                }
            })

    }

        const renderTableBody = FavoritedMovies.map((movie, index) => {
            const content =(
                <div>
                    {movie.movieImage ? 
                    <imng src={`${IMAGE_URL}w500${movie.movieImage}`}/> : "no image"}
                </div>

        )
        return( 
            
            <tr>
            <Popover content={content} title={movie.movieTitle}>
                <td>{movie.movieTitle}</td>            
            </Popover>
                <td>{movie.movieRunTime}</td>
                <td><button onClick={()=>onClickRemove(movie.movieId)}> Remove </button></td>
            
            </tr>
        )

    }) 

    return(
        

        <div style={{width: '85%', margin: '3rem auto' }}>
            <h1>Favorite Movies By Me</h1>
            <hr/>

            <table>
                <thead>
                    <tr>

                        <th>Movie Title</th>

                        <th>Movie RunTime</th>
                        <th>Remove from favorites</th>

                    </tr>
                </thead>

                <tbody>
                    {renderTableBody}
                </tbody>
            </table>

        
        
        </div>
    )


}
export default FavoritePage;