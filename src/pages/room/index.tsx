import { EOrder, EOrderBy } from '@src/configs/interface.config'
import { checkAuth } from '@src/libs/localStorage'
import { TQueryLayout } from '@src/modules'
import { useQueryListLayout } from '@src/queries/hooks'
import { Col, Row, Table } from 'antd'
import { useMemo, useState } from 'react'
import HeadHtml from '@src/components/layout/HeadHtml'
import PageHeader from '@src/components/widgets/PageHeader'
import { useNavigate } from 'react-router-dom'
import { columnsTableLayout } from './components/roomTable.config'
const LIMIT = 20

function LayoutRoomScreen({ postType, prefixDetailUrl }: any) {
  const token = checkAuth()
  const [params, setParams] = useState<TQueryLayout>({
    page: 1,
    limit: LIMIT,
    order: EOrder.DESC,
    orderBy: EOrderBy.CREATED_DATE,
  })

  const {
    data: listLayout,
    isLoading: isLoadingListLayout,
    isFetching: isFetchingListLayout,
  } = useQueryListLayout(params, token)

  const listLayoutData = useMemo(() => listLayout?.data, [listLayout, isLoadingListLayout, isFetchingListLayout])
  const navigate = useNavigate()

  const columns = columnsTableLayout(prefixDetailUrl, postType)
  return (
    <Col span={24}>
      <HeadHtml title="Layout Phòng Chiếu" />
      <PageHeader
        title="Layout Phòng Chiếu"
        extra={[{ text: 'Thêm Layout', action: () => navigate('/create-layout-room') }]}
        isSearch={false}
      />
      <Row>
        <Col span={24}>
          <Table
            columns={columns}
            rowKey="_id"
            dataSource={listLayoutData}
            loading={isFetchingListLayout}
            pagination={false}
            scroll={{ x: 992 }}
          />
        </Col>
      </Row>
    </Col>
  )
}

export default LayoutRoomScreen
