import React, { useState, useEffect, useContext, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../hooks/http.hooks'
import { AuthContext } from '../context/AuthContext.js'
import { format } from 'date-fns'
import { Button } from 'reactstrap'

import { Dropdown } from '../components/Dropdown'
import { ModalCat } from '../components/ModalCat'
import { ModalAdd } from '../components/ModalAdd'
import { ModalInfo } from '../components/ModalInfo'
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
    const [modalAdd, setModalAdd] = useState(false)
    const [modalInfo, setModalInfo] = useState(false)
    const [removeData, setRemoveData] = useState('')
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
    const toggleInfo = () => setModalInfo(!modalInfo)

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

    const cancelRemoveDataId = () => {
        setRemoveData('')
        toggleInfo()
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
                </div>
            </div>
            <div className="add-data-tables">
                {
                    loading ?
                        <Loader />
                        :
                        <TablesData
                            optionsData={optionsData}
                            handleRemoveData={handleRemoveData}
                        />
                }
                <ModalInfo
                    modal={modalInfo}
                    toggle={toggleInfo}
                    removeDataId={removeDataId}
                    cancelRemoveDataId={cancelRemoveDataId}
                />
            </div>
        </div>
    )
}