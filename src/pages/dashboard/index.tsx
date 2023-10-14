import { ReadOutlined, SafetyCertificateOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import HeadHtml from '@components/layout/HeadHtml'
import GlanceCardDashboard from '@src/components/widgets/GlanceCardDashboard'
import { checkAuth } from '@src/libs/localStorage'
import { useQueryPostTotal, useQueryRoleTotal, useQueryUserTotal } from '@src/queries/hooks'
import { Col, Row } from 'antd'
import { useMemo } from 'react'

function Dashboard() {
  const token = checkAuth()
  const {
    data: postTotalData,
    isLoading: isLoadingPostTotal,
    isFetching: isFetchingPostTotal,
  } = useQueryPostTotal(token)
  const postTotal = useMemo(() => postTotalData?.data || 0, [postTotalData, isLoadingPostTotal, isFetchingPostTotal])
  const {
    data: userTotalData,
    isLoading: isLoadingUserTotal,
    isFetching: isFetchingUserTotal,
  } = useQueryUserTotal(token)
  const userTotal = useMemo(() => userTotalData?.data || 0, [userTotalData, isLoadingUserTotal, isFetchingUserTotal])
  const {
    data: roleTotalData,
    isLoading: isLoadingRoleTotal,
    isFetching: isFetchingRoleTotal,
  } = useQueryRoleTotal(token)
  const roleTotal = useMemo(() => roleTotalData?.data || 0, [roleTotalData, isLoadingRoleTotal, isFetchingRoleTotal])
  return (
    <Col span={24}>
      <HeadHtml title="Dashboard" />
      <Row gutter={[30, 30]} style={{ marginTop: 10 }}>
        <Col span={24}>
          <Row gutter={[24, 24]}>
            {!isLoadingPostTotal && (
              <Col xl={6} lg={8} md={12} sm={24} xs={24}>
                <GlanceCardDashboard
                  icon={<UsergroupAddOutlined style={{ fontSize: 60 }} />}
                  label="Users"
                  total={userTotal}
                  moreInfo="/user"
                />
              </Col>
            )}
            {!isLoadingUserTotal && (
              <Col xl={6} lg={8} md={12} sm={24} xs={24}>
                <GlanceCardDashboard
                  icon={<SafetyCertificateOutlined style={{ fontSize: 60 }} />}
                  label="Roles"
                  total={roleTotal}
                  moreInfo="/role"
                />
              </Col>
            )}
            {!isLoadingRoleTotal && (
              <Col xl={6} lg={8} md={12} sm={24} xs={24}>
                <GlanceCardDashboard
                  icon={<ReadOutlined style={{ fontSize: 60 }} />}
                  label="Posts"
                  total={postTotal}
                  moreInfo="/post"
                />
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Col>
  )
}

export default Dashboard
