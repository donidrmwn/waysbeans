import { Container, Col, Row, Image } from 'react-bootstrap'
import { useQuery } from 'react-query';
import Brand from '../components/brand/Brand'
import CardProduct from '../components/product/CardProduct'
import { API } from '../config/api';
import { useEffect, useState } from 'react';


export default function LandingPage() {
    const title = "Home";
    document.title = "Waysbeans | " + title;
    const [matches, setMatches] = useState( window.matchMedia("(min-width: 1400px)").matches )


    let { data: products } = useQuery("productsCache", async () => {
        const response = await API.get("/products");
        return response.data.data;
    })
    const handler = (e) => setMatches(e.matches);
    useEffect(() => {
       
        window.matchMedia("(min-width: 1400px)").addEventListener('change', handler);
        return () => window.matchMedia("(min-width: 1400px)").removeEventListener('change', handler);
    }, []);
    return (
        <>
            <Container className="p-5" >
                <Container className=" m-auto" height={"2em"}>

                    <Row style={{ backgroundColor: "#DBB699", width: "100%", height: "100%" }}>
                        {matches && (
                            <Col sm={12} lg="6" className="p-5 d-grid align-items-center">
                                <h1 className="charlesSebastian" style={{ fontSize: "6em" }}  >
                                    <Brand imgSize="50em" />
                                </h1>
                                <p className="fs-2 m-0 mb-3">BEST QUALITY COFFEE BEANS</p>
                                <p className="fs-3 m-0">Quality freshly roasted coffee made just for you. Pour, brew and enjoy</p>

                            </Col>

                        )}

                        {!matches && (
                            <Col sm={12} lg="6" className="px-3 py-5 d-grid align-items-center">
                                <h1 className="charlesSebastian" style={{ fontSize: "4em" }}  >
                                    <Brand imgSize="40em" />
                                </h1>
                                <p className="fs-2 m-0 mb-3">BEST QUALITY COFFEE BEANS</p>
                                <p className="fs-3 m-0">Quality freshly roasted coffee made just for you. Pour, brew and enjoy</p>
                            </Col>

                        )}

                        {matches && (
                            <Col sm={12} lg="5" className="d-flex align-items-end">
                                <div className="d-grid p-0 pb-4">
                                    <img className='w-100 mb-3' src="/Vector.png" alt="" />
                                    <img className='w-100 mb-3' src="/Vector.png" alt="" />
                                    <img className='w-100' src="/Vector.png" alt="" />
                                </div>
                            </Col>
                        )}

                    </Row>

                    {matches && (<Image
                        style={{
                            position: "absolute",
                            top: "10em",
                            right: "15em",
                            width: "30em"
                        }}
                        src="/Rectangle 3.png"
                        alt="" />)}


                </Container>
                <Container className="mt-3 p-0 w-100 ">
                    <Row >
                        {products?.map((item, index) => (
                            <CardProduct product={item} key={index} />
                        ))}
                    </Row>
                </Container>
            </Container >


        </>
    )
}