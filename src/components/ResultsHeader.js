import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const ResultsHeader = ({ resultsNum, term }) => {

    return (
        <>
        <Navbar data-bs-theme="dark" className="bg-body-tertiary">
            <Container>
                {
                resultsNum === 0 ?
                (<Navbar.Brand>No results found for <b>{term}</b></Navbar.Brand>) : 
                (<Navbar.Brand>{resultsNum} results for <b>{term}</b></Navbar.Brand>)
                }
                
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Movies <span></span>
                </Navbar.Text>
                <Navbar.Text>
                    Series <span></span>
                </Navbar.Text>
                <Navbar.Text>
                    Games <span></span>
                </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
        );
}
export default ResultsHeader