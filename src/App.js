import { useState } from 'react';
import Card from './components/Card';
import Pagination from './components/Pagination';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';

const api_url = 'https://m-finder-s.netlify.app';
const pageRoute = "/page" ;
let response = null;

function App() {

   const [movies, setMovies] = useState([]);
   const [searchTerm, setSearchTerm] = useState([]);
   const [totalResults, setTotalResults] = useState(0);
   

    const searchMovies = async (search) => {
        response = await axios.get(api_url + '?s=' + search);
        setMovies(response.data.Search);
        setTotalResults(response.data.totalResults);
        console.log(response);
   }

   const pagination = async (search, page) => {
        response = await axios.get(api_url + pageRoute + '?s=' + search + '&page=' + page);
        setMovies(response.data.Search);
        setTotalResults(response.data.totalResults);
        console.log(response);
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
              totalResults?.length > 0

                  ? (<div className="results">
                      {movies.map((movie) => ( <Card movie={movie} />))}
                      <button type='submit' onClick={() => pagination(searchTerm, 2)}>Next page</button>
                      <Pagination results={totalResults} term={searchTerm} api={api_url} route={pageRoute}/>
                  </div>) : (
                      <div className="empty">
                          <span>No movies were found.</span>
                      </div>
                  )}

                  
        
    </div>
    );
}//App



export default App;
