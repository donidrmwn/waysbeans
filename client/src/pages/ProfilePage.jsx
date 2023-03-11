import Brand from "../components/brand/Brand";
import { Container, Card, Row, Col } from 'react-bootstrap'
import { ConvertFormatRupiah } from "../utils";
export default function ProfilePage() {
    const title = "Profile";
    document.title = "Waysbeans | " + title;

    
    return (
        <>
            <Container className='p-5'>
                <Row>
                    <Col md="4">
                        <Container>
                            <h4 className='headerColor fw-bold mb-4'>My Profile</h4>
                            <Row>
                                <Col md="6" className='d-flex'>
                                    <img className='w-100' src={`${"rwanda-beans.png"}`} alt="" />
                                </Col>
                                <Col>
                                    <div className='mb-5'>
                                        <p className="headerColor fw-bold m-0 fs-5">Full Name</p>
                                        <p className='m-0'>{"Doni"}</p>
                                    </div>
                                    <div>
                                        <p className="headerColor fw-bold m-0 fs-5">Email</p>
                                        <p className='m-0'>{"doni@mail.com"}</p>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col>

                        <Container>
                            <h4 className='headerColor fw-bold mb-4'>My Transaction</h4>
                            <Card className='mb-3'>
                                <Card.Body className='cardTransaction'>
                                    <h3>Order Number: {3212032149}</h3>
                                    <Row className='px-3 align-items-center'>
                                        <Col md="2" >
                                            <img className='w-100' src={`/${"rwanda-beans.png"}`} alt="" />
                                        </Col>
                                        <Col md="7">
                                            <div className='mb-3'>
                                                <h5 className='fw-bold headerColor'>{"rwanda"}</h5>
                                                <p className='m-0'>{"09-Mar-2023"}</p>
                                            </div>
                                            <div>
                                                <p className='m-0'>Price: {ConvertFormatRupiah(25000)}</p>
                                                <p className='m-0'>Qty: {4}</p>
                                                <p className='m-0 headerColor fw-bold'>Sub Total : {ConvertFormatRupiah(1000000)}</p>
                                            </div>
                                        </Col>
                                        <Col className='d-flex align-items-center' md="3">
                                            <div className='d-grid ' >
                                                <div className='m-auto mb-3'>
                                                    <Brand
                                                        imgSize="15px" />
                                                </div>
                                                <img className='w-50 m-auto' src="qr_code.png" alt="" />
                                                <div className="waitingTrans mt-2 d-flex  justify-content-center align-items-center w-100 p-1">
                                                    <p className='m-0'>Waiting Approve</p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    )
}