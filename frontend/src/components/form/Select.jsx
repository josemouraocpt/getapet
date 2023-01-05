import './Select.css'

function Select({text, name, options, handleOnChange, value}){
	return(
		<div className='form_control'>
		<label htmlFor={name}>{text}: </label>
		<select name={name} id={name} onChange={handleOnChange} value={value || ''}>
			<option>Selecione uma opção</option>
			{options.map((opt) => (
				<option value={opt} key={opt} >{opt}</option>
			))}
		</select>
		</div>
	)
}

export default Select;