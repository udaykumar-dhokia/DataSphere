import { useState } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import "/src/pages/landing/Landing"
import Landing from './pages/landing/Landing'
import Login from './pages/auth/login/Login'
import Signup from './pages/auth/signup/Signup'
import Dashboard from './pages/dashboard/Dashboard'
import Project from './pages/project/Project'

const isValidSession = (token) => {
  const storedSession = JSON.parse(localStorage.getItem('userSession'));
  return storedSession && storedSession.id && storedSession.token === token;
};

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route
            path="/dashboard/:sessionToken"
            element={<ProtectedRoute component={Dashboard} />}
          />
          <Route
            path="/project/:name/:sessionToken"
            element={<ProtectedRoute component={Project} />}
          />
      </Routes>
    </BrowserRouter>
    </>
  )
}

const ProtectedRoute = ({ component: Component }) => {
  const { sessionToken } = useParams();

  const valid = isValidSession(sessionToken);

  return valid ? <Component /> : <Navigate to="/login" />;
};

export default App
