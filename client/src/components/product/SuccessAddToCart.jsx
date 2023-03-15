import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { ConvertFormatRupiah } from "../../utils";

export default function SuccessAddToCart({ image, price, name }) {
    const handleNavigate = useNavigate();
    return (
        <>
            <Container>
                <Card>
                    <Card.Body>
                        <Row className="d-flex ">
                            <Col md="1">
                                <Image className="w-100" src={image} />
                            </Col>
                            <Col md="7" >
                                <h3>{name}</h3>
                                <p className="fs-4">{ConvertFormatRupiah(price)}</p>
                            </Col>
                            <Col md="4" >
                                <Button onClick={() => handleNavigate("/cart")} className="main-button">
                                    Show Cart
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}