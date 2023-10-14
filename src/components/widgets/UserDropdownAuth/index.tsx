import { LoginOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Row, Space, Typography } from 'antd'
import type { MenuProps } from 'antd'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { useMutationSignOut, useQueryProfile } from '@src/queries/hooks'
import { checkAuth } from '@libs/localStorage'

const { Text } = Typography

function UserDropdownAuth() {
  const token = checkAuth()
  const { mutate } = useMutationSignOut()
  const { data, isLoading } = useQueryProfile(token)
  const profile = useMemo(() => data?.data, [data, isLoading])

  const onLogout = (e: any) => {
    e.preventDefault()
    mutate()
  }

  const items: MenuProps['items'] = useMemo(
    () => [
      {
        key: '1',
        label: (
          <Link to={`/user/${profile?._id}`}>
            <Space size={10} align="center">
              <UserOutlined />
              <Text>{profile?.username}</Text>
            </Space>
          </Link>
        ),
      },
      {
        key: '2',
        label: (
          <Link to="/logout" onClick={onLogout}>
            <Space size={10} align="center">
              <LoginOutlined />
              <Text>Logout</Text>
            </Space>
          </Link>
        ),
      },
    ],
    [],
  )
  return (
    <Row className="user-dropdown">
      {profile && !isLoading && (
        <Dropdown menu={{ items }} placement="topRight">
          <Space>
            <Avatar size={36} icon={<UserOutlined />} src={profile?.avatar?.location} />
            <Text className="user-label">Hi, {profile.username}</Text>
          </Space>
        </Dropdown>
      )}
    </Row>
  )
}

export default UserDropdownAuth
