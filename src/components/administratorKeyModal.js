import * as React from "react";
import { Button } from "baseui/button";
import { Input } from "baseui/input";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from "baseui/modal";

export default function AdministratorKeyModal(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  var [showIncorrectKey, setShowIncorrectKey] = React.useState(false);

  function close() {
    setIsOpen(false);
  }
  return (
    <React.Fragment>
      <span
        style={{ fontSize: "1.5rem", color: "gray", cursor: "pointer" }}
        onClick={() => setIsOpen(true)}
      >
        {" "}
        <i className="bi bi-clipboard"></i>{" "}
      </span>
      <Modal onClose={close} isOpen={isOpen}>
        <ModalHeader>Administrator</ModalHeader>
        <ModalBody>
          <Input
            type="text"
            required
            value={props.adminKey}
            onChange={props.change}
          />

          <span
            style={{
              visibility: props.showIncorrectKey ? "visible" : "hidden",
              fontFamily: "Lato",
              color: "red",
            }}
          >
            Incorrect Key
          </span>
        </ModalBody>
        <ModalFooter>
          <ModalButton kind="tertiary" onClick={close}>
            Cancel
          </ModalButton>
          <ModalButton onClick={props.clickSubmit}>Submit</ModalButton>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}
