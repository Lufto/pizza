import Header from "../Header/Header";
import MainPage from "../../pages/MainPage";
import CartPage from "../../pages/CartPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './app.scss'

const App = () => {
    return (
        <BrowserRouter>
            <div className="wrapper">
                <Header></Header>

                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="cart" element={<CartPage/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App