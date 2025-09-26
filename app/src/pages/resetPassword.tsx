import { ChangeEvent, FormEvent, useState } from "react"
import axios from "axios"
import {  useLocation, useNavigate } from "react-router-dom"
import useToast from "../hooks/useToast";
import baseURL from "../utils/baseURL";
// import Button from "../components/ui/button";

import '../styles/resetPassword.scss'

const ResetPassword = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const { onSuccess, onError, } = useToast()
    const token = (searchParams.get('token'));
 
    const navigate = useNavigate()
    const [userInfos, setUserInfos] = useState({
        newPassword: '',
        newPasswordConfirmation: "",
        email: ''
    })

    const changePasswords = (e: ChangeEvent<HTMLInputElement>): void => {

        e.preventDefault()
        const { name, value } = e.target
    
        setUserInfos(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const submitNewPassword = async (e: FormEvent): Promise<unknown> => {
        e.preventDefault()
        if (userInfos.newPassword !== userInfos.newPasswordConfirmation) {
            onError('Les mots de passes sont différents')
            return
        }
        const response = await axios.post(`${baseURL}/auth/reset-password`, { userInfos, token }, {
            withCredentials: true
        })
        
        if (response.status !== 200) {
            onError(`Une erreur c'est produite pendant la modification du mot de passe`)
            return
        }
        onSuccess(`Mot de passe changé avec succès`)
        navigate('/signin')
    }
    return (
        <div className="password-reset">
            <form action="" className="password-reset__form">
                <div>
                    <label htmlFor="">Email
                        <input type="email" name="email" value={userInfos.email} onChange={e => changePasswords(e)} />
                    </label>
                </div>
                <div>
                    <label htmlFor="">Nouveau mot de passe
                        <input type="password" name="newPassword" value={userInfos.newPassword} onChange={e => changePasswords(e)} />
                    </label>
                </div>
                <div>
                    <label htmlFor="">Confirmation du nouveau mot de passe
                        <input type="password" name="newPasswordConfirmation" value={userInfos.newPasswordConfirmation} onChange={e => changePasswords(e)} />
                    </label>
                </div>

                <button onClick={e => submitNewPassword(e)}>Changer le mot de passe</button>
            </form>
        </div>
    )

}

export default ResetPassword