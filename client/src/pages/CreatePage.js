import React, { useState, useEffect, useContext, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../hooks/http.hooks'
import { AuthContext } from '../context/AuthContext.js'

import { Dropdown } from '../components/Dropdown'
import { ModalCat } from '../components/ModalCat'

import './CreatePage.css'

export const CreatePage = () => {
    const { token } = useContext(AuthContext)
    const history = useHistory()
    const auth = useContext(AuthContext)
    const { request } = useHttp()
    const [options, setOptions] = useState([])
    const [category, setCategory] = useState('')
    const [newCategory, setNewCategory] = useState('')
    const [form, setForm] = useState([])
    const [modal, setModal] = useState(false)

    const toggle = () => setModal(!modal)

    const getLink = useCallback(async () => {
        try {
            const fetched = await request('/api/category/all', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setOptions(fetched)
        } catch (e) { }
    }, [token, request])

    useEffect(() => {
        getLink()
    }, [getLink])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    // const pressHandler = async event => {
    //     if (event.key === 'Enter') {
    //         try {
    //             const data = await request('/api/link/generate', 'POST', { from: link }, {
    //                 Authorization: `Bearer ${auth.token}`
    //             })
    //             history.push(`/detail/${data.link._id}`)
    //         } catch (e) { }
    //     }
    // }

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
                    <div className="input-field col s6">
                        {/* <input onKeyPress={addCategory} value="Alvin" id="first_name2" type="text" className="validate" />
                        <label className="active" for="first_name2">Add category</label> */}
                    </div>
                    <div className="input-field col s6">
                        {/* <input onKeyPress={addCategory} value="Alvin" id="first_name2" type="text" className="validate" />
                        <label className="active" for="first_name2">First Name</label> */}
                    </div>
                </div>
                <div className="add-data-item">
                    <button disabled={form.length > 0 ? false : true}>
                        <i className="material-icons">add</i>
                    </button>
                </div>

            </div>
            {/* <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
                <input
                    placeholder="Вставьте ссылку"
                    id="link"
                    type="text"
                    value={link}
                    onChange={e => setLink(e.target.value)}
                    onKeyPress={pressHandler}
                />
                <label htmlFor="link">Вставьте ссылку</label>
            </div> */}
        </div>
    )
}