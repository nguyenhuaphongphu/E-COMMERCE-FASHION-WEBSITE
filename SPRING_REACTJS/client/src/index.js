import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Cart from './pages/user/Cart';
import ProductList from './pages/user/ProductList';
import Product from './pages/user/Product';
import AdProduct from './pages/admin/AdProduct';
import AdComment from './pages/admin/AdComment';
import AdCustomer from './pages/admin/AdCustomer';
import AdBill from './pages/admin/AdBill';
import Admins from './pages/admin/Admins';
import AdTag from './pages/admin/AdTag';
import AdProductType from './pages/admin/AdProductType';
import AdSupplier from './pages/admin/AdSupplier';
import AdBrand from './pages/admin/AdBrand';
import AdImportOrder from './pages/admin/AdImportOrder';
import AdDetailBill from './pages/admin/AdDetailBill';
import AdImport from './pages/admin/AdImport';
import AdDetailImport from './pages/admin/AdDetailImport';
import HistoryBuy from './pages/user/HistoryBuy';
import AdStatictical from './pages/admin/AdStatictical';
import Error from './components/Error';
import PhotoLibrarySuits from './pages/admin/PhotoLibrarySuits';
import PhotoLibraryPants from './pages/admin/PhotoLibraryPants';
import PhotoLibraryOthers from './pages/admin/PhotoLibraryOthers';
import PhotoLibrarySnippets from './pages/admin/PhotoLibrarySnippets';
import PhotoLibraryShirts from './pages/admin/PhotoLibraryShirts';
import GrantAccess from './pages/admin/GrantAccess';
import AdProductAddAndChange from './pages/admin/AdProductAddAndChange';
import RouteAdmin from './PrivateRoutes/RouteAdmin';
import RouteUpdater from './PrivateRoutes/RouteUpdater';
import RouteSeller from './PrivateRoutes/RouteSeller';
import PayPal from './pages/user/PayPal';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<App />} />
        <Route path='/error' element={<Error />} />
        <Route path='/login' element={<Login />} />
        <Route path='/paypal' element={<PayPal />} />
        <Route path='/register' element={<Register />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/productlist' element={<ProductList />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/historybought' element={<HistoryBuy />} />
        <Route path='/detailbill/:id' element={<AdDetailBill />} />


        <Route path='/bill' element={<AdBill />} />
        <Route path='/adstatictical' element={<AdStatictical />} />


        <Route path='/admin' element={<Admins />} />
        <Route path='/customer' element={<AdCustomer />} />
        <Route path='/supplier' element={<AdSupplier />} />
        <Route path='/brand' element={<AdBrand />} />
        <Route path='/grantaccess/:id' element={<GrantAccess />} />



        <Route path='/adproduct' element={<AdProduct />} />
        <Route path='/comment' element={<AdComment />} />
        <Route path='/tag' element={<AdTag />} />
        <Route path='/producttype' element={<AdProductType />} />
        <Route path='/importorder' element={<AdImportOrder />} />
        <Route path='/detailimport/:id' element={<AdDetailImport />} />
        <Route path='/import' element={<AdImport />} />
        <Route path='/photolibrarysuits' element={<PhotoLibrarySuits />} />
        <Route path='/photolibrarypants' element={<PhotoLibraryPants />} />
        <Route path='/photolibraryshirts' element={<PhotoLibraryShirts />} />
        <Route path='/photolibraryothers' element={<PhotoLibraryOthers />} />
        <Route path='/photolibrarysnippets' element={<PhotoLibrarySnippets />} />
        <Route path='/addproduct' element={<AdProductAddAndChange />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);