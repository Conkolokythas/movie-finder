import { useState } from 'react'
import Card from './components/Card'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';

const api_url = 'https://m-finder-s.netlify.app'

function App() {

   const [movies, setMovies] = useState([]);
   const [searchTerm, setSearchTerm] = useState([]);
   

    const searchMovies = async (title) => {
        const response = axios.get(api_url + '?s=' + title);
        console.log(response);
        setMovies(response.data.Search);
        console.log(response.data.Search);
   }


  return (
   <div className="App">

   <Row>
    <Col>
    <div className="header">
      <div className="header-body">
       <div className="search-field">
        <input
          type="text"
          placeholder="Search Movies"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value) }}/>
        </div>
        <div className="submit">
          <button type='submit' onClick={() => searchMovies(searchTerm)}>Search</button>
        </div>
       </div>
      </div>
    </Col>
   </Row>

          {
              movies?.length > 0

                  ? (<div className="results">
                      {movies.map((movie) => (
                          <Card movie={movie} />

                      ))}
                  </div>) : (
                      <div className="empty">
                          <span>No movies were found.</span>
                      </div>
                  )}

   
        
            </div>
    );
}//App



export default App;
