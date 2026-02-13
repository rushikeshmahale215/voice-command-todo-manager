import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import TodoDetail from './components/TodoDetail';
import About from './pages/About';
import Analytics from './delete/Analytics';
import Completed from './pages/Completed';
import Pending from './pages/Pending';
import Setting from './pages/Setting';
import './App.css'

function App() {

  return (
    <>
       
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute isAuthenticated={true}>
            <Dashboard />
          </ProtectedRoute>
        
        } />
        <Route path="/todos/:id" element={
          <ProtectedRoute isAuthenticated={true}>
            <TodoDetail />
          </ProtectedRoute>
        } />
        <Route path="settings" element={
          <ProtectedRoute isAuthenticated={true}>
            <Setting />
          </ProtectedRoute>
        } />   
        <Route path="/about" element={    
          <ProtectedRoute isAuthenticated={true}>
            <About />
          </ProtectedRoute>
        } />   
        <Route path="/analytics" element={    
          <ProtectedRoute isAuthenticated={true}>
            <Analytics />
          </ProtectedRoute>
        } />
        <Route path="/completed" element={    
          <ProtectedRoute isAuthenticated={true}>
            <Completed />
          </ProtectedRoute>
        } />
        <Route path="/pending" element={
          <ProtectedRoute isAuthenticated={true}>
            <Pending />
          </ProtectedRoute>
        } />

      </Routes>
        
        

    </>
  )
}


export default App;
