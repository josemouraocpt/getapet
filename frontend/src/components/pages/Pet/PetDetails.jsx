import './PetDetails.css';
import { useState, useEffect } from "react";
import api from '../../../utils/api';
import { useParams, Link } from "react-router-dom";
import useFlashMessage from '../../../hooks/useFlashMessage';

function PetDetails(){
	const [pet, setPet] = useState({});
	const [token] = useState(localStorage.getItem('token') || "");
	const {id} = useParams();
	const {setFlashMessage} = useFlashMessage();

	useEffect(()=>{
		api.get(`/pets/${id}`)
			.then((response) => {
				setPet(response.data.pet);
			})
	}, [id]);

	async function schedule(){

		let msgType = 'success';

		const data = await api.patch(`pets/schedule/${pet._id}`, {
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
		setFlashMessage(data.message, msgType)
	}

	return(
		<>
			{pet.name && (
				<section className='pet_details_container'>
					<div className='petdetails_header'>
						<h1>Conhecendo o Pet: {pet.name}</h1>
						<p>Se tiver interesse marque uma visita para  conhecê-lo</p>
					</div>
					<div className='pet_images'>
						{pet.images.map((image, index) => (
							<img src={`http://localhost:5000/images/pets/${image}`} alt={pet.name} key={index}/>
						))}
					</div>
					<p>
						<span className="bold">Peso: </span> {pet.weight}kg
					</p>
					<p>
						<span className="bold">Idade: </span> {pet.age} anos
					</p>
					{token ? (
						<button onClick={schedule}>Solicitar uma visita</button>
					): (
						<p>Você precisa <Link to={'/singup'}> criar uma conta</Link> para solicitar a visita!</p>
					)}
				</section>
			)}
		</>
	)
}

export default PetDetails