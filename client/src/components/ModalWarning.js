import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export const ModalWarning = ({ modal, toggle }) => {

    return (
        <div>
            <Modal isOpen={modal[0]} toggle={toggle}>
                <ModalHeader toggle={toggle}>You need more concentration and look at other bets</ModalHeader>
                <ModalBody>
                    {
                        modal[1] === 5 ?
                        'Are you sure that you are doing everything right, maybe you should take a break' :
                        'You need a break and just watch the bets'
                    }
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => toggle()} color="secondary">Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}