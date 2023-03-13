import { useEffect, useState } from 'react';
import { Button, Container, Dropdown, Form, Table } from 'react-bootstrap'
import { useQuery } from 'react-query';
import { API } from '../config/api';

export default function TransactionListPage() {
    const title = "Transactions";
    document.title = "Waysbeans | " + title;
    const [filterState, setFilter] = useState(0)
    const [filterForm, setFilterForm] = useState(null)
    const [routing, setRouting] = useState("/transactions")
    const [filterDate, setFilterDate] = useState({
        start_date: '',
        end_date: '',
    });


    const handleChangeDate = (e) => {
        setFilterDate({
            ...filterDate,
            [e.target.name]: e.target.value,
        })
        console.log(filterDate)
    }

    let { data: transactions, refetch } = useQuery("transactionListCache", async () => {
        const response = await API.get(routing);
        return response.data.data
    })

    const handleOnSubmit = (e) => {
        e.preventDefault();

        refetch()
        console.log(routing)
    }
    

    function showForm() {
        switch (filterState) {
            case 1:
                setRouting(`/transactions/filter/by-date?start_date=${filterDate.start_date}&end_date=${filterDate.end_date}`)
                setFilterForm(
                    <>
                        {/* <Form className='mt-3 d-flex w-50 gap-3'>
                            <Form.Group controlId='formStartDate'>
                                <Form.Control
                                    onChange={handleChangeDate}
                                    name='start_date'
                                    type='date'
                                />
                            </Form.Group>
                            <Form.Group controlId='formEndDate'>
                                <Form.Control
                                    onChange={handleChangeDate}
                                    name="end_date"
                                    type='date'
                                />
                                
                            </Form.Group>
                            <Button onClick={(e) => handleOnSubmit(e)}>
                                    Submit
                                </Button>
                        </Form> */}
                    </>
                )
                break;
            case 2:
                setRouting("/transactions")
                setFilterForm(
                    <>
                        <p>Ini order number</p>
                    </>
                )
                break;
            default:
                setRouting("/transactions")
                setFilterForm(
                    <>
                    </>
                )

                break;
        }
    }

    useEffect(() => {
        refetch()
    }, [routing])
    useEffect(() => {
        showForm();
        // if (filterState == 0) {
        //     refetch();
        // }
    }, [filterState])
    return (
        <>
            <Container className='p-5'>
                <h1>Income Transaction</h1>
                {/* <Form>
                    <Dropdown>
                        <Dropdown.Toggle variant='secondary'>
                            Filter
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setFilter(null)}>Clear Filter</Dropdown.Item>
                            <Dropdown.Item onClick={() => setFilter(1)}>Transaction Date</Dropdown.Item>
                            <Dropdown.Item onClick={() => setFilter(2)}>Order Number</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    {filterForm ? filterForm : null}
                </Form> */}
                <Table style={{ fontSize: "14px" }} className='mt-5' striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ width: "72px" }}>No</th>
                            <th style={{ width: "72px" }}>Id</th>
                            <th style={{ textAlign: "start", width: "190px" }}>Name</th>
                            <th style={{ textAlign: "start", width: "280px" }}>Address</th>
                            <th style={{ textAlign: "start", width: "100px" }}>Post Code</th>
                            <th style={{ textAlign: "start", width: "150px" }}>Products</th>
                            <th style={{ textAlign: "start", width: "190px" }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <>
                            {transactions?.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.address}</td>
                                    <td>{item.post_code}</td>
                                    <td>
                                        {item.carts?.map((cart, index) => (
                                            <p key={index} className='m-0'>{cart.products.name}</p>
                                        ))}
                                    </td>
                                    <td>{item.status}</td>
                                </tr>
                            ))}

                        </>

                    </tbody>
                </Table>
            </Container>
        </>
    )
}