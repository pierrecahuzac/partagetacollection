// import axios from "axios";
import { createRef, useState } from "react";
import { useNavigate } from "react-router";
import ReCAPTCHA from "react-google-recaptcha";
import useToast from "../hooks/useToast";
import { useAuth } from "../context/authContext";
import { loginUser, submitUser } from "../services/auth.service";

const Signup = () => {
    const navigate = useNavigate()
    const { setIsConnected } = useAuth();
    // const protocol: string = import.meta.env.VITE_API_PROTOCOL;
    // const domain: string = import.meta.env.VITE_API_DOMAIN;
    // const port: string = import.meta.env.VITE_API_PORT;
    const { onSuccess } = useToast()
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        passwordConfirmation: '',
        username: ''
    })

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setCredentials((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmitUser = async (e: any) => {
        try {
            const response = await submitUser(e, credentials)
            console.log(response);
            if (response?.status === 201) {
                onSuccess("Utilisateur créé avec succès")
                const userConnected = await loginUser(credentials);
                console.log(userConnected);
                if (userConnected?.status === 200) {
                    onSuccess("Utilisateur connecté avec succès")
                    setIsConnected(true)
                    localStorage.setItem("isConnected", "true");
                    navigate("/homepage")
                }
            }
        } catch (error) {
            console.log(error)
        }

    }
    // const onChangeCaptcha = (value: any) => {
    //     //@ts-ignore
    //     const recaptchaValue = recaptchaRef.current.getValue();
    //      //@ts-ignore

    //     console.log("Captcha changed", value,recaptchaValue);
    // }
    const recaptchaRef = createRef();
    // console.log("ReCAPTCHA Key:", import.meta.env.VITE_CAPTCHA_KEY_PUBLIC);
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 font-quicksand">
                        Créer son compte
                    </h2>
                </div>
                <form action="submit"
                    onSubmit={e => handleSubmitUser(e)}
                    className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-lg">
                    <div>
                        <label htmlFor="" className="block text-sm font-medium text-gray-700 font-quicksand">Email</label>
                        <input type="text" name="email" id="email" value={credentials.email} onChange={handleInputChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="" className="block text-sm font-medium text-gray-700 font-quicksand">Nom d'utilisateur</label>
                        <input className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" type="text" name="username" id="username" value={credentials.username} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="" className="font-quicksand">Mot de passe</label>
                        <input type="password" name="password" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" id="password" value={credentials.password} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="" className="font-quicksand">Confirmation du mot de passe</label>
                        <input type="password" name="passwordConfirmation" id="confirmationPassword" value={credentials.passwordConfirmation} onChange={handleInputChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <button type="button" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 font-quicksand"
                        onClick={handleSubmitUser}
                    >Connexion</button>
                    {/* <ReCAPTCHA className="flex justify-center"
                        sitekey={import.meta.env.VITE_CAPTCHA_KEY_PUBLIC}
                        // onChange={onChangeCaptcha}
                    /> */}
                </form>
            </div>
        </div>
    )

}

export default Signup