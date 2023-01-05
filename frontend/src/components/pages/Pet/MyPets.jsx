import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import useFlashMessage from '../../../hooks/useFlashMessage';
import RoundedImage from '../../layouts/RoudedImage';
import api from '../../../utils/api';
import './Dashboard.css';

function MyPets(){
	const [pets,setPets] = useState([])
	const [token] = useState(localStorage.getItem('token') || "");
	const {setFlashMessage} = useFlashMessage();
	useEffect(() => {
		api.get('/pets/mypets', {
			headers: {
				Authorization: JSON.parse(token),
			}
		})
			.then((response) => {
				setPets(response.data.pets);
			})
	}, [token]);

	async function handleRemove(id){

		let msgType = 'success';
		const data = await api.delete(`/pets/${id}`, {
			headers: {
				Authorization: JSON.parse(token),
			}
		})
			.then((response) => {
				const updatedPets = pets.filter((pet) => pet._id !== id);
				setPets(updatedPets);
				return response.data;
			})
			.catch((error) => {
				msgType = 'error';
				return error.response.data;
			})
			setFlashMessage(data.message, msgType);	
	}

	async function handleConclude(id){
		let msgType = 'success';
		const data = await api.patch(`/pets/conclude/${id}`, {
			headers: {
				Authorization: JSON.parse(token),
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
	}

	return (
		<section>
			<div className="petslist_header">
				<h1>Meus Pets</h1>
				<Link to={'/pet/add'}>Cadastrar Pet</Link>
			</div>
			<div className="petslist_container">
				{pets.length > 0 && (
					pets.map((pet) => (
						<div key={pet._id} className='petlist_row'>
							<RoundedImage src={`http://localhost:5000/images/pets/${pet.images[0]}`} alt={pet.name} width="px75"/>
							<span className="bold">{pet.name}</span>
							<div className="actions">
								{pet.available ? (
									<>
										{pet.adopter && (
											<button className='conclude_btn' onClick={() => handleConclude(pet._id)}>Concluir adoção</button>
										)}
										<Link to={`/pet/edit/${pet._id}`}>Editar</Link>
										<button onClick={() => {handleRemove(pet._id)}}>Excluir</button>
									</>
								) : (
									<p>Pet já adotado</p>
								)}
							</div>
						</div>
					))
				)}
				{pets.length == 0 && <p>Nenhum pet cadastrado</p>}
			</div>
		</section>
	)
}

export default MyPets;