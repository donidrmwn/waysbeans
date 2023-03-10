import { Container, Table } from 'react-bootstrap'

export default function TransactionListPage() {
    const title = "Transactions";
    document.title = "Waysbeans | " + title;
    return (
        <>
            <Container className='p-5'>
                <h1>Income Transaction</h1>
                <Table style={{ fontSize: "14px" }} className='mt-5' striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ width: "72px" }}>No</th>
                            <th style={{ width: "72px" }}>Id</th>
                            <th style={{ textAlign: "start", width: "190px" }}>Name</th>
                            <th style={{ textAlign: "start", width: "280px" }}>Address</th>
                            <th style={{ textAlign: "start", width: "100px" }}>Post Code</th>
                            <th style={{ textAlign: "start", width: "100px" }}>Products</th>
                            <th style={{ textAlign: "start", width: "190px" }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <>
                            <tr>
                                <td>1</td>
                                <td>321032149</td>
                                <td>Doni Darmawan</td>
                                <td>Jl. Tajurhalang</td>
                                <td>16820</td>
                                <td>RWANDA Beans</td>
                                <td>Waiting Verification</td>
                            </tr>
                        </>

                    </tbody>
                </Table>
            </Container>
        </>
    )
}