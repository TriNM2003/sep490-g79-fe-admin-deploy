import Layout from '@/components/layouts/layout'
import AdminDashboard from '@/pages/Admin/AdminDashboard'
import React from 'react'
import { Route } from 'react-router-dom'

function PrivateRoutes() {
  return (
    <>
      <Route path="/admin" element={<Layout />}>
          <Route path="dashboard" element={<AdminDashboard />}></Route>
      </Route>
      
    </>
  )
}

export default PrivateRoutes
