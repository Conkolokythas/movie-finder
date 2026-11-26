import { useState } from 'react';
import Card from './components/Card';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';

const api_url = 'https://m-finder-s.netlify.app';
const pageRoute = "/page" ;
const typeRoute = "/type" ;
let response = null;

function App() {

   const [movies, setMovies] = useState([]);
   const [searchTerm, setSearchTerm] = useState([]);
   const [totalResults, setTotalResults] = useState(0);
   const [currentPage, setCurrentPage] = useState(0);
   const [reqSend, setReqSend] = useState(false);

   const searchMovies = async (search) => {
      response = await axios.get(api_url + '?s=' + search);
      setReqSend(true);
      return response;
   }

   const searchByType = async (term, type) => {
    response = await axios.get(api_url + typeRoute + '?s=' + term + '&type=' + type);
    setMovies(response.data.Search);
    setTotalResults(response.data.totalResults);
    setReqSend(true);
    setCurrentPage(1);
   }

    const pagination = async (page) => {
      response = await axios.get(api_url + pageRoute + '?s=' + searchTerm + '&page=' + page);
      setMovies(response.data.Search);
      setCurrentPage(page);
      setReqSend(true);
   }

   function handleSubmit(e) {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const query = formData.get('query');
      setSearchTerm(query);
      searchMovies(query).then(
        (response) => {
          setMovies(response.data.Search);
          setTotalResults(response.data.totalResults);
          console.log("total rsults" + totalResults);
          setCurrentPage(1);
          console.log(response)
        });
       
      console.log("handleSubmit:" + query);
  }

console.log(reqSend);
  return (
  <div className="App">

  <Row>
    <Col>
      <div className="header">
        <div className="header-body">
            <div className="search-field">
              <form onSubmit={handleSubmit}>
                <input type="text" name="query" autocomplete="off"/>
                <button type="submit">Search</button>
              </form>
            </div>
            <div className="submit">
              {/*<button type='submit' onClick={() => searchMovies(searchTerm)}>Search</button>*/}
          </div>
       </div>
      </div>
    </Col>
   </Row>


   <Row>
      <Col>
        {
           movies?.length > 0  ? (
            
            <div>
              <Navbar data-bs-theme="dark" className="bg-body-tertiary">
                <Container>
                  <Navbar.Brand>{totalResults} results for <b>{searchTerm}</b></Navbar.Brand>
                  <Navbar.Toggle />
                  <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                    <span onClick={searchByType(searchTerm, 'movie')}>Movies</span> <span className='dot' style={{ backgroundColor: "#d8af18" }}></span>
                  </Navbar.Text>
                  <Navbar.Text>
                    <span onClick={searchByType(searchTerm, 'series')}>Series</span> <span className='dot' style={{ backgroundColor: "#1852d8" }}></span>
                  </Navbar.Text>
                  <Navbar.Text>
                    <span onClick={searchByType(searchTerm, 'games')}>Games</span> <span className='dot' style={{ backgroundColor: "#8a2be2" }}></span>
                  </Navbar.Text>
                  </Navbar.Collapse>
                </Container>
              </Navbar>

              <div className="results res-col">
                {movies.map((movie) => ( <Card movie={movie} />))}
              </div>
              <div className='pag-tab'>  
                <div className='pagination'>                  
                <span>Total titles found{ totalResults }</span>
                <button onClick={() => pagination(1)}>{'<<'}</button>
                {
                  currentPage === 1 ?
                  (<button disabled>{'<'}</button>) 
                  : 
                  (<button onClick={() => pagination(currentPage - 1)}>{'<'}</button>)
                }
                <input type="number" placeholder="..." min="1" max={ Math.ceil(totalResults/10) } value={currentPage} onChange={(e) => { pagination(e.target.valueAsNumber) }}/>
                {
                  currentPage === Math.ceil(totalResults/10) ?
                  (<button disabled>{'>'}</button>) 
                  : 
                  (<button onClick={() => pagination(currentPage + 1)}>{'>'}</button>)
                }
                <button onClick={() => pagination(Math.ceil(totalResults/10))}>{'>>'}</button>
                <span>{ Math.ceil(totalResults/10) }</span>
                </div> 
              </div>
            </div>
            
          ) : (  
            <Navbar data-bs-theme="dark" className="bg-body-tertiary">
              <Container>
                <Navbar.Brand>No results for: <b>{searchTerm}</b></Navbar.Brand> : 
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                  </Navbar.Text>
                </Navbar.Collapse>
              </Container>
            </Navbar>
             )
          
        }
        
      </Col>
    </Row>
        
  </div> );
}//App

export default App;