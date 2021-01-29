import React, { useState, useEffect, useContext, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../hooks/http.hooks'
import { AuthContext } from '../context/AuthContext.js'
import { format } from 'date-fns'
import { Button } from 'reactstrap'

import { Dropdown } from '../components/Dropdown'
import { ModalCat } from '../components/ModalCat'
import { ModalAdd } from '../components/ModalAdd'
import { ModalEdit } from '../components/ModalEdit'
import { ModalInfo } from '../components/ModalInfo'
import { ModalWarning } from '../components/ModalWarning'
import { TablesData } from '../components/TablesData'
import { Loader } from '../components/Loader'


import './CreatePage.css'

export const CreatePage = () => {
    const { token } = useContext(AuthContext)
    const history = useHistory()
    const auth = useContext(AuthContext)
    const { request } = useHttp()
    const [options, setOptions] = useState([])
    const [optionsData, setOptionsData] = useState([])
    const [category, setCategory] = useState('')
    const [newCategory, setNewCategory] = useState('')
    const [modal, setModal] = useState(false)
    const [modalWarning, setModalWarning] = useState([false, 0])
    const [modalAdd, setModalAdd] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [modalInfo, setModalInfo] = useState(false)
    const [removeData, setRemoveData] = useState('')
    const [editData, setEditData] = useState('')
    const [loading, setLoading] = useState(false)
    const [formInput, setFormInput] = useState({
        date: new Date(),
        time: format(new Date(), `hh:mmb`),
        bet: '',
        coef: '',
        plus: '',
        sum: ''
    })

    const toggle = () => setModal(!modal)
    const toggleAdd = () => setModalAdd(!modalAdd)
    const toggleEdit = () => setModalEdit(!modalEdit)
    const toggleInfo = () => setModalInfo(!modalInfo)
    const toggleWarning = () => setModalWarning([!modalWarning, 0])

    const getLink = useCallback(async () => {
        try {
            const fetched = await request('/api/category/all', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setOptions(fetched)
            setLoading(true)
            // const fetchedData = await request('/api/categoryDate/all', 'GET', null, {
            //     Authorization: `Bearer ${token}`
            // })
            // setOptionsData(fetchedData)
            // setLoading(false)

            const fetchedDataToday = await request(`/api/categoryDate/all/filter?filter=${new Date()}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setOptionsData(fetchedDataToday)
            setLoading(false)

        } catch (e) {
            if (e.message === 'Нет авторизации') {
                auth.logout()
                history.push('/')
            }
        }
    }, [token, request])

    const getAllData = useCallback(async () => {
        // const fetchedData = await request('/api/categoryDate/all', 'GET', null, {
        //     Authorization: `Bearer ${token}`
        // })
        // setOptionsData(fetchedData)
        // setLoading(false)
        const fetchedDataToday = await request(`/api/categoryDate/all/filter?filter=${new Date()}`, 'GET', null, {
            Authorization: `Bearer ${token}`
        })
        setOptionsData(fetchedDataToday)
        setLoading(false)

        let lastFive = []
        let lastTen = []

        let lastBet = fetchedDataToday.map((item, i) => {
            if ( i < 5 && item.plus === 'Neg' ) {
                return lastFive.push(item)
            }
            if ( i < 10 && item.plus === 'Neg' ) {
                return lastTen.push(item)
            }
        })

        if ( lastFive.length === 5 ) {
            setModalWarning([true, 5])
        }

        if ( lastTen.length === 10 ) {
            setModalWarning([true, 10])
        }

    }, [token, request])

    useEffect(() => {
        getLink()
    }, [getLink])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const addCategory = async () => {
        if (newCategory !== '') {
            try {
                const data = await request('/api/category/add', 'POST', { name: newCategory }, {
                    Authorization: `Bearer ${auth.token}`
                })
                setCategory(newCategory)
                setNewCategory('')
                getLink()
                toggle()
            } catch (e) { }
        }
    }

    const cancelAddCategory = () => {
        setNewCategory('')
        toggle()
    }

    const handleChangeNewData = async () => {
        const categoryId = options.filter(item => item.name === category)
        try {
            const data = await request('/api/categoryDate/add', 'POST', { ...formInput, categoryId: categoryId[0]._id }, {
                Authorization: `Bearer ${auth.token}`
            })
            setModalAdd(!modalAdd)
            setFormInput({
                date: new Date(),
                time: format(new Date(), `hh:mmb`),
                bet: '',
                coef: '',
                plus: '',
                sum: ''
            })
            getAllData()
        } catch (e) { }
    }

    const handleRemoveData = (id) => {
        setRemoveData(id)
        toggleInfo()
    }

    const removeDataId = async () => {
        try {
            const data = await request(`/api/categoryDate/delete/${removeData}`, 'DELETE', {
                Authorization: `Bearer ${auth.token}`
            })
            setRemoveData('')
            toggleInfo()
            setLoading(true)
            getAllData()
        } catch (e) { }
    }

    const handleEditData = (id) => {
        setEditData(id)
        let editData = optionsData.filter((item) => {
            if (item._id === id) {
                setFormInput({
                    date: new Date(),
                    time: item.time,
                    bet: item.bet,
                    coef: item.coef,
                    plus: item.plus,
                    sum: item.sum
                })
            }
        })
        toggleEdit()
    }

    const editDataId = async () => {
        try {
            const data = await request('/api/categoryDate/edit', 'PUT', { ...formInput, _id: editData }, {
                Authorization: `Bearer ${auth.token}`
            })
            setModalEdit(!modalEdit)
            setFormInput({
                date: new Date(),
                time: format(new Date(), `hh:mmb`),
                bet: '',
                coef: '',
                plus: '',
                sum: ''
            })
            setEditData('')
            getAllData()
        } catch (e) { }
    }

    const cancelRemoveDataId = () => {
        setRemoveData('')
        toggleInfo()
    }

    const sumAllData = () => {
        return optionsData.length ? optionsData.reduce((acc, item) => acc + item.sum, 0) : 0
    }

    return (
        <div className="row create-page">
            <h1>You can win in this game!!!</h1>
            <div className="add-data">
                <div className="add-data-item">
                    <div className="input-field col s6">
                        <Dropdown
                            options={options}
                            category={category}
                            setCategory={setCategory}
                            addCategory={addCategory}
                            modal={modal}
                            setModal={setModal}
                        />
                        <ModalCat
                            modal={modal}
                            toggle={toggle}
                            newCategory={newCategory}
                            setNewCategory={setNewCategory}
                            addCategory={addCategory}
                            cancelAddCategory={cancelAddCategory}
                        />
                    </div>
                </div>
                <div className="add-data-item">
                    <Button
                        style={{ borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}
                        onClick={toggleAdd}
                        disabled={category !== "" ? false : true}
                    >
                        <i className="material-icons">add</i>
                    </Button>
                    <ModalAdd
                        modal={modalAdd}
                        setModal={setModalAdd}
                        toggle={toggleAdd}
                        handleChangeNewData={handleChangeNewData}
                        formInput={formInput}
                        setFormInput={setFormInput}
                    />
                    <ModalEdit
                        modal={modalEdit}
                        setModal={setModalEdit}
                        toggle={toggleEdit}
                        saveEditData={editDataId}
                        formInput={formInput}
                        setFormInput={setFormInput}
                    />
                </div>
            </div>
            <div className="add-data-result">
                <span
                    style={{ color: sumAllData().toFixed(2) > 0 ? 'green' : '#dc3545', fontWeight: 'bold' }}
                >
                    {
                        optionsData.length &&
                        sumAllData().toFixed(2)
                    }
                </span>
            </div>
            <div className="add-data-result" style={{ width: '50%' }}>
                <span
                    style={{ color: sumAllData().toFixed(2) > 0 ? 'green' : '#dc3545', fontWeight: 'bold' }}
                >
                    {
                        sumAllData().toFixed(2) > 0 ?
                            'Its a good result, but you can more and better' :
                            'You need more concentration and fewer bets'
                    }
                </span>
            </div>
            <div className="add-data-tables">
                {
                    loading ?
                        <Loader />
                        :
                        <TablesData
                            optionsData={optionsData}
                            handleRemoveData={handleRemoveData}
                            handleEditData={handleEditData}
                        />
                }
                <ModalInfo
                    modal={modalInfo}
                    toggle={toggleInfo}
                    removeDataId={removeDataId}
                    cancelRemoveDataId={cancelRemoveDataId}
                />
                <ModalWarning
                    modal={modalWarning}
                    toggle={toggleWarning}
                />
            </div>
        </div>
    )
}