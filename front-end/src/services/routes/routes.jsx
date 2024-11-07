import { Routes, Route } from 'react-router-dom';

import { Home } from '../../pages/Home';
import { Login } from '../../pages/Login';
import { RegisterClient } from '../../pages/RegisterClient';
import { Backoffice } from '../../pages/Backoffice';
import { ProductsList } from '../../pages/ProductsList';
import { RegisterProduct } from '../../pages/RegisterProduct';
import { EditProduct } from '../../pages/EditProduct';
import { UsersList } from '../../pages/UsersList';
import { RegisterUser } from '../../pages/RegisterUser';
import { EditUser } from '../../pages/EditUser';
import { ProductDetails } from '../../pages/ProductDetails';
import { Cart } from '../../pages/Cart';
import { Checkout } from '../../pages/Checkout';
import { OrdersClientList } from '../../pages/OrdersClientList';
import { ProfileClient } from '../../pages/ProfileClient';
import { EditClient } from '../../pages/EditClient';
import { AddressClientList } from '../../pages/AddressClientList';

import { AuthProvider } from '../../contexts/AuthContext';
import { ProtectedRoute } from '../../components/Auth/ProtectedRoute';

export const AppRoutes = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/cart/checkout" element={<Checkout />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/register" element={<RegisterClient />} />
                <Route path="/profile" element={<ProfileClient />} />
                <Route path="/profile/edit" element={<EditClient />} />
                <Route path="/profile/orders-list" element={<OrdersClientList />} />
                <Route path="/profile/address-list" element={<AddressClientList />} />
                <Route path="/backoffice" element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'ESTOQUISTA']}>
                        <Backoffice />
                    </ProtectedRoute>
                } />
                <Route path="/backoffice/products-list" element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'ESTOQUISTA']}>
                        <ProductsList />
                    </ProtectedRoute>
                } />
                <Route path="/backoffice/edit-product/:id" element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'ESTOQUISTA']}>
                        <EditProduct />
                    </ProtectedRoute>
                } />
                <Route path="/backoffice/register-product" element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                        <RegisterProduct />
                    </ProtectedRoute>
                } />
                <Route path="/backoffice/users-list" element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                        <UsersList />
                    </ProtectedRoute>
                } />
                <Route path="/backoffice/register-user" element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                        <RegisterUser />
                    </ProtectedRoute>
                } />
                <Route path="/backoffice/edit-user/:id" element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                        <EditUser />
                    </ProtectedRoute>
                } />
            </Routes>
        </AuthProvider>
    );
};