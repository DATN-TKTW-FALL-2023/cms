import HeadHtml from '@components/layout/HeadHtml'
import PageHeader from '@components/widgets/PageHeader'
import { EOrder, EOrderBy } from '@configs/interface.config'
import { checkAuth } from '@src/libs/localStorage'
import { TQueryPost } from '@src/modules'
import { useQueryTaxonomyMakeTree } from '@src/queries/hooks'
import { useQueryListPost } from '@src/queries/hooks/post'
import { Col, Row, Table, TablePaginationConfig } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { columnTablePost } from './configs/table.config'

const LIMIT = 20

function Post() {
  const navigate = useNavigate()
  const token = checkAuth()
  const [s, setS] = useState<string>()
  const [params, setParams] = useState<TQueryPost>({
    page: 1,
    limit: LIMIT,
    order: EOrder.DESC,
    orderBy: EOrderBy.CREATED_DATE,
    s: '',
  })

  useEffect(() => {
    const newParams: TQueryPost = {
      ...params,
      s,
    }
    setParams(newParams)
  }, [s])

  const { data: postData, isLoading, isFetching } = useQueryListPost(params, token)
  const posts = useMemo(() => postData?.data || [], [postData, isLoading, isFetching])
  const total = useMemo(() => postData?.total || 0, [postData, isLoading, isFetching])

  const {
    data: taxonomyMakeTreeData,
    isLoading: isLoadingTaxonomyMakeTree,
    isFetching: isFetchingTaxonomyMakeTree,
  } = useQueryTaxonomyMakeTree('POST', token)

  const taxonomyMakeTree = useMemo(
    () => taxonomyMakeTreeData?.data,
    [isLoadingTaxonomyMakeTree, isFetchingTaxonomyMakeTree, taxonomyMakeTreeData],
  )

  const onChangeTable = (pagination: TablePaginationConfig, filters: any, sorter: any) => {
    const newParams: TQueryPost = {
      ...params,
      page: pagination?.current || 1,
      limit: pagination?.pageSize || LIMIT,
      status: filters?.status ? filters?.status[0] : undefined,
      'taxonomyIds[]': filters?.taxonomies || undefined,
      order: !sorter?.order || sorter?.order === 'ascend' ? EOrder.DESC : EOrder.ASC,
      orderBy: sorter && sorter?.column?.key ? sorter?.column?.key : EOrderBy.CREATED_DATE,
    }
    setParams(newParams)
  }
  const columns = columnTablePost(taxonomyMakeTree ? taxonomyMakeTree?.children : [])
  return (
    <Col span={24}>
      <HeadHtml title="Post" />
      <PageHeader
        title="Posts"
        extra={[{ text: 'Create', action: () => navigate('/create-post') }]}
        onSearch={(v) => setS(v)}
      />
      <Row>
        <Col span={24}>
          <Table
            rowKey="_id"
            scroll={{ x: 992 }}
            columns={columns}
            dataSource={posts}
            pagination={{
              pageSize: params?.limit || LIMIT,
              total,
              current: params?.page || 1,
              pageSizeOptions: ['20', '40', '60', '80', '100'],
              showSizeChanger: true,
            }}
            onChange={onChangeTable}
            loading={isLoading}
          />
        </Col>
      </Row>
    </Col>
  )
}

export default Post
