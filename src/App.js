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
let response = null;

function App() {

   const [movies, setMovies] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');
   const [totalResults, setTotalResults] = useState(0);
   const [currentPage, setCurrentPage] = useState(0);
   const [currentType, setCurrentType] = useState('');
   const [requestSend, setRequestSend] = useState(false);
   const [navHeader, setNavHeader] = useState('');
   

   const route = { 
    url: api_url, 
    query: '', 
    type:  '', 
    page: ''
  };

  function checkRequestEvent(reslResults){
    if(reslResults > 0){
        setNavHeader(reslResults + " results for " + route.query);
      } else {
        setNavHeader("No results for: " + route.query);
      }
  }

  const request = (x) => x.url + '?s=' + x.query + '&type=' + x.type + '&page=' + x.page;
  
   const searchMovies = async (term) => {
      route.query = term;
      route.page = 1;
      response = await axios.get(request(route));
      console.log(response);
      return response;
   }

   const searchByType = async (type) => {
    route.query = searchTerm;
    route.type = type;
    route.page = 1;
    response = await axios.get(request(route));
    setMovies(response.data.Search);
    setTotalResults(response.data.totalResults);
    setCurrentPage(route.page);
    setCurrentType(route.type);
    checkRequestEvent(response.data.totalResults);
    console.log("handleSubmit:" + request(currentPage));
   }

    const pagination = async (page) => {
      route.query = searchTerm;
      route.type = currentType;
      route.page = page;
      response = await axios.get(request(route)); 
      setMovies(response.data.Search);
      setCurrentPage(page);
   }

   function handleSubmit(e) {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const query = formData.get('query');
      searchMovies(query).then(
        (response) => {
          setSearchTerm(route.query);
          setCurrentType(route.type);
          setCurrentPage(route.page);
          setMovies(response.data.Search);
          setTotalResults(response.data.totalResults);
          setRequestSend(true);
          checkRequestEvent(response.data.totalResults);
         });
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
           requestSend  ? (
            
            <div>
              <Navbar data-bs-theme="dark" className="bg-body-tertiary">
                <Container>
                  <Navbar.Brand>{navHeader}</Navbar.Brand>
                  <Navbar.Toggle />
                  <Navbar.Text>
                    <span>{currentType}</span> 
                  </Navbar.Text>
                  <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                    <span onClick={() => searchByType('movie')}>Movies</span> <span className='dot' style={{ backgroundColor: "#d8af18" }}></span>
                  </Navbar.Text>
                  <Navbar.Text>
                    <span onClick={() => searchByType('series')}>Series</span> <span className='dot' style={{ backgroundColor: "#1852d8" }}></span>
                  </Navbar.Text>
                  <Navbar.Text>
                    <span onClick={() => searchByType('games')}>Games</span> <span className='dot' style={{ backgroundColor: "#8a2be2" }}></span>
                  </Navbar.Text>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
              {
                totalResults > 0 ?
                (
                  <div className='res-board'>
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
                ) 
                : 
                ('')
              }
              
              
            </div>
            
          ) 
          : 
          (  
          <p>Hello this is my app</p>
          )
        }
        
      </Col>
    </Row>
  </div> );
}//App

export default App;