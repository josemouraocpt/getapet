import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/pages/Auth/Login';
import Singup from './components/pages/Auth/Singup';
import Home from './components/pages/Home';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Container from './components/layouts/Container';
import Message from './components/layouts/Message';
import User from './components/pages/User/User';

import { UserProvider } from './context/UserContext';
import MyPets from './components/pages/Pet/MyPets';
import AddPet from './components/pages/Pet/AddPet';
import EditPet from './components/pages/Pet/EditPet';
import PetDetails from './components/pages/Pet/PetDetails';
import MyAdoptions from './components/pages/Pet/MyAdoptions';

function App() {
  return (			
    <Router>	
					<UserProvider>
					 <Navbar/>
						<Message/>
					 <Container>
					 	<Routes>
					 		<Route path='/' element={ <Home/> }/>
					 		<Route path='/login' element={<Login/>}/>
					 		<Route path='/singup' element={<Singup/>}/>
					 		<Route path='/user/profile' element={<User/>}/>
					 		<Route path='/pet/mypets' element={<MyPets/>}/>
					 		<Route path='/pet/add' element={<AddPet/>}/>
					 		<Route path='/pet/myadoptions' element={<MyAdoptions/>}/>
					 		<Route path='/pet/edit/:id' element={<EditPet/>}/>
					 		<Route path='/pet/:id' element={<PetDetails/>}/>
					 	</Routes>
					 </Container>
					 <Footer/>
					</UserProvider>
				</Router>
  )
}

export default App
