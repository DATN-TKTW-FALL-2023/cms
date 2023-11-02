import React, { useEffect, useMemo, useState } from 'react'
import { Menu, MenuProps, Layout, Row, Col, Divider } from 'antd'
import {
  UserOutlined,
  DashboardOutlined,
  SafetyCertificateOutlined,
  FolderAddOutlined,
  ReadOutlined,
} from '@ant-design/icons'
import logoApp from '@assets/favicon.svg'
// import logoTWG from '@assets/logo-twg.svg'
import Breadcrumb from '@components/widgets/Breadcrumb'
import UserDropdownAuth from '@src/components/widgets/UserDropdownAuth'
import { ACCESS } from '@src/configs/permission'
import { usePermissionCurrent } from '@src/hooks'
import { checkAuth } from '@libs/localStorage'
import { Link, useLocation } from 'react-router-dom'

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  keyName: ACCESS,
  permissions: ACCESS[],
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem => {
  if (!permissions.includes(keyName)) return null
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

interface ILayoutApp {
  children: JSX.Element
}

function LayoutApp({ children }: ILayoutApp) {
  const location = useLocation()
  const token = checkAuth()
  const { permissions } = usePermissionCurrent(token)

  const [collapsed, setCollapsed] = useState(false)
  const [selectedKeyMenu, setSelectedKeyMenu] = useState<string[]>(['dashboard'])

  useEffect(() => {
    const pathSnippets = location.pathname.split('/').filter((i) => i)
    if (pathSnippets && pathSnippets?.length > 0) setSelectedKeyMenu(pathSnippets)
  }, [])

  const onSelectMenu = ({ keyPath }: { keyPath: string[] }) => {
    setSelectedKeyMenu(keyPath)
  }

  const menuItems: MenuItem[] = useMemo(
    () => [
      getItem(<Link to="/">Dashboard</Link>, 'dashboard', ACCESS.GENERAL, permissions, <DashboardOutlined />),
      getItem('Quản lý phòng', 'roomG', ACCESS.LIST_ROOM, permissions, <ReadOutlined />, [
        getItem(<Link to="/layout-room">Layout Phòng</Link>, 'layout', ACCESS.LIST_ROOM, permissions),
        getItem(<Link to="/room">Danh Sách Phòng</Link>, 'room', ACCESS.LIST_ROOM, permissions),
        getItem(<Link to="/create-room">Thêm Phòng</Link>, 'create-room', ACCESS.CREATE_ROOM, permissions),
      ]),
      getItem('Quản lý phim', 'postG', ACCESS.LIST_ROOM, permissions, <ReadOutlined />, [
        getItem(<Link to="/film">Quản lí phim</Link>, 'film', ACCESS.LIST_ROOM, permissions),
        getItem(<Link to="/create-film">Thêm Phim</Link>, 'create-film', ACCESS.LIST_ROOM, permissions),
        getItem(<Link to="/category">Danh mục phim</Link>, 'category', ACCESS.LIST_TAXONOMY, permissions),
      ]),
      getItem('Quản lý suất chiếu', 'showTimeG', ACCESS.LIST_ROOM, permissions, <ReadOutlined />, [
        getItem(<Link to="/showtime">Danh sách suất chiếu</Link>, 'list', ACCESS.LIST_ROOM, permissions),
        getItem(<Link to="/create">Thêm suất chiếu</Link>, 'create', ACCESS.LIST_ROOM, permissions),
      ]),
      getItem(<Link to="/media">Media</Link>, 'media', ACCESS.LIST_MEDIAS, permissions, <FolderAddOutlined />),
      getItem('User', 'userG', ACCESS.LIST_USERS, permissions, <UserOutlined />, [
        getItem(<Link to="/user">List user</Link>, 'user', ACCESS.LIST_USERS, permissions),
        getItem(<Link to="/create-user">Create user</Link>, 'create-user', ACCESS.CREATE_USER, permissions),
      ]),
      getItem(<Link to="/role">Role</Link>, 'role', ACCESS.LIST_ROLES, permissions, <SafetyCertificateOutlined />),
    ],
    [permissions],
  )

  return (
    <Layout style={{ minHeight: '100vh', padding: 0 }}>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1200,
          width: '100%',
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        <Col span={24}>
          <Row justify="space-between" align="middle">
            <Col>
              <img src="https://res.cloudinary.com/dxzkcrvi0/image/upload/v1698914782/logo_datn-02-02_tpaxhr.svg"alt="logo" width={150} />
            </Col>
            <Col>
              <UserDropdownAuth />
            </Col>
          </Row>
        </Col>
      </Header>
      <Layout style={{ overflow: 'hidden' }}>
        <Sider width={230} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme="light">
          <Menu
            mode="inline"
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
            theme="light"
            defaultSelectedKeys={selectedKeyMenu}
            onSelect={onSelectMenu}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 0' }}>
          <Row style={{ margin: '16px 0' }}>
            <Breadcrumb />
          </Row>
          <Divider style={{ margin: 0 }} />
          <Content
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Row>{children}</Row>
          </Content>
          <Footer
            style={{
              paddingTop: 24,
              paddingBottom: 24,
              paddingLeft: 0,
              paddingRight: 0,
              textAlign: 'center',
            }}
          >
            {'Designed and Developer by '}
            <a href="https://twinger.vn/" target="_blank" rel="noreferrer">
              <img src="https://res.cloudinary.com/dxzkcrvi0/image/upload/v1698914782/logo_datn-02-02_tpaxhr.svg" alt="logo" width={90} />
            </a>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default LayoutApp
