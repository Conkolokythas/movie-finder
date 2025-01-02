import { useState } from 'react'
import Card from './components/Card'

import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';

const api_url = 'http://www.omdbapi.com?apikey=9dd420dc'

function App() {

   const [movies, setMovies] = useState([]);
   const [searchTerm, setSearchTerm] = useState([]);
   


   const searchMovies = async (title) => {
       const response = await fetch(`${api_url}&s=${title}`);
       const data = await response.json();
       setMovies(data.Search);
       console.log(data.Search);

   }



  /*  useEffect(() => {
            searchMovies();
        }, []);*/


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
                          <span>No movies are found.</span>
                      </div>
                  )}

   
        
            </div>
    );
}//App



export default App;
