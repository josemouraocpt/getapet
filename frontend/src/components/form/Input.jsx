import './Input.css'

function Input({type, text, name, placeholder, handleOnChange, value, multiple}){
	return(
		<div className="form_control">
			<label htmlFor={name}>{text}:</label>
			<input type={type} placeholder={placeholder} name={name} id={name} onChange={handleOnChange} value={value} {...(multiple) ? {multiple} : ''}/>
		</div>
	)
}

export default Input;