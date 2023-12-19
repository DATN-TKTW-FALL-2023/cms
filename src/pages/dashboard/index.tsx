import { DollarOutlined, PlaySquareOutlined, SafetyCertificateOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import HeadHtml from '@components/layout/HeadHtml'
import GlanceCardDashboard from '@src/components/widgets/GlanceCardDashboard'
import { EOrder, EOrderBy } from '@src/configs/interface.config'
import { checkAuth } from '@src/libs/localStorage'
import {
  useQueryListFilm,
  useQueryListOrder,
  useQueryRoleTotal,
  useQueryStatisticalShowtime,
  useQueryUserTotal,
} from '@src/queries/hooks'
import { Card, Col, Image, Row, Table } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import { columnsDashboard } from './components/dashboardTable.config'

function Dashboard() {
  const token = checkAuth()
  const [lessSchedule, setLessSchedule] = useState(dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'))
  const [greaterSchedule, setGreaterSchedule] = useState(
    dayjs().subtract(24, 'hour').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
  )
  const [greaterScheduleWeek, setGreaterScheduleWeek] = useState(
    dayjs().subtract(7, 'day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
  )

  const [revenueArray, setRevenueArray] = useState<any>([])
  const [groupDataFilm, setGroupDataFilm] = useState<any>([])

  const {
    data: listFilm,
    isLoading: isLoadingListFilm,
    isFetching: isFetchingListFilm,
  } = useQueryListFilm(
    {
      order: EOrder.DESC,
      orderBy: EOrderBy.CREATED_DATE,
      isRelease: true,
    },
    token,
  )
  const listFilmData = useMemo(() => listFilm?.data, [listFilm, isLoadingListFilm, isFetchingListFilm])

  const {
    data: orderToday,
    isLoading: isLoadingOrderToday,
    isFetching: isFetchingOrderToday,
  } = useQueryListOrder(
    {
      page: 1,
      limit: 100,
      order: EOrder.DESC,
      orderBy: EOrderBy.CREATED_DATE,
      lessSchedule: lessSchedule,
      greaterSchedule: greaterSchedule,
    },
    token,
  )
  const listOrderToday = useMemo(() => orderToday?.data, [orderToday, isLoadingOrderToday, isFetchingOrderToday])
  const totalPrice = listOrderToday?.reduce((sum: any, booking: any) => sum + booking.price, 0)
  const {
    data: orderWeek,
    isLoading: isLoadingOrderWeek,
    isFetching: isFetchingOrderWeek,
  } = useQueryListOrder(
    {
      page: 1,
      limit: 100,
      order: EOrder.DESC,
      orderBy: EOrderBy.CREATED_DATE,
      lessSchedule: lessSchedule,
      greaterSchedule: greaterScheduleWeek,
    },
    token,
  )
  const listOrderWeek = useMemo(() => orderWeek?.data, [orderWeek, isLoadingOrderWeek, isFetchingOrderWeek])

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
  const {
    data: statisticalShowtimeData,
    isLoading: isLoadingStatisticalShowtime,
    isFetching: isFetchingStatisticalShowtime,
  } = useQueryStatisticalShowtime(
    {
      page: 1,
      limit: 100,
      order: EOrder.DESC,
      orderBy: EOrderBy.CREATED_DATE,
      lessSchedule: lessSchedule,
      greaterSchedule: greaterScheduleWeek,
    },
    token,
  )
  const statisticalShowtime = useMemo(
    () => statisticalShowtimeData?.data,
    [statisticalShowtimeData, isLoadingStatisticalShowtime, isFetchingStatisticalShowtime],
  )

  useEffect(() => {
    const revenueByDay = listOrderWeek?.reduce((result, booking) => {
      const day = booking.day.split('T')[0] // Lấy phần ngày từ trường "day"

      if (!result[day]) {
        result[day] = 0
      }

      result[day] += booking.price

      return result
    }, {})
    if (revenueByDay) {
      const revenueArray = Object.keys(revenueByDay).map((day) => ({
        name: day,
        uv: revenueByDay[day],
      }))
      setRevenueArray(revenueArray)
    }
  }, [listOrderWeek])

  useEffect(() => {
    if (statisticalShowtime && listFilmData) {
      const dataStatisticalFilm = statisticalShowtime.map((showtime) => {
        const totalRevenue = showtime?.showtimes?.reduce(
          (sum: any, booking: any) => sum + booking.price * booking.seatsBooked,
          0,
        )

        return {
          _id: showtime._id,
          totalRevenue: totalRevenue,
          totalShowtime: showtime.showtimes?.length,
        }
      })

      const merged = dataStatisticalFilm.map((film) => {
        const filmData = listFilmData.find((filmData) => filmData._id === film._id)
        if (!filmData) {
          return {}
        }
        return { ...filmData, ...film }
      })
      setGroupDataFilm(merged.filter((item) => Object.keys(item).length > 0))
    }
  }, [statisticalShowtime, listFilmData])

  const columns = columnsDashboard()
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
                  moreInfo="/showtime"
                />
              </Col>
            )}
            {!isLoadingUserTotal && (
              <Col xl={6} lg={8} md={12} sm={24} xs={24}>
                <GlanceCardDashboard
                  icon={<UsergroupAddOutlined style={{ fontSize: 60 }} />}
                  label="Suất chiếu hiện tại"
                  total={
                    statisticalShowtime?.reduce((sum: any, showtime: any) => sum + showtime.showtimes.length, 0) || 0
                  }
                  moreInfo="/showtime"
                />
              </Col>
            )}
            {!isLoadingUserTotal && (
              <Col xl={6} lg={8} md={12} sm={24} xs={24}>
                <GlanceCardDashboard
                  icon={<SafetyCertificateOutlined style={{ fontSize: 60 }} />}
                  label="User"
                  total={userTotal}
                  moreInfo="/user"
                />
              </Col>
            )}
            {!isLoadingUserTotal && (
              <Col xl={6} lg={8} md={12} sm={24} xs={24}>
                <GlanceCardDashboard
                  icon={<DollarOutlined style={{ fontSize: 60 }} />}
                  label="Doanh thu 24 giờ qua"
                  total={totalPrice}
                  moreInfo="/role"
                />
              </Col>
            )}
          </Row>
          {!isFetchingListFilm ? (
            <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
              <Col span="12">
                <Card hoverable title={'Phim đang chiếu'} style={{ marginTop: 10 }}>
                  <Table
                    columns={columns}
                    rowKey="_id"
                    dataSource={groupDataFilm}
                    loading={isFetchingStatisticalShowtime}
                  />
                </Card>
              </Col>
              <Col span="12">
                <Card hoverable title={'DOANH THU 7 NGÀY QUA'} style={{ marginTop: 10 }}>
                  <p>DOANH THU 7 NGÀY QUA</p>
                  <LineChart width={600} height={300} data={revenueArray || []}>
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                  </LineChart>
                </Card>
              </Col>
            </Row>
          ) : (
            'Loading...'
          )}
        </Col>
      </Row>
    </Col>
  )
}

export default Dashboard
