import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap'
import { useContext, useEffect, useState } from 'react'
import ModalLogin from '../modal/ModalLogin'
import ModalRegister from '../modal/ModalRegister'
import Brand from '../brand/Brand'
import { UserContext } from '../../context/userContext'
import DropDownAdmin from './DropDownAdmin'
import DropDownUser from './DropDownUser'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { API } from '../../config/api'


export default function Navibar() {
    const [state] = useContext(UserContext);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleCloseLogin = () => setShowLogin(false)
    const handleShowLogin = () => setShowLogin(true)

    const handleCloseRegister = () => setShowRegister(false)
    const handleShowRegister = () => setShowRegister(true)

    const popLogin = () => {
        setShowLogin(true);
        setShowRegister(false);
    };

    const popRegister = () => {
        setShowLogin(false);
        setShowRegister(true);
    };

    let { data: carts,refetch} = useQuery('cartsCache', async () => {
        const response = await API.get('/carts/not-checkout');
        return response.data.data
    });

    useEffect(() =>{
       
        window.addEventListener('badge', () => {
            refetch()
        })
    },[])

    return (
        <>
            <Navbar style={{ boxShadow: "0 5px 300px gray" }} collapseOnSelect expand="lg" bg="light" variant="light" className="mb-5" sticky="top">
                <Container className=" py-2 ">
                    <Nav>
                        <Navbar.Brand className="fs-1">
                            <Link style={{ textDecoration: "none" }} to="/">
                                <Brand

                                    imgSize="30px"
                                />
                            </Link>
                        </Navbar.Brand>

                    </Nav>
                    <Nav>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="d-flex justify-content-end">

                                {!state.isLogin ?
                                    <Form className="d-flex gap-3">
                                        <>
                                            <Button onClick={handleShowLogin} className='px-4 py-1 auth-navibar-button fw-bold' variant="outline-success">Login</Button>
                                            <Button onClick={handleShowRegister} className='px-4 py-1 auth-navibar-button fw-bold' variant="success">Register</Button>
                                        </>
                                    </Form>
                                    : state.user.role == "admin" ?
                                        <>
                                            <DropDownAdmin />
                                        </>
                                        :
                                        <>
                                            <DropDownUser
                                                badgeQty={carts?.length}
                                            />
                                        </>

                                }
                            </Nav>
                        </Navbar.Collapse>
                    </Nav>
                </Container>
            </Navbar>

            <ModalLogin
                show={showLogin}
                onHide={() => handleCloseLogin()}
                handleRegister={() => popRegister()}
            />

            <ModalRegister
                show={showRegister}
                onHide={() => handleCloseRegister()}
                handleLogin={() => popLogin()}
            />
        </>
    )
}