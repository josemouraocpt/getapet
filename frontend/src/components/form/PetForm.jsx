import './Form.css'
import { useState } from 'react';
import Input from './Input';
import Select from './Select';

function PetForm({handleSubmit, petData, btnText}){
	const [pet, setPet] = useState(petData || {});
	const [preview, setPreview] = useState([]);
	const colors = ['Branco', 'Preto', 'Caramelo'];

	function onFileChange(e){
		setPreview(Array.from(e.target.files));
		setPet({...pet, images: [...e.target.files]});
	};

	function handleChange(e){
		setPet({...pet, [e.target.name]: e.target.value});
	};

	function handleColor(e){
		setPet({...pet, color: e.target.options[e.target.selectedIndex].text});
	};

	function submit(e){
		e.preventDefault();
		handleSubmit(pet);
	}

	return(
		<form className={'form_container'} onSubmit={submit}>
			<div className="preview_pet_images">
				{preview.length > 0 ? preview.map((img, index) => (
					<img src={URL.createObjectURL(img)} alt={pet.name} key={`${pet.name} + ${index}`}></img>
				)) : pet.images && pet.images.map((img, index) => (
					<img src={`http://localhost:5000/images/pets/${img}`} alt={pet.name} key={`${pet.name} + ${index}`}></img>
					))}
			</div>
			<Input text="Imagens do Pet" type="file" name="images" handleOnChange={onFileChange} multiple={true}/>
			<Input text="Nome" type="text" name="name" handleOnChange={handleChange} placeholder="Digite o nome do pet" value={pet.name || ''}/>
			<Input text="Idade" type="number" name="age" handleOnChange={handleChange} placeholder="Digite a idade do pet" value={pet.age || ''}/>
			<Input text="Peso" type="number" name="weight" handleOnChange={handleChange} placeholder="Digite o peso do pet" value={pet.weight || ''}/>
			<Select text="Selecione a cor do Pet" name="color" options={colors} handleOnChange={handleColor} value={pet.color || ''}/>
			<input type="submit" value={btnText} />
		</form>
	)
}

export default PetForm;