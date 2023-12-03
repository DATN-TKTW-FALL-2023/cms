import { DollarOutlined, PlaySquareOutlined, SafetyCertificateOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import HeadHtml from '@components/layout/HeadHtml'
import GlanceCardDashboard from '@src/components/widgets/GlanceCardDashboard'
import PageHeader from '@src/components/widgets/PageHeader'
import { EOrder, EOrderBy } from '@src/configs/interface.config'
import { checkAuth } from '@src/libs/localStorage'
import { useQueryListFilm, useQueryRoleTotal, useQueryUserTotal } from '@src/queries/hooks'
import { Card, Col, Image, Row } from 'antd'
import { useMemo, useState } from 'react'

function Dashboard() {
  const token = checkAuth()
  const [params, setParams] = useState<any>({
    page: 1,
    limit: 20,
    order: EOrder.DESC,
    orderBy: EOrderBy.CREATED_DATE,
    isRelease: true,
  })

  const {
    data: listFilm,
    isLoading: isLoadingListFilm,
    isFetching: isFetchingListFilm,
  } = useQueryListFilm(params, token)
  const listFilmData = useMemo(() => listFilm?.data, [listFilm, isLoadingListFilm, isFetchingListFilm])
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
            {!isLoadingUserTotal && (
              <Col xl={6} lg={8} md={12} sm={24} xs={24}>
                <GlanceCardDashboard
                  icon={<PlaySquareOutlined style={{ fontSize: 60 }} />}
                  label="Phim đang chiếu"
                  total={listFilmData?.length || 0}
                  moreInfo="/user"
                />
              </Col>
            )}
            {!isLoadingUserTotal && (
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
            {!isLoadingUserTotal && (
              <Col xl={6} lg={8} md={12} sm={24} xs={24}>
                <GlanceCardDashboard
                  icon={<DollarOutlined style={{ fontSize: 60 }} />}
                  label="Doanh thu ngày"
                  total={1200000}
                  moreInfo="/role"
                />
              </Col>
            )}
          </Row>
          {!isFetchingListFilm ? (
            <Card hoverable title={'Phim đang chiếu'} style={{ marginTop: 10 }}>
              {listFilmData?.map((film: any, index: any) => (
                <Col key={index} span={24}>
                  <Row gutter={[16, 16]}>
                    <Col span={4}>
                      <Image src={film?.thumbnail?.location} alt={film?.name} width="200px" />
                    </Col>
                    <Col span={24}>
                      <h3>{film?.name}</h3>
                    </Col>
                    <Col span={24}>
                      <p>{film?.description}</p>
                    </Col>
                  </Row>
                </Col>
              ))}
            </Card>
          ) : (
            'Loading...'
          )}
        </Col>
      </Row>
    </Col>
  )
}

export default Dashboard
