import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import List from "../pages/supplier/list/List";
import Register from "../pages/supplier/register/Register";

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/list" element={<List />} />
            </Routes>
        </BrowserRouter>
    );
}