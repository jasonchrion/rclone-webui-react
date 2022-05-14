import React, {useCallback, useState} from 'react';
import {
    Button,
    Col,
    Container,
    FormGroup,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Table,
    UncontrolledTooltip
} from 'reactstrap';
import axiosInstance from "../../../utils/API/API";
import {addColonAtLast, formatBytes} from "../../../utils/Tools";
import {toast} from "react-toastify";
import * as RclonePropTypes from "../../../utils/RclonePropTypes";
import FileUploadBox from "./FileUploadBox";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import intl from 'react-intl-universal';

/**
 * New Mount Modal shows a button for opening a modal for new mount and then executes okHandle when positive
 * button is clicked
 * @param props
 * @returns {*}
 * @constructor
 */
const FileUploadModal = (props) => {
    const {
        currentPath
    } = props;

    const [modal, setModal] = useState(false);


    const [files, setFiles] = useState(null);

    const [isUploading, setIsUploading] = useState(false);


    const toggle = () => setModal(!modal);


    const changeFilesHandler = (e) => {
        setFiles(e.target.files);
    }

    const isUploadDisabled = () => !files || isUploading;

    const getFilesElement = () => {
        let out = [];
        for (let i = 0; i < files.length; i++) {
            out.push(<tr>
                <td>{files[i].name}</td>
                <td>{files[i].size === -1 ? "-" : formatBytes(files[i].size, 2)}</td>
            </tr>);
        }
        return out;
    }


    const fileUploadHandler = (_) => {
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            // get item
            let file = files[i];

            data.append("file" + i, file);
        }
        setIsUploading(true);

        axiosInstance.post(`operations/uploadfile?fs=` +
            `${addColonAtLast(currentPath.remoteName)}` +
            `&remote=${currentPath.remotePath}`, data)
            .then(res => {
                setIsUploading(false);
                setFiles(null);
                toggle();
                toast.info(intl.get("EXPLORER.UPLOAD_SUCCESS"));
            }, err => {
                setIsUploading(false);
                toast.error(intl.get("EXPLORER.UPLOAD_FAIL"));
            });
    }

    const filesDropHandler = useCallback((item, monitor) => {
        if (monitor) {
            setFiles(monitor.getItem().files);
        }
    }, []);

    return (
        <div data-test="fileUploadModalComponent">

            <Button className="btn-explorer-action h-100" id="UploadButton"
                    onClick={toggle}>
                <i className="fa fa-lg fa-upload"/>
            </Button>
            <UncontrolledTooltip placement="right" target="UploadButton">
                {intl.get("EXPLORER.UPLOAD_FILE")}
            </UncontrolledTooltip>
            <Modal isOpen={modal} toggle={toggle}>
                <DndProvider backend={HTML5Backend}>
                    <ModalHeader toggle={toggle}>{intl.get("EXPLORER.UPLOAD_FILE")}</ModalHeader>
                    <ModalBody>
                        <Container fluid>
                            <FileUploadBox onDrop={filesDropHandler}>
                                {files ? <Row>
                                    <Table>
                                        <thead>
                                        <tr>
                                            <th>{intl.get("EXPLORER.NAME")}</th>
                                            <th>{intl.get("EXPLORER.SIZE")}</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {getFilesElement()}
                                        </tbody>
                                    </Table>

                                </Row> : <Row className="upload-box">
                                    <Col sm={3}/>
                                    <Col sm={6}>

                                        <label htmlFor="upload-file">

                                            <Row>
                                                <i className="fa fa-lg fa-plus mx-auto mt-5"/>
                                                <p className="text-center mt-2">{intl.get("EXPLORER.UPLOAD_TIP")}</p>
                                            </Row>

                                        </label>
                                    </Col>
                                    <Col sm={3}/>
                                </Row>
                                }
                                <Row>
                                    <FormGroup row className="pl-2 pr-2 d-none">
                                        <Input id="upload-file" type="file" name="file" onChange={changeFilesHandler}
                                               multiple/>
                                    </FormGroup>
                                </Row>
                            </FileUploadBox>
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button data-test="ok-button" color="primary" onClick={fileUploadHandler}
                                disabled={isUploadDisabled()}>{isUploading ? intl.get("EXPLORER.UPLOADING") : intl.get("EXPLORER.UPLOAD")}</Button>{' '}
                        <Button data-test="cancel-button" color="secondary" onClick={toggle}>{intl.get("EXPLORER.CANCEL")}</Button>
                    </ModalFooter>
                </DndProvider>

            </Modal>
        </div>
    );
}

FileUploadModal.propTypes = {
    currentPath: RclonePropTypes.PROP_CURRENT_PATH
}

export default FileUploadModal;