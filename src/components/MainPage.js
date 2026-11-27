import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import movie from './images/godfather.jpg';
import serie from './images/brakingbad.jpeg';
import game from './images/gta.png';

function MainPage()  {

    const cardStyle = {
        marginTop: "1rem"
    };

    return (
        <Container id="wellcome" className="res-col">
            <Row>
                <Col sm={4}>
                <Carousel>
                    <Carousel.Item interval={3000}>
                        <img
                            className="d-block"
                            src={movie}
                            alt="movie"
                            />
                    </Carousel.Item>
                    <Carousel.Item interval={3000}>
                        <img
                            className="d-block"
                            src={serie}
                            alt="serie"
                            />
                    </Carousel.Item>
                    <Carousel.Item  interval={3000}>
                        <img
                            className="d-block"
                            src={game}
                            alt="game"
                            />
                    </Carousel.Item>
                </Carousel>
                </Col>
                <Col sm={8}>
                    <Card className="bg-dark text-white" style={cardStyle}>
                        <Card.Body>
                            <Card.Title>Wellcome to MovieFinder</Card.Title>
                            <Card.Text>
                                This is a showcase application that helps users find information about movies, series and video games.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card border="info" className="bg-dark text-white" style={cardStyle}>
                        <Card.Body>
                        <Card.Title>Read this before use!</Card.Title>
                        <Card.Text>
                            As you browsing  app, you will notice that some results may display shortages such as images and information. 
                            In addition, some title posters can not be retrieved from server. 
                            API is still under development and thus it is possible to encounter such issues. 
                             <b>Have fun using the app!</b>       
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        
        </Container>
        
        );
}
export default MainPage