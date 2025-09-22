

import axios from "axios";
import React, { useState } from "react";
import baseURL from "../utils/baseURL";

import useToast from "../hooks/useToast";
import { z } from "zod";
import {  useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const { onSuccess, onError } = useToast()

    const submitEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {

        e.preventDefault()
        try {
            if (!email) {
                onError("Pas d'email entré")
                return
            }
            const isEmail = z.string().email(`Ce n'est pas un email valide`)
            const validationResult = isEmail.safeParse(email);
            if (!validationResult.success) {
                onError(`Ce n'est pas un email valide`);
                return
            }
            const response = await axios.post(`${baseURL}/auth/forgot-password`,
                { email },
            );
            if (response.status === 200) {
                onSuccess("Si l'email existe dans la base de donénes vous recevrez un mail avec les instructions à suivre")
            }
            navigate('/')
        } catch (error: any) {
            onError(error)
        }
    }

    const modifyEmail = (e: any) => {
        setEmail(e.target.value)

    }
    return (

        <div className="password_forgot">
            <h1>Mot de passe oublié</h1>
            <form action="">
                <input type="text" value={email} name="email" placeholder="Votre email" onChange={e => modifyEmail(e)} />
                <button onClick={(e) => submitEmail(e)}>Envoyer</button>
            </form>
        </div>
    )

}

export default ForgotPassword;