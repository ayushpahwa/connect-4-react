import { React, useEffect, useReducer, useState } from "react";
import { Modal, Button, Input, Form, Radio } from "semantic-ui-react";
import {
  allTurnTypesList,
  DEFAULT_MODAL_CONFIG,
  MODAL_SETTINGS_CLOSE,
  numOfGamesList,
} from "../../constants";

const configReducer = (state, action) => {
  const newModalConfig = Object.assign({}, DEFAULT_MODAL_CONFIG);
  switch (action.type) {
    case "name":
    case "name1":
    case "name2":
      newModalConfig["title"] = "Enter your name";
      newModalConfig["isNameType"] = true;
      break;
    case "game":
      newModalConfig["title"] = "Enter your game";
      newModalConfig["submitText"] = "Submit";
      newModalConfig["isGameType"] = true;
      newModalConfig["isNameType"] = false;
      break;
    case "turn":
      newModalConfig["title"] = "Enter your turn";
      newModalConfig["submitText"] = "Submit";
      newModalConfig["isTurnType"] = true;
      newModalConfig["isNameType"] = false;
      break;
    default:
      break;
  }
  return newModalConfig;
};

export const SetupModal = ({ modalSettings, onModalClosed, modalData, setModalData }) => {
  const [modalConfig, setModalConfig] = useReducer(
    configReducer,
    DEFAULT_MODAL_CONFIG
  );
  let [inputText, setInputText] = useState("");
  let { isOpen, inputType } = modalSettings;
  useEffect(() => {
    setModalConfig({ type: inputType });
  }, [inputType]);

  return (
    <Modal open={isOpen} onClose={() => onModalClosed(MODAL_SETTINGS_CLOSE)}>
      <Modal.Header>{modalConfig.title}</Modal.Header>
      {!modalConfig.isNameType ? null : (
        <>
          <Modal.Content>
            <Input
              placeholder="Enter you name.."
              min="3"
              onChange={(event) => {
                setInputText(event.target.value);
              }}
            />
          </Modal.Content>
        </>
      )}
      {!modalConfig.isGameType ? null : (
        <>
          <Modal.Content>
            <Form>
              {numOfGamesList.map((element) => (
                <Form.Field key={element}>
                  <Radio
                    label={element + " Games"}
                    name="numOfGamesRadio"
                    value={element}
                    checked={modalData.numOfGames === element}
                    onChange={(e, { value }) => {
                      setModalData({...modalData, numOfGames:value})
                    }}
                  />
                </Form.Field>
              ))}
            </Form>
          </Modal.Content>
        </>
      )}
      {!modalConfig.isTurnType ? null : (
        <>
          <Modal.Content>
            <Form>
              {Object.keys(allTurnTypesList).map((key) => (
                <Form.Field key={key}>
                  <Radio
                    label={allTurnTypesList[key][0]}
                    name="turnTypeRadio"
                    value={key}
                    checked={modalData.turnType === key}
                    onChange={(e, { value }) => {
                      setModalData({...modalData, turnType:value})
                    }}
                  />
                </Form.Field>
              ))}
            </Form>
          </Modal.Content>
        </>
      )}

      <Modal.Actions>
        <Button color="red" onClick={() => onModalClosed(MODAL_SETTINGS_CLOSE)}>
          Cancel
        </Button>
        <Button
          content={modalConfig.submitText}
          labelPosition="right"
          icon="checkmark"
          onClick={() => {
            let allowModalToClose = true;
            if (inputType === "name1") {
              if (inputText.length <= 0) {
                allowModalToClose = false;
              }
              setModalData({...modalData,namePlayer01:inputText});
              setInputText("");
            } else if (inputType === "name2") {
              if (inputText.length <= 0) {
                allowModalToClose = false;
              }
              setModalData({...modalData,namePlayer02:inputText});
              setInputText("");
            }
            if (allowModalToClose) onModalClosed(MODAL_SETTINGS_CLOSE);
          }}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

