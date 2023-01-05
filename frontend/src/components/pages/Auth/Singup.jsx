import { useState, useContext } from 'react';
import {Link} from 'react-router-dom';
import Input from "../../form/input";
import '../../form/Form.css';
import { Context } from '../../../context/UserContext';

function Singup(){
	const [user, setUser] = useState({});
	const { singup }  = useContext(Context);

	function handleChange(e){
		setUser({ ...user, [e.target.name]: e.target.value });
	}

	function handleSubmit(e){
		e.preventDefault();
		singup(user)
	}

	return (
		<section className="form_container">
			<h1>Cadastro</h1>
			<form onSubmit={handleSubmit}>
				<Input text="Nome" type="text" name="name" placeholder="Digite o seu nome" handleOnChange={handleChange}/>
				
				<Input text="Telefone" type="text" name="phone" placeholder="Digite o seu telefone" handleOnChange={handleChange}/>

				<Input text="Email" type="email" name="email" placeholder="Digite o seu e-mail" handleOnChange={handleChange}/>

				<Input text="Senha" type="password" name="password" placeholder="Digite a sua senha" handleOnChange={handleChange}/>

				<Input text="Confirmação de senha" type="password" name="confirmpassword" placeholder="Confirme a sua senha" handleOnChange={handleChange}/>

				<input type="submit" value="Cadastrar" />
			</form>
			<p>
     Já tem conta? <Link to="/login">Clique aqui.</Link>
    </p>
		</section>
	)
}

export default Singup;