import HeadHtml from '@components/layout/HeadHtml'
import PageHeader from '@components/widgets/PageHeader'
import { EOrder, EOrderBy } from '@configs/interface.config'
import { checkAuth } from '@src/libs/localStorage'
import { useQueryListOrder } from '@src/queries/hooks'
import { Col, Row, Table, TablePaginationConfig } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { columnsTableOrder } from './components/table.config'

const LIMIT = 20

function Order() {
  const navigate = useNavigate()
  const token = checkAuth()
  const [params, setParams] = useState<any>({
    page: 1,
    limit: LIMIT,
    order: EOrder.DESC,
    orderBy: EOrderBy.CREATED_DATE,
  })

  const {
    data: listOrder,
    isLoading: isLoadingListOrder,
    isFetching: isFetchingListOrder,
  } = useQueryListOrder(params, token)

  const listOrderData = useMemo(() => listOrder?.data, [listOrder, isLoadingListOrder, isFetchingListOrder])
  const total = useMemo(() => listOrder?.total || 0, [listOrder, isLoadingListOrder, isFetchingListOrder])

  const onChangeTable = (pagination: TablePaginationConfig, filters: any, sorter: any) => {
    console.log('vcl')
    const newParams: any = {
      ...params,
      page: pagination?.current || 1,
      limit: pagination?.pageSize || LIMIT,
      order: !sorter?.order || sorter?.order === 'ascend' ? EOrder.DESC : EOrder.ASC,
      orderBy: sorter && sorter?.column?.key ? sorter?.column?.key : EOrderBy.CREATED_DATE,
    }
    setParams(newParams)
  }
  const columns = columnsTableOrder()

  return (
    <>
      <Col span={24}>
        <HeadHtml title="Danh sách đơn hàng" />
        <PageHeader title="Danh sách đơn hàng" isSearch={false} />
        <Row>
          <Col span={24}>
            <Table
              columns={columns}
              rowKey="_id"
              dataSource={listOrderData}
              loading={isLoadingListOrder}
              pagination={{
                pageSize: params?.limit || LIMIT,
                total,
                current: params?.page || 1,
                pageSizeOptions: ['20', '40', '60', '80', '100'],
                showSizeChanger: true,
              }}
              scroll={{ x: 992 }}
              onChange={onChangeTable}
            />
          </Col>
        </Row>
      </Col>
    </>
  )
}

export default Order
