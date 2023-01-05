import {Link} from 'react-router-dom';
import Logo from '../../assets/img/logo.png';
import './Navbar.css'
import {Context} from '../../context/UserContext';
import { useContext } from 'react';

function Navbar(){
	const {authenticated, logout} = useContext(Context);
	return (
		<nav className='navbar'>
			<div className='navbar_logo'>
				<img src={Logo} alt="Get A Pet" />
				<Link to={'/'}>
					<h2>Get A Pet</h2>
				</Link>
			</div>
			<ul>
				<li>
					<Link to={'/'}>Adotar</Link>
				</li>
				{
					authenticated ? 
					(<>
						<li>
							<Link to={'/pet/mypets'}>Meu Pets</Link>
						</li>
						<li>
							<Link to={'/pet/myadoptions'}>Minhas Adoções</Link>
						</li>
						<li>
							<Link to={'/user/profile'}>Perfil</Link>
						</li>
						<li onClick={logout}>
							Sair
						</li>
					</>) 
					:
					(<>
							<li>
								<Link to={'/login'}>Login</Link>
							</li>
							<li>
							<Link to={'/singup'}>Cadastro</Link>
							</li>
					</>)
				}
			</ul>
		</nav>
	)
}

export default Navbar;