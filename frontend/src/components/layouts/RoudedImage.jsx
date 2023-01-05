import './RoundedImage.css'

function RoundedImage({src, alt, width}){

	return (
		<img 
			className= {`rounded_image ${width}`}
			src = {src}
			alt = {alt}
		/>
	)
}

export default RoundedImage