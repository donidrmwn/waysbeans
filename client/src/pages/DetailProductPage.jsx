import { Container, Row, Col, Button, Image } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { ConvertFormatRupiah } from "../utils"
import { useMutation, useQuery } from 'react-query'

import { API } from "../config/api"
import { useEffect, useState } from "react"
import ModalSuccessAddProduct from "../components/modal/ModalSuccessAddProduct"

export default function DetailProductPage() {
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const handleShowModalSuccess = () => setShowSuccessAlert(true)
    const handleCloseModalSuccess = () => {
        setShowSuccessAlert(false)
        navigate('/cart');
    }
    let { id } = useParams();
    let navigate = useNavigate();
    let { data: product } = useQuery('productDetailCache', async () => {
        const response = await API.get('/product/' + id);
        return response.data.data
    });

   
    
    document.title = "Waysbeans | Product Detail";
    const handleBuy = useMutation(async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };

            const data = {
                product_id: product.id,
                order_quantity: 1,
            };

            const body = JSON.stringify(data);
            
            const response = await API.post('/cart', body, config);
            window.dispatchEvent(new Event("badge"));
        
            handleShowModalSuccess();
            console.log("Add Cart success :", response)
           

        } catch (error) {
            console.log("transaction failed : ", error);
            navigate('/cart');
        }
    });


    return (
        <>
            <Container>
                <Row className="p-5 m-auto">
                    <Col>
                        <Image className="w-100" alt="photo-product" src={`${product?.image}`} />
                    </Col>
                    <Col className="align-items-center m-auto justify-content-center">
                        <h1 className="header-color">{product?.name}</h1>
                        <p className="header-color fs-4 mb-5">Stock: {product?.stock}</p>
                        <p className="fs-5">{product?.description}</p>
                        <br />
                        <br />
                        <p className="d-flex justify-content-end fs-3 fw-bolder header-color">{ConvertFormatRupiah(product?.price)}</p>
                        <Button onClick={(e) => { handleBuy.mutate(e) }} className="w-100 fs-4 main-button">Add Cart</Button>
                    </Col>
                </Row>
            </Container>
            <ModalSuccessAddProduct
                show={showSuccessAlert}
                onHide={handleCloseModalSuccess}
            />
        </>
    )
}