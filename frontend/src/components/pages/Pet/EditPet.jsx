import { useState, useEffect } from "react";
import api from "../../../utils/api";
import './AddPet.css';
import PetForm from "../../form/PetForm";
import useFlashMessage from '../../../hooks/useFlashMessage';
import { useParams } from "react-router-dom";

function EditPet(){
	const [pet, setPet] = useState({})
	const [token] = useState(localStorage.getItem('token') || "");
	const {setFlashMessage} = useFlashMessage();
	const {id} = useParams();
	useEffect(() =>{
		api.get(`/pets/${id}`, {
			headers: {
				Authorization: JSON.parse(token),
			}
		})
			.then((response) => {setPet(response.data.pet)})
	},[token, id]);

	async function editPet(pet){
		let msgType = 'success';
		const formData = new FormData();
		const petFormData = await Object.keys(pet).forEach((key) => {
			if(key === 'images'){
				for(let i = 0; i < pet[key].length; i++){
					formData.append('images', pet[key][i]);
				}
			} else{
			formData.append(key, pet[key])
			}
		});
		formData.append('pet', petFormData)

		console.log(formData)

		const data = await api.patch(`/pets/${pet._id}`, formData, {
			headers: {
				Authorization: JSON.parse(token),
				'Content-Type': 'multipart/form-data',
			}
		})
			.then(response => {return response.data})
			.catch((error) => { 	
				msgType = 'error'; 
				return error.response.data
			}); 
			setFlashMessage(data.message, msgType);
	}
	return (
		<section>
			<div className="addpet_header">
				<h1>Editando o Pet: {pet.name}</h1>
			</div>
			{pet.name && (
					<PetForm btnText="Editar Pet" handleSubmit={editPet} petData={pet}/>
				)}
		</section>
	)
}

export default EditPet;