import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export const ModalInfo = ({ modal, toggle, removeDataId, cancelRemoveDataId }) => {

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Modal for remove data</ModalHeader>
                <ModalBody>
                    Are you sure, remove this data
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => removeDataId()} style={{ marginRight: '1rem' }} color="primary">Yep</Button>{' '}
                    <Button onClick={() => cancelRemoveDataId()} color="secondary">Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}