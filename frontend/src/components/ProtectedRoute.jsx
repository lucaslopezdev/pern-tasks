import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoute = ({ redirectTo, children, isAllowed}) => {
  if (!isAllowed) return <Navigate to={redirectTo} replace/>
  
  return children ? children : <Outlet /> // Las rutas no son childrens, son Outlet

}