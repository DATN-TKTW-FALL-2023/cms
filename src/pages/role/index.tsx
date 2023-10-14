import HeadHtml from '@components/layout/HeadHtml'
import PageHeader from '@components/widgets/PageHeader'
import { FORMAT_TIME_DEFAULT, ROLE_INIT } from '@configs/const.config'
import { TResDataListApi } from '@src/configs/interface.config'
import { ACCESS } from '@src/configs/permission'
import { checkAuth } from '@src/libs/localStorage'
import { TRole } from '@src/modules'
import { queryClient } from '@src/queries'
import { useMutationRemoveRoleById, useQueryListRole, useQueryPermission } from '@src/queries/hooks'
import { LIST_ROLE } from '@src/queries/keys'
import { Button, Col, Popconfirm, Row, Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { useMemo, useRef, useState } from 'react'

import CERoleModal, { THandleCERoleModal } from './components/CERoleModal'

function Role() {
  const token = checkAuth()
  const CERoleModalRef = useRef<null | THandleCERoleModal>(null)

  const [permissionEdit, setPermissionEdit] = useState<TRole>()

  const params = useMemo(() => ({ limit: 0 }), [])
  const { data: rolesData, isLoading, isFetching } = useQueryListRole(params, token)
  const data = useMemo(() => rolesData?.data || [], [rolesData, isLoading, isFetching])
  const {
    data: permissionsData,
    isLoading: isLoadingPermissions,
    isFetching: isFetchingPermissions,
  } = useQueryPermission(token)
  const permissions = useMemo(
    () => permissionsData?.data || [],
    [permissionsData, isLoadingPermissions, isFetchingPermissions],
  )

  const { mutate: mutateRemoveRoleById } = useMutationRemoveRoleById()

  const handleDeleteRole = (id: string) => {
    mutateRemoveRoleById(id, {
      onSuccess: () => {
        const old = queryClient.getQueryData<TResDataListApi<TRole[]>>([LIST_ROLE, JSON.stringify(params)])
        queryClient.setQueryData([LIST_ROLE, JSON.stringify(params)], () => {
          const oldData = old?.data || []
          if (oldData?.length <= 0) return { ...old, data: [] }
          const index = oldData.findIndex((item) => item._id === id)
          if (index >= 0) {
            return {
              ...old,
              data: [...oldData.slice(0, index), ...oldData.slice(index + 1)],
            }
          }
          return { ...old }
        })
      },
    })
  }

  const columns: ColumnsType<TRole> = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (v) => v || '_',
    },
    {
      title: 'Permissions',
      dataIndex: 'permissions',
      key: 'permissions',
      ellipsis: {
        showTitle: false,
      },
      render: (permissions: ACCESS[]) => {
        if (permissions?.length <= 0) return '__'
        return (
          <span>
            {permissions?.map((item, index) => (
              <Tag key={index}>{item}</Tag>
            ))}
          </span>
        )
      },
    },
    {
      title: 'Published',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value) => dayjs(value).format(FORMAT_TIME_DEFAULT),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => {
              setPermissionEdit(record)
              CERoleModalRef.current?.onOpen(true)
            }}
          >
            Detail
          </Button>
          {!ROLE_INIT.includes(record?.code) && (
            <Popconfirm placement="topRight" title="Are you sure?" onConfirm={() => handleDeleteRole(record._id)}>
              <Button type="link">Delete</Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ]
  return (
    <>
      <Col span={24}>
        <HeadHtml title="Roles" />
        <PageHeader
          title="Roles"
          extra={[
            {
              text: 'Create',
              action: () => {
                setPermissionEdit(undefined)
                CERoleModalRef.current?.onOpen(true)
              },
            },
          ]}
          isSearch={false}
        />
        <Row>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={data}
              rowKey="_id"
              loading={isLoading}
              pagination={false}
              scroll={{ x: 992 }}
            />
          </Col>
        </Row>
      </Col>
      <CERoleModal
        permissions={permissions}
        ref={CERoleModalRef}
        data={permissionEdit}
        paramsQsRole={params}
        onReset={() => setPermissionEdit(undefined)}
      />
    </>
  )
}

export default Role
