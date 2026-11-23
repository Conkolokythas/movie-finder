import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const ResultsHeader = ({ resultsNum, term }) => {

    return (
        <>
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>{resultsNum} results for <b>{term}</b></Navbar.Brand>
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