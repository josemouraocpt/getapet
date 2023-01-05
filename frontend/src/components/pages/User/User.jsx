import './User.css';
import '../../form/Form.css';
import Input from '../../form/Input';
import { useState, useEffect } from 'react';
import api from '../../../utils/api';
import useFlashMessage from '../../../hooks/useFlashMessage';
import RoundedImage from '../../layouts/RoudedImage';

function User(){
	const [user, setUser] = useState({});
	const [preview, setPreview] = useState();
	const [token] = useState(localStorage.getItem('token') || '');
	const {setFlashMessage} = useFlashMessage();

	useEffect(() => {
		api.get('/users/checkuser', {
			headers: {
				Authorization: JSON.parse(token),
			}
		})
			.then(response => {
				setUser(response.data);
			})
	}, [token])

	function onFileChange(e){
		setPreview(e.target.files[0])
		setUser({ ...user, [e.target.name]: e.target.files[0] });
	};

	function handleChange(e){
		setUser({ ...user, [e.target.name]: e.target.value });
	}

	async function handleSubmit(e){
		e.preventDefault();
		let msgType = 'success';
		const formData = new FormData();

		const userFormData = await Object.keys(user).forEach((key) => {
			formData.append(key, user[key])
		});

		const data = await api.patch(`/users/edit/${user._id}`, formData, {
			headers :{
				Authorization: JSON.parse(token),
				'Content-Type': 'multipart/form-data'
			}
		})
			.then(response => {
				return response.data
			})
			.catch(error => {
				msgType = 'error';
				console.log(error)
				return error.response.data
			})
		setFlashMessage(data.message, msgType)
	}

	return (
		<section>
			<div className='profile_header'>
				<h1>Perfil</h1>
				<p>{ (user.image || preview) && (
					<RoundedImage src={preview ? URL.createObjectURL(preview) : `http://localhost:5000/images/users/${user.image}`} alt={user.name} />
				) }</p>
			</div>
			<form className='form_container' onSubmit={handleSubmit}>
				<Input text="Imagem" type="file" name="image" handleOnChange={onFileChange}/>

				<Input text="E-mail" type="email" name="email" placeholder="Digite o seu e-mail" handleOnChange={handleChange} value={user.email || ''}/>

				<Input text="Nome" type="text" name="name" placeholder="Digite o seu nome" handleOnChange={handleChange} value={user.name || ''}/>

				<Input text="Telefone" type="text" name="phone" placeholder="Digite o seu telefone" handleOnChange={handleChange} value={user.phone || ''}/>

				<Input text="Senha" type="password" name="password" placeholder="Digite a sua senha" handleOnChange={handleChange}/>

				<Input text="Confirmação de senha" type="password" name="confirmpassword" placeholder="Digite a sua confirmação de senha" handleOnChange={handleChange}/>	

				<input type="submit" value="Editar" />

			</form>
		</section>
	)
}

export default User;