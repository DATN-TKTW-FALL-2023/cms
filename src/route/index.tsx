import { Routes, Route, Outlet } from 'react-router-dom'
import Login from '@pages/login'
import LayoutApp from '@src/components/layout'
import Notfound from '@components/screens/404'

import routeConfig, { TRouteConfig } from './routeConfig'
import ProtectedRoute from './protectedRoute'

function RouteApp() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Notfound />} />
      {routeConfig.map(({ path, Element, key, ...args }: TRouteConfig, index: number) => (
        <Route
          path={path}
          key={index}
          element={
            <ProtectedRoute keyName={key}>
              <>
                <LayoutApp>
                  <Element />
                </LayoutApp>
                <Outlet />
              </>
            </ProtectedRoute>
          }
          action={args.action}
          loader={args.action}
        />
      ))}
    </Routes>
  )
}

export default RouteApp
