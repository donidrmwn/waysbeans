import { Col, Container, Button } from 'react-bootstrap'
import { ConvertFormatRupiah } from "../../utils";
import { useMutation, useQuery } from 'react-query';
import { API } from '../../config/api';

export default function CartSubTotal() {
  
    let { data: transaction, refetch } = useQuery("transactionsListCache", async () => {
        const response = await API.get("transactions/unfinished");
        return response.data.data;
    })
  
  
    return (
        <>
            <hr />
            <Container className='d-flex' >
                <Col md="3" className='d-flex' >
                    <div>
                        <p className='m-0 w-100'>Subtotal</p>
                        <p className='m-0 w-100'>Qty</p>
                    </div>
                </Col>
                <Col className='d-flex justify-content-end w-100'>
                    <div>
                        <p className=' m-0 w-100'>{ConvertFormatRupiah(transaction?.sub_total)}</p>
                        <p style={{ textAlign: "end" }} className=' m-0 w-100'>{transaction?.total_qty}</p>
                    </div>
                </Col>
            </Container>
            <hr />
            <Container className='d-flex'>
                <Col md="3">
                    <p className='headerColor fw-bold w-100'>Total</p>
                </Col>
                <Col className='d-flex justify-content-end w-100'>
                    <p className='m-0  headerColor fw-bold  '>{ConvertFormatRupiah(transaction?.sub_total)}</p>
                </Col>
            </Container>
            <Col></Col>

            <Col className=" p-0 d-flex justify-content-end">
                <Button
                    onClick={() => this.handleOnSubmit()}
                    className="w-100 fs-4 main-button">Pay</Button>
            </Col>
        </>
    )
}