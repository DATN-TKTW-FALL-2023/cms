import { Col, Row, Table, TablePaginationConfig } from 'antd'
import HeadHtml from '@components/layout/HeadHtml'
import PageHeader from '@components/widgets/PageHeader'
import { useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { useQueryListUser, useQueryListRole } from '@src/queries/hooks'
import { checkAuth } from '@src/libs/localStorage'
import { TQueryUser } from '@src/modules'
import { EOrder, EOrderBy } from '@src/configs/interface.config'

import { columnsTableUser } from './configs/table.config'

const LIMIT = 20

function User() {
  const token = checkAuth()
  const navigate = useNavigate()

  const [s, setS] = useState<string>()
  const [params, setParams] = useState<TQueryUser>({
    page: 1,
    limit: LIMIT,
    order: EOrder.DESC,
    orderBy: EOrderBy.CREATED_DATE,
    s: '',
  })

  useEffect(() => {
    const newParams: TQueryUser = {
      ...params,
      s,
    }
    setParams(newParams)
  }, [s])

  const { data: rolesData } = useQueryListRole({ limit: 0 }, token)
  const { data: userData, isLoading, isFetching } = useQueryListUser(params, token)
  const users = useMemo(() => userData?.data || [], [userData, isLoading, isFetching])
  const total = useMemo(() => userData?.total || 0, [userData, isLoading, isFetching])

  const onChangeTable = (pagination: TablePaginationConfig, filters: any, sorter: any) => {
    const newParams: TQueryUser = {
      ...params,
      page: pagination?.current || 1,
      limit: pagination?.pageSize || LIMIT,
      isActive: filters?.isActive ? filters?.isActive[0] : undefined,
      roles: filters?.roles || [],
      order: !sorter?.order || sorter?.order === 'ascend' ? EOrder.DESC : EOrder.ASC,
      orderBy: sorter && sorter?.column?.key ? sorter?.column?.key : EOrderBy.CREATED_DATE,
    }
    setParams(newParams)
  }

  const columns = columnsTableUser(rolesData?.data || [])
  return (
    <Col span={24}>
      <HeadHtml title="Users" />
      <PageHeader
        title="Users"
        extra={[{ text: 'Create', action: () => navigate('/create-user') }]}
        onSearch={(v) => setS(v)}
      />
      <Row>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={users}
            rowKey="_id"
            loading={isLoading}
            scroll={{ x: 992 }}
            pagination={{
              pageSize: params?.limit || LIMIT,
              total,
              current: params?.page || 1,
              pageSizeOptions: ['20', '40', '60', '80', '100'],
              showSizeChanger: true,
            }}
            onChange={onChangeTable}
          />
        </Col>
      </Row>
    </Col>
  )
}

export default User
