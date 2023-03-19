import { Modal } from "react-bootstrap";
import TransactionDetail from "../transaction/TransactionDetail";

export default function ModalDetailTransaction(props) {
    return (
        <>
            <Modal className="modal-xl"  show={props.show} onHide={props.onHide} centered>
                <Modal.Body className=" m-auto p-0 w-100">
                    <div>   
                        <TransactionDetail index={0} transaction={props.transaction}/>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}