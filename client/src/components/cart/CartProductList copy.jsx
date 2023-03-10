import { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useMutation, useQuery } from 'react-query';
import { API } from '../../config/api';
import { ConvertFormatRupiah } from "../../utils";

export default function CartProductList() {
    const [cart, setCart] = useState(false)
    let { data: carts, refetch } = useQuery("cartsListCache", async () => {
        const response = await API.get("carts/not-checkout");
        return response.data.data;
    })

    const incrementCart = (id, orderQuantity) => {
        setCart({
            id: id,
            order_quantity: orderQuantity + 1
        })



    }

    const decrementCart = (id, orderQuantity) => {
        setCart({
            id: id,
            order_quantity: orderQuantity - 1
        })


    }

    const updateCart = useMutation(async (id) => {
        try {
            //Configuration API 
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };
            const response = await API.patch(
                '/cart/' + id,
                { order_quantity: cart.order_quantity },
                config
            );
            refetch()
        } catch (error) {
            console.log(error)
        }
    })

    useEffect(() => {
     if(cart){
        updateCart.mutate(cart.id)        
    }
    }, [cart])
    return (
        <>
            {carts?.map((item, index) => (
                <div key={index}>
                    <hr className="horizontalRule" />
                    <Row>
                        <Col md="2" className="m-auto">
                            <img className='w-100' src={`http://localhost:5000/uploads/${item.products.image}`} alt="" />
                        </Col>
                        <Col className='d-flex align-items-center'>
                            <Form>
                                <p className='mb-2 fs-5 headerColor fw-bold w-100'>{item.products.name}</p>
                                <Button
                                    variant="link"
                                    style={{ textDecoration: "none", color: "black" }}
                                    className='fs-1 headerColor user-select-none p-0 pb-3'
                                    onClick={() => decrementCart(item.id, item.order_quantity)}
                                >-</Button>
                                <Form.Control
                                    style={{
                                        width: "50px",
                                        height: "40px",
                                        backgroundColor: "#F6E6DA",
                                        textAlign: "center"
                                    }}
                                    className='d-inline mx-3'
                                    value={item.order_quantity}
                                    readOnly
                                />
                                <Button
                                    variant="link"
                                    style={{ textDecoration: "none", color: "black" }}
                                    className='fs-1 headerColor user-select-none p-0 pb-3'
                                    onClick={() => incrementCart(item.id, item.order_quantity)}>
                                    +
                                </Button>
                            </Form>

                        </Col>
                        <Col className="d-grid align-items-center justify-content-end">
                            <div>
                                <p>{ConvertFormatRupiah(item.products.price)}</p>
                                <img as={Button} className='image-fluid float-end w-25' src="/trash.png" alt="" />

                            </div>
                        </Col>
                    </Row>
                    <hr className="horizontalRule" />
                </div>
            ))}
        </>
    )
}