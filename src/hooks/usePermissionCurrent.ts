import { ACCESS } from '@src/configs/permission'
import { useQueryRoleCurrent } from '@src/queries/hooks'
import { useEffect, useState } from 'react'

export const usePermissionCurrent = (token: string) => {
  const [permissions, setPermissions] = useState<ACCESS[]>([])
  const { data, isLoading, isFetching } = useQueryRoleCurrent(token)
  useEffect(() => {
    const roles = data?.data || []
    const newPermissions: ACCESS[] = []
    if (Array.isArray(roles) && roles?.length > 0) {
      roles.forEach((role) => {
        if (Array.isArray(role?.permissions) && role?.permissions?.length > 0) {
          role?.permissions.forEach((permission) => {
            if (permission) newPermissions.push(permission)
          })
        }
      })
    }
    const pmsUnique = newPermissions.reduce((unique: ACCESS[], p) => {
      if (unique.findIndex((u) => u === p) < 0) {
        unique.push(p)
      }
      return unique
    }, [])
    setPermissions([...pmsUnique])
  }, [data])

  return {
    permissions: [...permissions, ACCESS.GENERAL],
    isLoading,
    isFetching,
  }
}
