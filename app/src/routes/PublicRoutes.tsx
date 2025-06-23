import Login from '@/pages/Common/Login'
import React from 'react'
import { Route } from 'react-router-dom'

function PublicRoutes() {
  return (
    <>
        <Route index element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
    </>
  )
}

export default PublicRoutes
