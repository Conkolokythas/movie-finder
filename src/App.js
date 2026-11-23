import { useState} from 'react';
import Card from './components/Card';
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
   const [currentPage, setCurrentPage] = useState();


    const searchMovies = async (search) => {
        response = await axios.get(api_url + '?s=' + search);
        setMovies(response.data.Search);
        setTotalResults(response.data.totalResults);
        console.log(totalResults);
        setCurrentPage(1);
   }

    const pagination = async (page) => {
        response = await axios.get(api_url + pageRoute + '?s=' + searchTerm + '&page=' + page);
        setMovies(response.data.Search);
        setCurrentPage(page);
        console.log("Pagination Current page:" + page);
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
                    </div>
                    ) : (
                      <div className="empty">
                          <span>No movies were found.</span>
                      </div>)
                      
                      }

                  {
                    totalResults > 10 
                    ?( 
                    <div>                     
                    <span>Total titles found{ totalResults }</span>
                    <button onClick={() => pagination(currentPage - 1)}>Previous page</button>
                    <input type="number" placeholder="..." min="1" max={totalResults/10} value={currentPage} onChange={(e) => { pagination(e.target.valueAsNumber) }}/>
                    <button onClick={() => pagination(currentPage + 1)}>Next page</button>
                    <span>{ totalResults/10 }</span>
                    </div>
                    ) : (<span></span>)
                  }
        
    </div>
    );
}//App



export default App;
