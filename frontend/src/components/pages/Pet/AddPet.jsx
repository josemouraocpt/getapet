import './AddPet.css';
import api from '../../../utils/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFlashMessage from '../../../hooks/useFlashMessage';
import PetForm from '../../form/PetForm';

function AddPet(){
	const [token] = useState(localStorage.getItem('token') || '');
	const {setFlashMessage} = useFlashMessage();
	const navigate = useNavigate();

	async function addPet(pet){
		let msgType = 'success';
		const formData = new FormData();

		console.log(pet);
		const petFormData = await Object.keys(pet).forEach((key) => {
			if(key === 'images'){
				for(let i = 0; i < pet[key].length; i++){
					formData.append('images', pet[key][i]);
				}
			} else{
				formData.append(key, pet[key]);
			}
		});
		formData.append('pet', petFormData);
		const data = await api.post('/pets/singup', formData, {
			headers:{
				Authorization: JSON.parse(token),
				'Content-Type': 'multipart/form-data' 
			}
		})
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				msgType = 'error';
				return error.response.data;
			})

			setFlashMessage(data.message, msgType);
			if(msgType !== 'error'){
				navigate('/pet/mypets')
			}
	};

	return (
		<section>
			<div className='addpet_header'>
				<h1>Cadastre um Pet</h1>
				<p>Depois ele ficará disponível para adoção.</p>
			</div>
			<PetForm btnText="Cadastrar Pet" handleSubmit={addPet}/>
		</section>
	)
}

export default AddPet;