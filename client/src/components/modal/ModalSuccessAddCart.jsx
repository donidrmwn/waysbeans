import { Container, Modal } from "react-bootstrap";
import CartProductList from "../cart/CartProductList";
import CardProduct from "../product/CardProduct";
import SuccessAddToCart from "../product/SuccessAddToCart";

export default function ModalSuccessAddCart({ show, onHide, image, price, name }) {

    return (
        <>

            <Modal className="modal-xl" show={show} onHide={onHide} centered>
                <Modal.Title className="p-3">Success add to cart</Modal.Title>
                <Modal.Body className=" m-auto p-3 w-100">
                    <div >
                        <SuccessAddToCart
                            image={image}
                            price={price}
                            name={name}
                        />
                    </div>
                    <div>
                        {/* {products?.map((item, index) => (
                            <CardProduct product={item} key={index} />

                        ))} */}
                    </div>
                </Modal.Body>
            </Modal>

        </>
    )
}