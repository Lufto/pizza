import classNames from 'classnames'
import React, { useState } from 'react'
import { cartItem, curentObj } from '../../store/CartSlise'
import Button from '../Button/Button'

type PizzaCardProps = {
	id: string
	name: string
	types: string[]
	imageUrl: string
	sizes: number[]
	price: number
	createCard: (obj: cartItem, curent: curentObj) => void
	curent?: number
}

const PizzaCard: React.FC<PizzaCardProps> = ({
	id,
	name,
	types,
	imageUrl,
	sizes,
	price,
	createCard,
	curent,
}) => {
	const [activeRadius, setActiveRadius] = useState(sizes[0])
	const [activeVariable, setActiveVariable] = useState(types[0])
	const [curentPizzaCart, setCurentPizzaCart] = useState(curent || 0)

	const renderNewItem = () => {
		const newItemCart: cartItem = {
			id,
			imageUrl,
			name,
			price,
			types: activeVariable,
			sizes: activeRadius,
			curent: curentPizzaCart + 1,
		}

		setCurentPizzaCart(curentPizzaCart + 1)
		const curentObj = { curent: curentPizzaCart + 1 }
		createCard(newItemCart, curentObj)
	}

	return (
		<div className="pizza-block">
			<img
				className="pizza-block__image"
				src={imageUrl}
				alt="Pizza"
			/>
			<h4 className="pizza-block__title">{name}</h4>
			<div className="pizza-block__selector">
				<ul>
					{types.map((item, i) => (
						<li
							onClick={() => setActiveVariable(item)}
							key={`${id}${i}`}
							className={classNames({
								active: item === activeVariable,
							})}
						>
							{item}
						</li>
					))}
				</ul>
				<ul>
					{sizes.map((item, i) => (
						<li
							onClick={() => setActiveRadius(item)}
							key={`${id}${i}`}
							className={classNames({
								active: item === activeRadius,
							})}
						>
							{item} см.
						</li>
					))}
				</ul>
			</div>
			<div className="pizza-block__bottom">
				<div className="pizza-block__price">от {price} ₽</div>
				<Button
					onClick={renderNewItem}
					outline
				>
					<svg
						width="12"
						height="12"
						viewBox="0 0 12 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
							fill="white"
						/>
					</svg>
					<span>Добавить</span>
					<i
						className={classNames({
							'i-d-none': curentPizzaCart === 0,
						})}
					>
						{curentPizzaCart !== 0 ? curentPizzaCart : 0}
					</i>
				</Button>
			</div>
		</div>
	)
}

export default PizzaCard
