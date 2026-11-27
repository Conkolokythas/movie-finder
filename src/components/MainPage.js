import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import movie from './images/godfather.jpg';
import serie from './images/brakingbad.jpeg';
import game from './images/gta.png';

function MainPage()  {

    return (
        <Container>
            <Row>
                <Col>
                <Carousel>
                    <Carousel.Item interval={3000}>
                        <img
                            className="d-block w-100"
                            src={movie}
                            alt="movie"
                            />
                        <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={3000}>
                        <img
                            className="d-block w-100"
                            src={serie}
                            alt="serie"
                            />
                        <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item  interval={3000}>
                        <img
                            className="d-block w-100"
                            src={game}
                            alt="game"
                            />
                        <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                </Col>
                <Col>
                    <Card>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Body>This is a showcase application that helps users find information about movies, series and video games.</Card.Body>
                    </Card>
                </Col>
            </Row>
        
        </Container>
        
        );
}
export default MainPage