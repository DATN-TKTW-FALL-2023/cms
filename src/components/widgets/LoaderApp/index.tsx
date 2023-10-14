import { checkAuth } from '@src/libs/localStorage'
import { useQueryProfile } from '@src/queries/hooks'
import { Spin } from 'antd'
import { memo } from 'react'

function LoadingApp({ children, loaded }: { children: JSX.Element; loaded: boolean }) {
  const token: string = checkAuth()
  const { isLoading: qrProfileLoading } = useQueryProfile(token)
  if (qrProfileLoading && loaded)
    return (
      <div className="loading-data-main">
        <Spin tip="Loading data" />
      </div>
    )
  return children
}

export default memo(LoadingApp)
