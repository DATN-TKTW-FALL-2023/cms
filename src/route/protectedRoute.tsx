import { useEffect } from 'react'
import { ACCESS } from '@src/configs/permission'
import { usePermissionCurrent } from '@src/hooks'
import { checkAuth } from '@src/libs/localStorage'
import { useNavigate } from 'react-router-dom'
import Forbidden from '@components/screens/403'

function ProtectedRoute({ keyName, children }: { keyName: ACCESS; children: JSX.Element }) {
  const token: string = checkAuth()
  const { permissions, isLoading } = usePermissionCurrent(token)
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) navigate('/login')
  }, [navigate, token])

  if (isLoading) return null
  if (!permissions.includes(keyName) && !isLoading) return <Forbidden />
  return children
}

export default ProtectedRoute
