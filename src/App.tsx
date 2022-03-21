import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import ShowInfo from "./components/ShowInfo"
import { Product } from './types/product'
import { add, list } from './api/products'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import WebsiteLayout from './pages/layouts/WebsiteLayout'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import ProductDetail from './pages/Productdetail'
import AdminLayout from './pages/layouts/AdminLayout'
import Dashboard from './pages/Dashboard'
import ProductManager from './pages/ProductManager'
import ProductAdd from './pages/ProductAdd'

function App() {
  const [products, setProducts] = useState<{ _id: number, name: string }[]>([])
  useEffect(() => {
    const getProducts = async () => {
      const { data } = await list();
      setProducts(data);
    }
    getProducts();
  }, []);

  // Add Product
  const onHandleAdd = async (product: any) => {
    const { data } = await add(product);
    setProducts([...products, data]);
  }
  return (
    <div className="App">
      <header>
        <ul>
          <li><NavLink to="/">Home Page</NavLink></li>
          <li><NavLink to="/product">Product</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
        </ul>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<WebsiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="product">
              <Route index element={<ProductPage />} />
              <Route path=":id" element={<ProductDetail />} />
              <Route path="/product/add" element={< ProductAdd onAdd={onHandleAdd} />} />
            </Route>
          </Route>'
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="product">
              <Route index element={<ProductManager products={products} />} />

            </Route>
          </Route>
        </Routes>
      </main>
    </div>

  )

}
export default App


