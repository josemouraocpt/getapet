import { useState, useEffect } from "react";
import api from '../../../utils/api';
import './Dashboard.css';
import RoundedImage from '../../layouts/RoudedImage';
import useFlashMessage from '../../../hooks/useFlashMessage';

function MyAdoptions(){
	const [pets, setPets] = useState({});
	const [token] = useState(localStorage.getItem('token') || "");
	const {setFlashMessage} = useFlashMessage();

	useEffect(()=>{
		api.get('/pets/myadoptions', {
			headers: {
				Authorization: JSON.parse(token),
			}
		})
		.then((response) => {
			setPets(response.data.pets);
		})
	}, [token]);


	return(
		<section>
			<div className="petlist_header">
				<h1>Minhas Adoções</h1>
			</div>
			<div className="petlist_container">
				{pets.length > 0 && (
					pets.map((pet) => (
						<div key={pet._id} className='petlist_row'>
							<RoundedImage src={`http://localhost:5000/images/pets/${pet.images[0]}`} alt={pet.name} width="px75"/>
							<span className="bold">{pet.name}</span>
							<div className="contacts">
								<p>
									<span className="bold">Ligue para: </span> {pet.user.phone}
								</p>
								<p>
									<span className="bold">Fale com: </span> {pet.user.name}
								</p>
							</div>
							<div className="actions">
								{pet.available ? (
									<p>Adoção em processo</p>
								) : (
									<p>Parabéns por concluir a adoção!</p>
								)}
							</div>
						</div>
					))
				)}
				{pets.length === 0 && (
					<p>Ainda não há adoções de Pets</p>
				)}
			</div>
		</section>
	)
}

export default MyAdoptions