import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router";


const Homepage = () => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
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
            const response = await axios.post('http://localhost:3001/auth/signin',
                body,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            )
            const { message } = response.data
            console.log(message)
            if (message === "User connected") {
                navigate("/dashboard")

            }
        } catch (error: any) {
            console.log(error);

            //    throw new Error(error)
        }
    }
    return (
        <div>
            <h1 className="text-red-600 font-bold">Landing Page
            </h1>

            Connexion
            <form action="" onSubmit={submitUser}>
                <input type="text" name="email" id="email" value={credentials.email} onChange={handleInputChange} className="form_imput-email" />
                <input type="password" name="password" id="password" value={credentials.password} onChange={handleInputChange} className="form_imput-password" />
                <button type="button" className="form_submit-button"
                    onClick={submitUser}
                >Connexion</button>
            </form>
        </div>
    )
}

export default Homepage