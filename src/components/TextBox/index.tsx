import './main.scss'

type props = {
	text: string;
}

const TextBox = (props: props) => {
	return (
		<article>
			<span className="text">{props.text}</span><br />
		</article>
	)
}

export default TextBox;