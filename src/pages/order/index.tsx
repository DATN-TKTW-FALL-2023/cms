import HeadHtml from '@components/layout/HeadHtml'
import PageHeader from '@components/widgets/PageHeader'
import { EOrder, EOrderBy } from '@configs/interface.config'
import { labelStyle } from '@src/configs/const.config'
import { checkAuth } from '@src/libs/localStorage'
import { TQueryPost } from '@src/modules'
import { useQueryListFilm, useQueryListRoom } from '@src/queries/hooks'
import { useQueryListOrder } from '@src/queries/hooks'
import { Badge, Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, Table } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { columnsTableOrder } from './components/table.config'

const LIMIT = 20

function Order() {
  const navigate = useNavigate()
  const token = checkAuth()
  const [params, setParams] = useState<TQueryPost>({
    page: 1,
    limit: LIMIT,
    order: EOrder.DESC,
    orderBy: EOrderBy.CREATED_DATE,
    s: '',
  })

  const columns = columnsTableOrder()

  const {
    data: listOrder,
    isLoading: isLoadingListOrder,
    isFetching: isFetchingListOrder,
  } = useQueryListOrder(params, token)

  const listOrderData = useMemo(() => listOrder?.data, [listOrder, isLoadingListOrder, isFetchingListOrder])

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
              pagination={false}
              scroll={{ x: 992 }}
            />
          </Col>
        </Row>
      </Col>
    </>
  )
}

export default Order
