import React from 'react'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
//import Button from 'react-bootstrap/Button';
import imdbLogo from './imdb.svg';



const Card = ({ movie }) => {

    const [show, setShow] = useState(false);
    const [movieInfo, setMovieInfo] = useState([]);

    const api_url = 'http://www.omdbapi.com?apikey=9dd420dc'


    const takeMovieInfo = async (title) => {
        console.log(title)
        const response = await fetch(`${api_url}&t=${title}`);
        //console.log(response)
        const data = await response.json();
        setMovieInfo(data);
        //console.log(data);
    }


    return (
        <>
            <div className="res-tab" onClick={() => { setShow(true); takeMovieInfo(movie.Title) }}>
                <div className="my-card">
                    <span class="m-type">{movie.Type}</span>
              <img src={movie.Poster} />
              
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
                            <img src={movieInfo.Poster} />
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
                            <div className="imdb-btn"><a href={'//www.imdb.com/title/' + movieInfo.imdbID} target="_blank"><img src={imdbLogo} /></a></div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
        
  )
}

export default Card
