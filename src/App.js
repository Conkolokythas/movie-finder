import { useState} from 'react';
import Card from './components/Card';
import ResultsHeader from './components/ResultsHeader';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';

const api_url = 'https://m-finder-s.netlify.app';
const pageRoute = "/page" ;
let response = null;
let lastPge = (x) => {Math.ceil(x)} 

function App() {

   const [movies, setMovies] = useState([]);
   const [searchTerm, setSearchTerm] = useState([]);
   const [totalResults, setTotalResults] = useState(0);
   const [currentPage, setCurrentPage] = useState();

   const searchMovies = async (search) => {
        response = await axios.get(api_url + '?s=' + search);
        setMovies(response.data.Search);
        setTotalResults(response.data.totalResults);
        lastPge(totalResults);
        console.log("total rsults" + totalResults);
        setCurrentPage(1);
   }

    const pagination = async (page) => {
        if (page > totalResults || page > 0) {
          setCurrentPage(currentPage);
        } else {
          response = await axios.get(api_url + pageRoute + '?s=' + searchTerm + '&page=' + page);
          setMovies(response.data.Search);
          setCurrentPage(page);
          console.log("Pagination Current page:" + page);
        }
        
   }

   function handleSubmit(e) {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const query = formData.get('query');
      setSearchTerm(query);
      searchMovies(query);
      console.log("handleSubmit:" + query);
  }


  return (
  <div className="App">

  <Row>
  <Col>
  <div className="header">
    <div className="header-body">
      <form onSubmit={handleSubmit}>
        <div className="search-field">
          <input type="text" name="query" autocomplete="off"/>
        </div>
        <div className="submit">
          {/*<button type='submit' onClick={() => searchMovies(searchTerm)}>Search</button>*/}
            <button type="submit">Search</button>
        </div>
        </form>
       </div>
      </div>
    </Col>
   </Row>


   <Row>
      <Col>

        {
          movies?.length ? (
            <div>
              <ResultsHeader resultsNum={totalResults} term={searchTerm} />
              <div className="results res-col">
                {movies.map((movie) => ( <Card movie={movie} />))}
              </div>
            </div>
            
          ) : (<ResultsHeader resultsNum={totalResults} term={searchTerm} />)
        }
        
      </Col>
    </Row>

   <Row>
    <Col>
        {
            totalResults > 10 
            ?( 
              <div>                     
                <span>Total titles found{ totalResults }</span>
                <button onClick={() => pagination(1)}>{'<<'}</button>
                <button onClick={() => pagination(currentPage - 1)}>{'<'}</button>
                <input type="number" placeholder="..." min="1" max={lastPge} value={currentPage} onChange={(e) => { pagination(e.target.valueAsNumber) }}/>
                <button onClick={() => pagination(currentPage + 1)}>{'>'}</button>
                <button onClick={() => pagination(lastPge)}>{'>>'}</button>
                <span>{ lastPge }</span>
              </div>
              ) : (' ')
          }
    </Col>
  </Row>


        
  </div> );
}//App

export default App;