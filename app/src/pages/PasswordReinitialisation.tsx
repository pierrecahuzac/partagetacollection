import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import baseURL from "../utils/baseURL";
import '../styles/passwordReinialisation.scss'
import axios from "axios"

const PasswordReinitialisation = () => {
    const location = useLocation()
    const locationParams = location.search;
    const token = locationParams.replace('?', '')
    console.log(token);

    const [password, setPassword] = useState({
        newPassword: '',
        newPasswordConfirmation: ""
    })

    useEffect(() => {
        tokenIsInDBAndValid()
    }, [])

    const tokenIsInDBAndValid = async () => {
        try {
            const response = await axios.post(`${baseURL}/token/token-password-validation/${token}`);
            console.log(response);

        } catch (error) {

        }
    }
    const changePasswords = (e: any) => {
        e.preventDefault()
        const { name, value } = e.target
        console.log(name, value);
        setPassword(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const submitNewPassword = (e: React.FormEvent): void => {
        e.preventDefault()
    }
    return (
        <div className="password-reinialisation">
            <form action="" className="password-reinialisation__form">
                <div>
                    <label htmlFor="">Nouveau mot de passe
                        <input type="password" name="new-password" value={password.newPassword} onChange={e => changePasswords(e)} />
                    </label>
                </div>
                <div>
                    <label htmlFor="">Confirmation du nouveau mot de passe
                        <input type="password" name="new-password-confirmation" value={password.newPasswordConfirmation} onChange={e => changePasswords(e)} />
                    </label>
                </div>

                <button onClick={e => submitNewPassword(e)}>Changer le mot de passe</button>
            </form>
        </div>
    )

}

export default PasswordReinitialisation