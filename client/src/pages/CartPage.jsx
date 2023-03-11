import CartProductList from "../components/cart/CartProductList";
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { API } from '../config/api';
import { Row, Col, Container, Button } from 'react-bootstrap'
import CartSubTotal from "../components/cart/CartSubTotal";
import { useNavigate } from "react-router";
import ModalShipping from "../components/modal/ModalShipping"

export default function CartPage() {
    
    
    const [cart, setCart] = useState(false)
    let navigate = useNavigate();
    let { data: carts, refetch: refetchCarts } = useQuery("cartsListCache", async () => {
        const response = await API.get("carts/not-checkout");
        return response.data.data;
    })

    let { data: transaction, refetch: refetchTransaction } = useQuery("transactionsListCache", async () => {
        const response = await API.get("transactions/unfinished");
        return response.data.data;
    })
    const incrementCart = (id, orderQuantity,product_id) => {
        setCart({
            id: id,
            product_id: product_id,
            order_quantity: orderQuantity + 1
        })
    }

    const decrementCart = (id, orderQuantity,product_id) => {
        setCart({
            id: id,
            product_id: product_id,
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
                { 
                    product_id: cart.product_id,
                    order_quantity: cart.order_quantity 
                },
                config
            );
            console.log(response)
            refetchCarts()
            refetchTransaction()
        } catch (error) {
            console.log(error)
        }
    })

    const deleteCart = useMutation(async (id) => {
        try {
            await API.delete(`/cart/${id}`);
            console.log(id)
            refetchCarts();
            window.dispatchEvent(new Event("badge"));
        } catch (error) {
            console.log(error)
        }
    });

    useEffect(() => {
        if (cart) {
            updateCart.mutate(cart.id)
        }
    }, [cart])
    return (
        <>

            <Container className='mt-5 m-auto'>
                {carts?.length >= 1 ?
                    <Row className="d-flex">
                        <p className="headerColor fs-4 fw-bolder">My Cart</p>
                        <p className="fs-5">Review Your Order</p>

                        <Col md="8" className='mt-0'>
                            <Container>
                                <CartProductList
                                    incrementCart={incrementCart}
                                    decrementCart={decrementCart}
                                    deleteCart={deleteCart}
                                    carts={carts}
                                />
                            </Container>
                        </Col>
                        <Col>
                            <CartSubTotal transaction={transaction} />
                        </Col>
                    </Row>
                    :
                    <>
                        <h3 className="mb-4">There is no items in your Cart </h3>
                        <Button
                            className="w-25 main-button"
                            onClick={() => navigate("/")}>Shop Now ?</Button>
                    </>
                }
            </Container>

            
        </>
    )
}