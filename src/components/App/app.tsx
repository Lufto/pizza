import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CartPage from '../../pages/CartPage'
import MainPage from '../../pages/MainPage'
import Header from '../Header/Header'

import './app.scss'

const App = () => {
	return (
		<BrowserRouter>
			<div className="wrapper">
				<Header />

				<Routes>
					<Route
						path="/"
						element={<MainPage />}
					/>
					<Route
						path="cart"
						element={<CartPage />}
					/>
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App
