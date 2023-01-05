const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');
const Pet = require('../models/Pet');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = class PetController{
	
	static async singup(req,res){
		const {name, age, weight, color}  = req.body;
		const available = true;
		const images = req.files;
		if(!name){
			res.status(422).json({message: 'O nome é obrigatório!'});
			return;
		}
		if(!age){
			res.status(422).json({message: 'A idade é obrigatória!'});
			return;
		}
		if(!weight){
			res.status(422).json({message: 'O peso é obrigatório!'});
			return;
		}
		if(!color){
			res.status(422).json({message: 'A cor é obrigatória!'});
			return;
		}
		if(images.length === 0){
			res.status(422).json({message: 'A imagem é obrigatória!'});
			return;
		}
		const token = getToken(req);
		const user = await getUserByToken(token);
		const pet = new Pet({
			name,
			age,
			weight,
			color,
			images: [],
			available,
			user: {
				_id: user._id,
				name: user.name,
				image: user.image,
				phone: user.phone,
			}
		});
		images.map((image)=>{
			pet.images.push((image.filename));
		});
		try {
			const newPet = await pet.save();
			res.status(201).json({
				message: "Pet adicionado com sucesso!",
				newPet,
			})
		} catch (error) {
			res.status(500).json({message: error});
		}

	}

	static async getAll(req, res){
		const pets = await Pet.find().sort('-createdAt');
		res.status(200).json({pets: pets});
	}

	static async getAllUserPets(req, res){
		const token = getToken(req);
		const user = await getUserByToken(token);

		const pets = await Pet.find({'user._id': user._id}).sort('-createdAt');
		res.status(200).json({pets});
	}

	static async getAllUserAdoptions(req, res){
		const token = getToken(req);
		const user = await getUserByToken(token);

		const pets = await Pet.find({'adopter._id': user._id}).sort('-createdAt');
		res.status(200).json({pets});
	}

	static async getPetById(req, res){
		const id = req.params.id;
		if(!ObjectId.isValid(id)){
			res.status(422).json({message: 'ID Inválido!'});
			return;
		}
		const pet = await Pet.findById(id);
		if(!pet){
			res.status(404).json({message: 'Pet não encontrado!'});
			return;
		}
		res.status(200).json({pet: pet});
	}

	static async deletePet(req, res){
		const id = req.params.id;
		const token = getToken(req);
		const user = await getUserByToken(token);

		if(!ObjectId.isValid(id)){
			res.status(422).json({message: 'ID Inválido!'});
			return;
		}

		const pet = await Pet.findById(id);

		if(!pet){
			res.status(404).json({message: 'Pet não encontrado!'});
			return;
		}

		if(pet.user._id.toString() !== user._id.toString()){
			res.status(422).json({message: 'Houve um problema em processa a sua solicitação, tente novamente mais tarde!'});
			return;
		}

		await Pet.findByIdAndRemove(id);
		res.status(200).json({message: "Pet deletado com sucesso!"})
		
	}

	static async editPet(req, res){
		const id = req.params.id;
		const {name, age, weight, color, available}  = req.body;
		const images = req.files;
		const updateData = {};
		const token = getToken(req);
		const user = await getUserByToken(token);

		if(!name){
			res.status(422).json({message: 'O nome é obrigatório!'});
			return;
		}else{
			updateData.name = name;
		}
		if(!age){
			res.status(422).json({message: 'A idade é obrigatória!'});
			return;
		}else{
			updateData.age = age;
		}
		if(!weight){
			res.status(422).json({message: 'O peso é obrigatório!'});
			return;
		}else{
			updateData.weight = weight;
		}
		if(!color){
			res.status(422).json({message: 'A cor é obrigatória!'});
			return;
		}else{
			updateData.color = color;
		}

		console.log(images)
		
		if(!images){
			res.status(422).json({message: 'A imagem é obrigatória!'});
			return;
		}else{
			updateData.images = [];
			images.map((image) => {
			updateData.images.push(image.filename)
			})
		}

		const pet = await Pet.findById(id);

		if(!pet){
			res.status(404).json({message: 'Pet não encontrado!'});
			return;
		}

		if(pet.user._id.toString() !== user._id.toString()){
			res.status(422).json({message: 'Houve um problema em processa a sua solicitação, tente novamente mais tarde!'});
			return;
		}

		await Pet.findByIdAndUpdate(id, updateData);
		res.status(200).json({message: "Pet atualizado com sucesso!"})

	}

	static async schedule(req, res){
		const id = req.params.id;
		const token = getToken(req);
		const user = await getUserByToken(token);

		const pet = await Pet.findById(id);

		if(!pet){
			res.status(404).json({message: 'Pet não encontrado!'});
			return;
		}

		if(pet.user._id.equals(user._id)){
			res.status(422).json({message: 'Você não pode agendar uma visita com o seu próprio Pet!'});
			return;
		}

		if(pet.adopter){
			if(pet.adopter._id.equals(user._id)){
				res.status(422).json({message: 'Você já agendou uma visita para este Pet!'});
			return;
			}
		}

		pet.adopter = {
			_id: user._id,
			name: user.name,
			image: user.image
		}

		await Pet.findByIdAndUpdate(id, pet);
		res.status(200).json({message: `Visita agendada com sucesso, entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}`})

	}

	static async concludeAdoption(req, res){
		const id = req.params.id;
		const token = getToken(req);
		const user = await getUserByToken(token);

		const pet = await Pet.findById(id);

		if(!pet){
			res.status(404).json({message: 'Pet não encontrado!'});
			return;
		}

		if(!pet.user._id.equals(user._id)){
			res.status(422).json({message: 'Houve um problema em processa a sua solicitação, tente novamente mais tarde!'});
			return;
		}

		pet.available = false;

		await Pet.findByIdAndUpdate(id, pet);

		res.status(200).json({message: 'Parabéns! O ciclo de adoção foi finalizado com sucesso!'})
	}
}