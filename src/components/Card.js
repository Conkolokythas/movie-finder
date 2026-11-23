import { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import imdbLogo from './imdb.svg';
import noImage from './no-img.png';
import axios from 'axios';


const Card = ({ movie }) => {

    const [show, setShow] = useState(false);
    const [movieInfo, setMovieInfo] = useState([]);

    const api_url = 'https://m-finder-s.netlify.app';

    let bgColor = '';

    const takeMovieInfo = async (title) => {
        const response = await axios.get(api_url + '?t=' + title);
        setMovieInfo(response.data);
   }

   switch (movie.Type) {
     case 'movie':
        bgColor = '#d8af18'
        break;
     case 'series':
        bgColor = '#1852d8'
        break;
    case 'game':
        bgColor = '#8a2be2'
   }

    return (
        <>
            <div className="res-tab" onClick={() => { setShow(true); takeMovieInfo(movie.Title) }}>
                <div className="my-card">
                    <span class="m-type" style={'background-color:' + bgColor}>{movie.Type}</span>
                    {
                        movie.Poster === "N/A"
                        ? (<img src={noImage} alt="no Poster"/>) 
                        : (<img src={movie.Poster} alt="movie poster"/>)
                    }
                    
              
              <p><span>{movie.Title}</span></p>
              <p><span>{movie.Year}</span></p>
            </div>
            </div>

            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w">
                
                <Modal.Body className="p-0">
                    <div className="modal-content flex">
                        <div className="movie-img">
                            <img src={movieInfo.Poster} alt="movie poster"/>
                        </div>
                        <div className="movie-info">
                            <div className="movie-title"><span>{movieInfo.Title}</span></div>
                            <div><span>Genre:</span> {movieInfo.Genre}</div>
                            <div><span>Year:</span> {movieInfo.Year}</div>
                            <div><span>Director:</span> {movieInfo.Director}</div>
                            <div><span>Actors:</span> {movieInfo.Actors}</div>
                            <div><span>BoxOffice:</span> {movieInfo.BoxOffice}</div>
                            <div><span>Plot:</span> {movieInfo.Plot}</div>
                            <div><span>Runtime:</span> {movieInfo.Runtime}</div>
                            <div className="imdb-btn"><a href={'//www.imdb.com/title/' + movieInfo.imdbID} target="_blank" rel="noreferrer"><img src={imdbLogo} alt="imdb Logo"/></a></div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
        
  )
}

export default Card
