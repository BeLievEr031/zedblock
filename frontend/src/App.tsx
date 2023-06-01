// import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import Auth from "./pages/Auth/Auth"
import Home from "./pages/Home/Home"
import Task from "./pages/AddTask/Task"
import Bin from "./pages/Bin/Bin"
import Edit from "./pages/Edit/Edit"
import { useSelector } from "react-redux"
import { RootState } from "./redux/store"
import { useLoadingWithRefresh } from "./hook/useWithLoading"
import Detail from "./pages/Detail/Detail";

function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.authSlice)
  const { loading } = useLoadingWithRefresh()
  return (
    <BrowserRouter>
      <Routes>
        {!isAuthenticated && <Route path="/" element={<Auth />} />}
        {isAuthenticated && <Route path="/home" element={<Home />} />}
        {isAuthenticated && <Route path="/add" element={<Task />} />}
        {isAuthenticated && <Route path="/bin" element={<Bin />} />}
        {isAuthenticated && <Route path="/edit" element={<Edit />} />}
        {isAuthenticated && <Route path="/detail" element={<Detail />} />}
        {/* <Route path="/details" element={<Bin />} /> */}
        {/* <Route path="*" element={<Navigate to={
          isAuthenticated ? "/home" : "/"
        } />} /> */}
      </Routes>
      <Toaster
        position="top-right"
      />
    </BrowserRouter>
  )
}

export default App