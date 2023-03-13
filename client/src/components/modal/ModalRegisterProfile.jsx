import { Modal } from "react-bootstrap";
import ProfileRegister from "../profile/ProfileRegister";

export default function ModalRegisterProfile(props) {
    return (
        <>
            <Modal show={props.show} onHide={props.onHide} centered>
                <Modal.Body className=" m-auto p-0 w-100">
                    <ProfileRegister 
                        refetchProfile={props.refetchProfile}
                    />
                </Modal.Body>
            </Modal>
        </>
    )
}