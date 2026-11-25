import {setMovies, setTotalResults, setCurrentPage} from '../App'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const ResultsHeader = ({ resultsNum, term }) => {

    const searchByType = async (term, type) => {
    response = await axios.get(api_url + '?s=' + term + '&type=' + type);
    setMovies(response.data.Search);
    setTotalResults(response.data.totalResults);
    setCurrentPage(1);
   }

    return (
        <>
        <Navbar data-bs-theme="dark" className="bg-body-tertiary">
            <Container>
                {
                resultsNum === 0 ?
                (<Navbar.Brand>No results found for: <b>{term}</b></Navbar.Brand>) : 
                (<Navbar.Brand>{resultsNum} results for <b>{term}</b></Navbar.Brand>)
                }
                
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <span onClick={searchByType(term, 'movie')}>Movies</span> <span className='dot' style={{ backgroundColor: "#d8af18" }}></span>
                </Navbar.Text>
                <Navbar.Text>
                    <span onClick={searchByType(term, 'series')}>Series</span> <span className='dot' style={{ backgroundColor: "#1852d8" }}></span>
                </Navbar.Text>
                <Navbar.Text>
                    <span onClick={searchByType(term, 'game')}>Games</span> <span className='dot' style={{ backgroundColor: "#8a2be2" }}></span>
                </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
        );
}
export default ResultsHeader