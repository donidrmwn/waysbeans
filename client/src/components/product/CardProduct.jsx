
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ConvertFormatRupiah } from "../../utils";


export default function CardProduct(props) {
    
    return (
        <>
            <Col key={props.index} >
                <Link to={'/product/' + props.product.id} style={{ textDecoration: "none" }}>
                <Card.Img onClick={() => props?.onHide()} role="button" variant="top" src={`${props.product.image}`} />
                <Card.Body  className="p-2 " style={{ backgroundColor: "#F6E6DA" }}>
                    <Card.Title className="fs-6 mb-3 fw-bold header-color text-truncate">
                        {props.product.name}
                    </Card.Title>
                    <Card.Text className="m-0 mb-1 header-color">
                        {ConvertFormatRupiah(props.product.price)}
                    </Card.Text>
                    <Card.Text className="header-color"> 
                        Stock : {props.product.stock}
                    </Card.Text>
                </Card.Body>
                </Link>
            </Col>
        </>
    )
}