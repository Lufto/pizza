import classNames from "classnames"


const Button = (props) => {
    return(
        <button
            onClick={props.onClick}
            className={classNames('button', 'button--add', {
                'button--outline': props.outline
            })}>
            {props.children}
        </button>
    )
}

export default Button