import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";


const Signin = () => {
    const { setIsConnected } = useAuth();
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
                localStorage.setItem('isConnected', "true")
                setIsConnected(true)
                navigate("/homepage")


            }
        } catch (error: any) {
            console.log(error);
        }
    }
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 font-quicksand">
                        Connexion
                    </h2>
                </div>
                <form className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-lg" onSubmit={submitUser}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 font-quicksand">
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={credentials.email}
                                    onChange={handleInputChange}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 font-quicksand">
                                Mot de passe
                            </label>
                            <div className="mt-1">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={credentials.password}
                                    onChange={handleInputChange}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 font-quicksand"
                        >
                            Se connecter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Signin