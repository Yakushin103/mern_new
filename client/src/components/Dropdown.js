import React, { useState } from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap'

export const Dropdown = ({ options, category, setCategory, addCategory, setModal, modal }) => {
    const [dropdownOpen, setOpen] = useState(false)

    const toggle = () => setOpen(!dropdownOpen)

    return (
        <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
                {
                    category === '' ? 'Choose category' : category
                }
            </DropdownToggle>
            <DropdownMenu>
                {
                    options.length &&
                    options.map(item => (
                        <DropdownItem
                            onClick={() => setCategory(item.name)}
                            key={item._id}
                        >
                            {item.name}
                        </DropdownItem>
                    ))
                }
                <DropdownItem divider />
                <DropdownItem>
                    <Button
                        onClick={() => setModal(!modal)}
                    >
                        <i className="material-icons">add new</i>
                    </Button>
                </DropdownItem>
            </DropdownMenu>
        </ButtonDropdown>
    )
}