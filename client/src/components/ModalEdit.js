import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

import { DateKeeperAdd } from './DateKeeperAdd'
import { TimeKeeperAdd } from './TimeKeeperAdd'

export const ModalEdit = ({ modal, toggle, formInput, setFormInput, handleChangeNewData }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [showTime, setShowTime] = useState(false)

    useEffect(() => {
        if (formInput.bet !== '' && formInput.coef !== '') {
            if (formInput.plus !== '') {
                let sum = (formInput.bet * formInput.coef) - formInput.bet
                let sumVal = formInput.plus === 'Pos' ? sum : formInput.plus === 'Neg' ? -formInput.bet : 0
                setFormInput({
                    ...formInput,
                    sum: sumVal.toFixed(2)
                })
            }
        } else {
            setFormInput({
                ...formInput,
                sum: ''
            })
        }
    }, [formInput.bet, formInput.coef, formInput.plus])

    const changeInput = (name, value) => {
        setFormInput({
            ...formInput,
            [name]: value
        })
    }

    const toggleDropdown = () => setDropdownOpen(prevState => !prevState)

    const ValidForm = () => {
        let DateValid = formInput.date !== ''
        let TimeValid = formInput.time !== ''
        let BetValid = formInput.bet !== ''
        let CoefValid = formInput.coef !== ''
        let PlusValid = formInput.plus !== ''

        return DateValid && TimeValid && BetValid && CoefValid && PlusValid
    }

    return (
        <div style={{ width: "80%" }} >
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit data</ModalHeader>
                <ModalBody className="text-center" >
                    <Row>
                        <Col xs="6" >
                            <DateKeeperAdd
                                startDate={formInput}
                                setStartDate={setFormInput}
                            />
                            <span>
                                {/* {formInput.date} */}
                            </span>
                        </Col>
                        <Col xs="6" >
                            <span>
                                {/* {formInput.date} */}
                            </span>
                            {
                                showTime &&
                                <TimeKeeperAdd
                                    time={formInput.Time}
                                    setTime={(time) => setFormInput({
                                        ...formInput,
                                        "time": time
                                    })}
                                    showTime={showTime}
                                    setShowTime={setShowTime}
                                />
                            }
                            {!showTime &&
                                <Button onClick={() => setShowTime(true)}>{formInput.time}</Button>
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6" >
                            <Input
                                name="bet"
                                value={formInput.bet}
                                placeholder="bet"
                                onChange={(e) => changeInput(e.target.name, e.target.value)}
                            />
                        </Col>
                        <Col xs="6" >
                            <Input
                                name="coef"
                                value={formInput.coef}
                                placeholder="coef"
                                onChange={(e) => changeInput(e.target.name, e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={{ size: 6, offset: 6 }} >
                            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                                <DropdownToggle caret>
                                    {
                                        formInput.plus === "" ? "Choose Pos/Neg" : formInput.plus
                                    }
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem
                                        onClick={() => changeInput("plus", "Pos")}
                                    >
                                        Pos
                                    </DropdownItem>
                                    <DropdownItem
                                        onClick={() => changeInput("plus", "Smo")}
                                    >
                                        Smo
                                    </DropdownItem>
                                    <DropdownItem
                                        onClick={() => changeInput("plus", "Neg")}
                                    >
                                        Neg
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "5rem" }} >
                        <Col sm={{ size: 2, offset: 6 }} >Sum: {formInput.sum}</Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button disabled={!ValidForm()} style={{ marginRight: '1rem' }} color="primary" onClick={handleChangeNewData}>Save</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}