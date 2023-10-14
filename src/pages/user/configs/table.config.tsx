import { FORMAT_TIME_DEFAULT } from '@src/configs/const.config'
import { TFile, TRole, TUser } from '@src/modules'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { Avatar, Badge, Button, Col, Popconfirm, Row, Space, Tag, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'
import { useMutationRemoveUserById } from '@src/queries/hooks'
import { queryClient } from '@src/queries'
import { USER_PROFILE } from '@queries/keys'
import { TResApi } from '@src/configs/interface.config'
import { useMemo } from 'react'

export const columnsTableUser = (roles?: TRole[]): ColumnsType<TUser> => {
  const navigate = useNavigate()
  const roleFilterData = roles?.map((role) => ({ text: role.code, value: role._id }))
  const { mutate } = useMutationRemoveUserById()
  const profile = useMemo(() => {
    const profileData = queryClient.getQueryData<TResApi<TUser>>([USER_PROFILE])
    if (profileData?.data) return profileData?.data
    return null
  }, [])
  return [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (value: TFile) => <Avatar size={32} icon={<UserOutlined />} src={value?.location} />,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      sorter: true,
      render(username, record) {
        return (
          <Link to={`/detail-user/${record?._id}`}>
            <Typography.Text>{username}</Typography.Text>
          </Link>
        )
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (v) => v || '__',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (v) => v || '__',
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      render: (roles: TRole[]) => (
        <Row gutter={[0, 5]}>
          {roles?.map((role) => (
            <Col key={role._id}>
              <Tag>{role.code}</Tag>
            </Col>
          ))}
        </Row>
      ),
      filters: roleFilterData,
      filterMultiple: true,
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => (
        <Badge color={`${isActive ? 'hsl(102, 53%, 61%)' : '#f50'}`} text={`${isActive ? 'Active' : 'Inactive'}`} />
      ),
      filters: [
        { text: 'Active', value: 1 },
        { text: 'Inactive', value: 0 },
      ],
      filterMultiple: false,
    },
    {
      title: 'Published',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value) => dayjs(value).format(FORMAT_TIME_DEFAULT),
      sorter: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: TUser) => (
        <Space size="middle">
          <Button type="link" onClick={() => navigate(`/detail-user/${record?._id}`)}>
            Detail
          </Button>
          {profile && profile._id !== record._id && (
            <Popconfirm placement="topRight" title="Are you sure?" onConfirm={() => mutate(record._id)}>
              <Button type="link">Delete</Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ]
}
