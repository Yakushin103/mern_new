import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap'

export const ModalCat = ({modal, toggle, newCategory, setNewCategory, addCategory, cancelAddCategory}) => {

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={() => cancelAddCategory}>Modal for add category</ModalHeader>
        <ModalBody>
            <Input 
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
            />
        </ModalBody>
        <ModalFooter>
          <Button style={{ marginRight: '1rem' }} color="primary" onClick={addCategory}>Add new Category</Button>{' '}
          <Button color="secondary" onClick={cancelAddCategory}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}