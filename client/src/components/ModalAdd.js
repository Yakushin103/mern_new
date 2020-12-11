import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Input } from 'reactstrap'

import { DateKeeperAdd } from './DateKeeperAdd'
import { TimeKeeperAdd } from './TimeKeeperAdd'

export const ModalAdd = ({ modal, toggle }) => {
    const [time, setTime] = useState('12:34pm')
    const [showTime, setShowTime] = useState(false)
    const [formInput, setFormInput] = useState({
        Date: new Date(),
        Time: '',
        Bet: '',
        Coef: '',
        Plus: '',
        Sum: ''
    })

    useEffect(() => {
        if (formInput.Bet !== '' && formInput.Coef !== '') {
            let sumVal = formInput.Bet * formInput.Coef
            setFormInput({
                ...formInput,
                Sum: sumVal
            })
        } else {
            setFormInput({
                ...formInput,
                Sum: ''
            })
        }
    }, [formInput.Bet, formInput.Coef])

    const changeInput = (name, value) => {
        setFormInput({
            ...formInput,
            [name]: value
        })
    }

    const ValidForm = () => {
        let DateValid = formInput.Date !== ''
        let TimeValid = formInput.Time !== ''
        let BetValid = formInput.Bet !== ''
        let CoefValid = formInput.Coef !== ''
        let PlusValid = formInput.Plus !== ''

        return DateValid && TimeValid && BetValid && CoefValid && PlusValid
    }

    return (
        <div style={{ width: "80%" }} >
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add new data</ModalHeader>
                <ModalBody className="text-center" >
                    <Row>
                        <Col xs="6" >
                            <DateKeeperAdd
                                startDate={formInput}
                                setStartDate={setFormInput}
                            />
                        </Col>
                        <Col xs="6" >
                            {
                                showTime &&
                                <TimeKeeperAdd
                                    time={time}
                                    setTime={setTime}
                                    showTime={showTime}
                                    setShowTime={setShowTime}
                                />
                            }
                            {!showTime &&
                                <Button onClick={() => setShowTime(true)}>{time}</Button>
                            }
                            {/* <Input
                                name="Time"
                                value={formInput.Time}
                                placeholder="Time"
                                onChange={(e) => changeInput(e.target.name, e.target.value)}
                            /> */}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6" >
                            <Input
                                name="Bet"
                                value={formInput.Bet}
                                placeholder="Bet"
                                onChange={(e) => changeInput(e.target.name, e.target.value)}
                            />
                        </Col>
                        <Col xs="6" >
                            <Input
                                name="Coef"
                                value={formInput.Coef}
                                placeholder="Coef"
                                onChange={(e) => changeInput(e.target.name, e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={{ size: 6, offset: 6 }} >
                            <Input
                                name="Plus"
                                value={formInput.Plus}
                                placeholder="Plus"
                                onChange={(e) => changeInput(e.target.name, e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "5rem" }} >
                        <Col sm={{ size: 2, offset: 6 }} >Sum: {formInput.Sum}</Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button disabled={!ValidForm()} style={{ marginRight: '1rem' }} color="primary" onClick={toggle}>Save</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}