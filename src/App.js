import { useState } from 'react';
import Card from './components/Card';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';

const api_url = 'https://m-finder-s.netlify.app';
const pageRoute = "/page" ;
let response = null;
let items = [];

function App() {

   const [movies, setMovies] = useState([]);
   const [searchTerm, setSearchTerm] = useState([]);
   const [totalResults, setTotalResults] = useState();
   const [currentPage, setCurrentPage] = useState();
   

    const searchMovies = async (search) => {
        response = await axios.get(api_url + '?s=' + search);
        setMovies(response.data.Search);
        setTotalResults(response.data.totalResults);
        console.log(totalResults);
        let pages = totalResults/10;
        for (let i = 0; i <= pages; i++) {
            items.push(i);
        }
        setCurrentPage(items[0]);
   }

   const pagination = async (page) => {
        response = await axios.get(api_url + pageRoute + '?s=' + searchTerm + '&page=' + page);
        setMovies(response.data.Search);
        setTotalResults(response.data.totalResults);
        console.log(totalResults);
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
                      {movies.map((movie) => ( <Card movie={movie} />))}
                  </div>) : (
                      <div className="empty">
                          <span>No movies were found.</span>
                      </div>
                  )}

                  {
                    totalResults?.length > 10 
                    ?( 
                    
                    <div>                     
                    <button onClick={() => pagination(currentPage + 1)}>Next page</button>
                    <span>{items[0]}</span>
                    <input type="number" placeholder="..." onChange={(e) => { pagination(e.target.value) }}/>
                    <button onClick={() => pagination(currentPage - 1)}>Previous page</button>
                    <span>{items.length + 1}</span>
                    </div>
                    ) : (<span>{items.length}</span>)
                  }
        
    </div>
    );
}//App



export default App;
