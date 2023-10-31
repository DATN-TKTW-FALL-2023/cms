import { EOrder, EOrderBy } from '@src/configs/interface.config'
import { checkAuth } from '@src/libs/localStorage'
import { useQueryListFilm } from '@src/queries/hooks'
import { Col, Row, Table, TablePaginationConfig } from 'antd'
import { useMemo, useState } from 'react'
import HeadHtml from '@src/components/layout/HeadHtml'
import PageHeader from '@src/components/widgets/PageHeader'
import { useNavigate } from 'react-router-dom'

import { columnsTableFilm } from './components/filmTable.config'

const LIMIT = 20

function Film() {
  const token = checkAuth()
  const [params, setParams] = useState<any>({
    page: 1,
    limit: LIMIT,
    order: EOrder.DESC,
    orderBy: EOrderBy.CREATED_DATE,
  })

  const {
    data: listFilm,
    isLoading: isLoadingListFilm,
    isFetching: isFetchingListFilm,
  } = useQueryListFilm(params, token)
  const listFilmData = useMemo(() => listFilm?.data, [listFilm, isLoadingListFilm, isFetchingListFilm])
  const navigate = useNavigate()

  const columns = columnsTableFilm()

  const onChangeTable = (pagination: TablePaginationConfig, filters: any, sorter: any) => {
    const newParams: any = {
      ...params,
      page: pagination?.current || 1,
      limit: pagination?.pageSize || LIMIT,
      order: !sorter?.order || sorter?.order === 'ascend' ? EOrder.DESC : EOrder.ASC,
      orderBy: sorter && sorter?.column?.key ? sorter?.column?.key : EOrderBy.CREATED_DATE,
    }
    setParams(newParams)
  }

  return (
    <Col span={24}>
      <HeadHtml title="Danh Sách Film" />
      <PageHeader
        title="Danh Sách Film"
        extra={[{ text: 'Thêm Film', action: () => navigate('/create-film') }]}
        isSearch={false}
      />
      <Row>
        <Col span={24}>
          <Table
            columns={columns}
            rowKey="_id"
            dataSource={listFilmData}
            loading={isLoadingListFilm}
            onChange={onChangeTable}
            // pagination={false}
            scroll={{ x: 992 }}
          />
        </Col>
      </Row>
    </Col>
  )
}

export default Film
