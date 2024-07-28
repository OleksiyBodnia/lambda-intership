import React, { FC, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Loader from './components/Loader'; 

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Suppliers = lazy(() => import('./pages/Suppliers'));
const Supplier = lazy(() => import('./pages/Supplier'));
const Products = lazy(() => import('./pages/Products'));
const Product = lazy(() => import('./pages/Product'));
const Orders = lazy(() => import('./pages/Orders'));
const Order = lazy(() => import('./pages/Order'));
const Employees = lazy(() => import('./pages/Employees'));
const Employee = lazy(() => import('./pages/Employee'));
const Customers = lazy(() => import('./pages/Customers'));
const Customer = lazy(() => import('./pages/Customer'));
const Search = lazy(() => import('./pages/Search'));

const App: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        }/>
        <Route path='dashboard' element={
          <Suspense fallback={<Loader />}>
            <Dashboard />
          </Suspense>
        }/>
        <Route path='suppliers' element={
          <Suspense fallback={<Loader />}>
            <Suppliers />
          </Suspense>
        }/>
        <Route path='suppliers/:id' element={
          <Suspense fallback={<Loader />}>
            <Supplier />
          </Suspense>
        }/>
        <Route path='products' element={
          <Suspense fallback={<Loader />}>
            <Products />
          </Suspense>
        }/>
        <Route path='products/:id' element={
          <Suspense fallback={<Loader />}>
            <Product />
          </Suspense>
        }/>
        <Route path='orders' element={
          <Suspense fallback={<Loader />}>
            <Orders />
          </Suspense>
        }/>
        <Route path='orders/:id' element={
          <Suspense fallback={<Loader />}>
            <Order />
          </Suspense>
        }/>
        <Route path='employees' element={
          <Suspense fallback={<Loader />}>
            <Employees />
          </Suspense>
        }/>
        <Route path='employees/:id' element={
          <Suspense fallback={<Loader />}>
            <Employee />
          </Suspense>
        }/>
        <Route path='customers' element={
          <Suspense fallback={<Loader />}>
            <Customers />
          </Suspense>
        }/>
        <Route path='customers/:id' element={
          <Suspense fallback={<Loader />}>
            <Customer />
          </Suspense>
        }/>
        <Route path='search' element={
          <Suspense fallback={<Loader />}>
            <Search />
          </Suspense>
        }/>
      </Route>
    </Routes>
  );
}

export default App;
