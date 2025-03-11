import { useEffect } from 'react'
import './createCollection.scss'
import axios from 'axios'

const CreateCollection = () => {
    const protocol = import.meta.env.VITE_API_PROTOCOL;
    const domain = import.meta.env.VITE_API_DOMAIN;
    const port = import.meta.env.VITE_API_PORT;
    useEffect(() => {
        const fetchDatas = async () => {
            console.log('fetchDatas')
            const response = await axios.get(`${protocol}://${domain}:${port}/api/tags`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            console.log(response);

        }
        fetchDatas()
    }, [])
    return (
        <div className='create-collection'>
            <form action="">
                <div className=''><label htmlFor="">Titre</label>
                    <input type="text" name="title" /></div>
                <div className=''>  <label htmlFor="">Description</label>
                    <input type="text" name="description" /></div>
                <div className=''>  <label htmlFor="">Description</label>
           
                    <label htmlFor="">Catégorie(s)</label>
                    <select name="" id="">
                        <option value="">Livres</option>
                        <option value="">CD</option>
                        <option value="">Vinyles</option>
                        <option value="">Timbres</option>
                    </select></div>
            </form>
        </div>
    )
}

export default CreateCollection