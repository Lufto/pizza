import classNames from 'classnames'

type ButtonProp = {
	onClick: () => void
	outline: boolean
	children: any
}

const Button: React.FC<ButtonProp> = ({ onClick, outline, children }) => {
	return (
		<button
			onClick={onClick}
			className={classNames('button', 'button--add', {
				'button--outline': outline,
			})}
		>
			{children}
		</button>
	)
}

export default Button
