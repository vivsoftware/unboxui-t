import { useDispatch, useSelector } from "react-redux";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import CompareTable from '../../Components/Pages/Compare/CompareTable';

const CModel = () => {
  const { compareModel } = useSelector((state) => state.CompareReducer);
  //   console.log(compareModel);
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch({
      type: "IS_MODAL_CP",
    });
  };

  return (
    <Modal
      size="lg"
      centered={true}
      className="quick-view-modal modal-dialog modal-dialog-scrollable"
      id="quick-view"
      isOpen={compareModel}
      toggle={toggle}
      style={{ display: `${!compareModel ? "none" : "block"}` }}
    >
      <ModalHeader toggle={toggle}></ModalHeader>
      <ModalBody>
              <CompareTable />
      </ModalBody>
    </Modal>
  );
};
export default CModel;
