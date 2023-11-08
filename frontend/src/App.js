
import './App.css';
import {Toaster} from 'react-hot-toast'
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import PublicRoute from './routes/publicRoute';
import PrivateRoute from './routes/privateRoute';

const Login = lazy(()=> import('./pages/Login'))
const SignUp = lazy(()=> import('./pages/Signup'))
const Home = lazy(()=> import('./pages/Home'))

function App() {
  return (
    <>
    <Suspense fallback={
      <p>Loading..</p>
    }>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route element={<PublicRoute/>}>
          <Route path="/login" element={<Login/> } />
          <Route path="/signup" element={<SignUp/> } />
        </Route>
        <Route element={<PrivateRoute/>}>
          {/* <Route path="/profile" element={<Profile/> } /> */}
        </Route>


      </Routes>
    </Suspense>
    <Toaster/>
    </>
  );
}

export default App;
