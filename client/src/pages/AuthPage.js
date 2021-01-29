import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hooks'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext.js'
import { Row, Input, Button } from 'reactstrap'

import './AuthPage.css'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const { loading, error, request, clearError } = useHttp()
    const message = useMessage()
    const [form, setForm] = useState({
        email: '', password: ''
    })
    const [checkedLogin, setCheckedLogin] = useState(false)

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const changeBack = () => {
        setForm({ email: '', password: '' })
        setCheckedLogin(false)
    }

    const checkLogin = async () => {
        try {
            const data = await request('/api/auth/checkLogin', 'POST', { ...form })
            setCheckedLogin(data.user)
            message(data.message)
        } catch (e) { }
    }

    // const registerHandler = async () => {
    //     try {
    //         const data = await request('/api/auth/register', 'POST', { ...form })
    //         message(data.message)
    //     } catch (e) { }
    // }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            auth.login(data.token, data.userId)
        } catch (e) { }
    }

    console.log(form.password === '')

    return (
        <div className="auth-page">
            <div className="auth-page-card">
                {
                    !checkedLogin &&
                    <>
                        <h4>
                            Write down your email
                        </h4>
                        <Input
                            style={{ width: '50%' }}
                            type="email"
                            name="email"
                            placeholder='email'
                            onChange={changeHandler}
                        />
                        <Button
                            disabled={form.email === '' ? true : false}
                            style={{ border: form.email === '' && 'none', width: '10%' }}
                            onClick={checkLogin}
                        >
                            Go!
                        </Button>
                    </>
                }
                {
                    checkedLogin === 'exists' &&
                    <>
                        <h4>
                            Write down your password
                        </h4>
                        <Input
                            style={{ width: '50%' }}
                            type="password"
                            name="password"
                            placeholder='password'
                            onChange={changeHandler}
                        />
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
                            <Button
                                onClick={changeBack}
                            >
                                Back!
                            </Button>
                            <Button
                                style={{ border: form.password === '' && 'none', width: '30%' }}
                                disabled={form.password === '' ? true : false}
                                onClick={loginHandler}
                            >
                                Go!
                            </Button>
                        </Row>
                    </>
                }
                {
                    checkedLogin === 'none' &&
                    <>
                        <h4>
                            You not registration
                        </h4>
                        <p>
                            You can write to me on <a href='https://www.facebook.com/vasso.yakushin'>FB</a> or <a href='https://vk.com/vasoyakushin103'>VK</a>
                        </p>
                        <Button
                            disabled={form.email === '' ? true : false}
                            style={{ border: form.email === '' && 'none', width: '15%' }}
                            onClick={changeBack}
                        >
                            Back!
                        </Button>
                    </>
                }

            </div>
        </div>
        // <div className="row">
        //     <div className="col s6 offset-s3">
        //         <h1>Сократи Ссылку</h1>
        //         <div className="card blue darken-1">
        //             <div className="card-content white-text">
        //                 <span className="card-title">Авторизация</span>
        //                 <div>
        //                     <div className="input-field">
        //                         <input
        //                             placeholder="Введите Email"
        //                             id="email"
        //                             type="text"
        //                             name="email"
        //                             className="yellow-input"
        //                             value={form.email}
        //                             onChange={changeHandker}
        //                         />
        //                         <label htmlFor="email">Email</label>
        //                     </div>
        //                     <div className="input-field">
        //                         <input
        //                             placeholder="Введите пароль"
        //                             id="password"
        //                             type="password"
        //                             name="password"
        //                             className="yellow-input"
        //                             value={form.password}
        //                             onChange={changeHandker}
        //                         />
        //                         <label htmlFor="password">Пароль</label>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="card-action">
        //                 <button
        //                     className="btn yellow darken-4"
        //                     style={{ marginRight: 10 }}
        //                     onClick={loginHandler}
        //                     disabled={loading}
        //                 >
        //                     Войти
        //                 </button>
        //                 <button
        //                     className="btn grey lighten-1 black-text"
        //                     onClick={registerHandler}
        //                     disabled={loading}
        //                 >
        //                     Регистрация
        //                 </button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}