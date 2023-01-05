import api from '../../utils/api';
import {Link} from 'react-router-dom';
import { useState, useEffect } from "react";
import './Home.css';

function Home(){
	const [pets, setPets] = useState([]);

	useEffect(()=> {
		api.get('/pets')
			.then((response) => {
				setPets(response.data.pets);
			})
	}, []);

	return (
		<section>
			<div className='pet_home_header'>
				<h1>Adote um Pet</h1>
				<p>Veja os detalhes de cada um e veja o tutor deles</p>
			</div>
			<div className='pet_container'>
				{pets.length > 0 && (
					pets.map((pet) => (
						<div className='pet_card' key={pet._id}>
							<div className='pet_card_image' style={{backgroundImage: `url(http://localhost:5000/images/pets/${pet.images[0]})`}}></div>
							<h3>{pet.name}</h3>
							<p><span className='bold'>Peso: </span>{pet.weight}kg</p>
							{pet.available ? (
								<Link to={`pet/${pet._id}`}>Mais detalhes</Link>
							) : (
								<p className='adopted_text'>Adotado!</p>
							)}
						</div>
					))
				)}
				{pets.length === 0 && (
					<p>Não há pets cadastrados, ou disponiveis para adoção no momento!</p>
				)}
			</div>
		</section>
	)
}

export default Home;