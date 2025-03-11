import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";


const Signin = () => {

    const navigate = useNavigate()
    const protocol: string = import.meta.env.VITE_API_PROTOCOL;
    const domain: string = import.meta.env.VITE_API_DOMAIN;
    const port: string = import.meta.env.VITE_API_PORT;
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setCredentials((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const submitUser = async (e: any) => {
        e.preventDefault()
        const body = {
            email: credentials.
                email,
            password: credentials.password
        }
        // Ford54@yahoo.com
        // m0FZkY4rsM_PRHZ
        try {
            const response = await axios.post(`${protocol}://${domain}:${port}/auth/signin`,
                body,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            )
            console.log(response);
            
            const { message } = response.data

            if (message === "User connected") {
                localStorage.setItem('isConnected', true)
                navigate("/")


            }
        } catch (error: any) {
            console.log(error);
        }
    }
    return (
        <div className="w-full h-full flex-col justify-center align-middle">
            <form action="submit"
                onSubmit={submitUser}
                className="bg-red-200 w-2/3 m-auto h-2/3 flex-col p-8  m-8 justify-center align-middle">
                <div>
                    <label htmlFor="">Email</label>
                    <input type="text" name="email" id="email" value={credentials.email} onChange={handleInputChange} className="form_imput-email" /></div>
                <div>
                    <label htmlFor="">Mot de passe</label>
                    <input type="password" name="password" id="password" value={credentials.password} onChange={handleInputChange} className="form_imput-password" /></div>
                <button type="button" className="bg-blue-600 rounded-sm text-white hover:text-black hover:bg-blue-700 px-4 py-2 m-2"
                    onClick={submitUser}
                >Connexion</button>
            </form></div>
    )

}

export default Signin