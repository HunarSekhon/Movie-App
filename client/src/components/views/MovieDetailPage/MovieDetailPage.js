import React, {useEffect, useState} from 'react'
//import {Typography} from 'antd';
//const {Title} = Typography;
import{API_URL , API_KEY, IMAGE_URL} from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage';
import { Descriptions, Button, Row } from 'antd';
import GridCard from '../LandingPage/Sections/GridCard';
import Favorite from  './Sections/Favorite';
import Comments from './Sections/Comments'
import LikeDislikes from './Sections/LikeDislikes';
import axios from 'axios';


function MovieDetailPage(props) {

    const movieId = props.match.params.movieId

    const [Movie, setMovie] = useState([])
    const [Crews, setCrews] = useState([])
    const [CommentLists, setCommentLists] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)
    const movieVariable = {
        movieId: movieId
    }


    useEffect(() => {

        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
            .then(response => response.json())
            .then(response => {
                setMovie(response)

                fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
                    .then(response => response.json())
                    .then(response =>{
                        setCrews(response.cast)
                    })
            })

            axios.post('/api/comment/getComments', movieVariable)
            .then(response => {
                console.log(response)
                if (response.data.success) {
                    console.log('response.data.comments', response.data.comments)
                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get comments Info')
                }
            })

    }, [])

    const handleClick = ( ) => {
        setActorToggle(!ActorToggle)
    }

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }
    return(
        <div>
        {Movie &&
            <MainImage image={`${IMAGE_URL}w1280${Movie.backdrop_path && Movie.backdrop_path }`} 
                title={Movie.original_title} text={Movie.overview}/>
        }

            <div style={{width: '85%', margin: '1rem auto'}}>
                <div style ={{display: 'flex', justifyContent: 'flex--end'}}>

                    <Favorite userFrom={localStorage.getItem('userId')} movieId={movieId} movieInfo={Movie}/>


                </div>
                <Descriptions title="Movie Info" bordered>
                    <Descriptions.Item label="Title">{Movie.original_title}</Descriptions.Item>
                    <Descriptions.Item label="ReleaseDate">{Movie.release_date}</Descriptions.Item>
                    <Descriptions.Item label="revenue">{Movie.revenue}</Descriptions.Item>
                    <Descriptions.Item label="runtime">{Movie.runtime}</Descriptions.Item>
                    <Descriptions.Item label="Vote" span={2}>{Movie.vote_average}</Descriptions.Item>
                    <Descriptions.Item label="VoteCount">{Movie.vote_count}</Descriptions.Item>
                    <Descriptions.Item label="status">{Movie.status}</Descriptions.Item>
                    <Descriptions.Item label="popularity">{Movie.popularity}</Descriptions.Item>
                </Descriptions>

                <div style ={{display: 'flex', justifyContent: 'center'}}>
                    <Button onClick={handleClick}>View Cast</Button>
                </div>

                {ActorToggle && 
                    <Row gutter={[16,16]}>
                    {Crews && Crews.map((crew, index) => (
                    <React.Fragment key={index}>
                    {crew.profile_path && 
                        <GridCard 
                            actor image={`${IMAGE_URL}w500${crew.profile_path}`}
                        />

                    }

                    </React.Fragment>


                ))}
                
                </Row>
                
                }
                <br />


                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LikeDislikes video videoId={movieId} userId={localStorage.getItem('userId')} />
                </div>

                {/* Comments */}
                <Comments movieTitle={Movie.original_title} CommentLists={CommentLists} postId={movieId} refreshFunction={updateComment} />

                
            </div>
        </div>

    )
}
export default MovieDetailPage;