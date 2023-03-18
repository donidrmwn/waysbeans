import { ConvertFormatRupiah, ConvertFormatDate } from "../../utils";
import { Card, Row, Col } from 'react-bootstrap'
import Brand from "../../components/brand/Brand";

export default function ProfileTransactions({ transactions }) {


    return (
        <>
            {transactions?.length !== 0 ?
                <>
                    {transactions?.map((item, index) => (
                        <Card key={index} className='mb-3'>
                            <Card.Body className='cardTransaction'>
                                <h3>Order Number: {item.id}</h3>
                                <p className='m-0'>{ConvertFormatDate(item.updated_at)}</p>
                                <hr />

                                {item.carts?.map((cart, index) =>
                                    <Row key={index} className='px-3 align-items-center mb-2'>
                                        <Col md="2" >
                                            <img className='w-100' src={`${cart.products.image}`} alt="" />
                                        </Col>
                                        <Col md="7">
                                            <div className='mb-3'>
                                                <h5 className='fw-bold headerColor'>{cart.products.name}</h5>

                                            </div>
                                            <div>
                                                <p className='m-0'>Price: {ConvertFormatRupiah(cart.products.price)}</p>
                                                <p className='m-0'>Qty: {cart.order_quantity}</p>
                                                <h5 className='m-0 d-flex justify-content-end'> {ConvertFormatRupiah(cart.order_quantity * cart.products.price)}</h5>
                                            </div>
                                            <hr />
                                        </Col>
                                        <Col className='d-flex align-items-center justify-content-center' md="3">
                                            <div className='d-grid ' >
                                                <div className='m-auto mb-3'>
                                                    <Brand
                                                        imgSize="15px" />
                                                </div>
                                                <img className='w-50 m-auto' src="qr_code.png" alt="" />

                                                {item.status == "Success" ?
                                                    <div className="success-trans mt-2 d-flex  justify-content-center align-items-center w-100 p-1">
                                                        <p className='m-0'>{item.status}</p>
                                                    </div>
                                                    :
                                                    <div className="waiting-trans mt-2 d-flex  justify-content-center align-items-center w-100 p-1">
                                                        <p className='m-0'>{item.status}</p>
                                                    </div>
                                                }
                                                
                                            </div>
                                        </Col>
                                    </Row>
                                )}
                                <hr />
                                <h5 className='m-0 headerColor fw-bold mt-3'>Total : {ConvertFormatRupiah(item.sub_total)}</h5>

                            </Card.Body>
                        </Card>
                    ))}
                </>
                :
                <>
                    <p>There is no order</p>
                </>
            }
        </>
    )
}