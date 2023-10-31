import HeadHtml from '@components/layout/HeadHtml'
import PageHeader from '@components/widgets/PageHeader'
import { EOrder, EOrderBy } from '@configs/interface.config'
import { checkAuth } from '@src/libs/localStorage'
import { TQueryPost } from '@src/modules'
import { useQueryListFilm, useQueryListRoom } from '@src/queries/hooks'
import { useMutationCreateShowtime } from '@src/queries/hooks/showtime'
import { Badge, Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, TablePaginationConfig } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LIMIT = 20

function ShowTime() {
  const navigate = useNavigate()
  const token = checkAuth()
  const [open, setOpen] = useState(false)
  const [params, setParams] = useState<TQueryPost>({
    page: 1,
    limit: LIMIT,
    order: EOrder.DESC,
    orderBy: EOrderBy.CREATED_DATE,
    s: '',
  })
  const {
    data: listFilmData,
    isLoading: isLoadingListFilm,
    isFetching: isFetchingListFilm,
  } = useQueryListFilm(params, token)

  const {
    data: listRoomData,
    isLoading: isLoadingListRoom,
    isFetching: isFetchingListRoom,
  } = useQueryListRoom(params, token)

  const listFilm = useMemo(
    () => (listFilmData?.data ? listFilmData?.data : []),
    [listFilmData, isLoadingListFilm, isFetchingListFilm],
  )

  const listRoom = useMemo(
    () => (listRoomData?.data ? listRoomData?.data : []),
    [listRoomData, isLoadingListRoom, isFetchingListRoom],
  )

  const showDefaultDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  const { mutate: mutateCreateShowTime, isLoading: isLoadingCreateShowTime } = useMutationCreateShowtime()

  const onFinish = (values: any) => {
    mutateCreateShowTime(values, {
      onSuccess: () => {
        navigate('/showtime')
      },
    })
  }

  return (
    <>
      <Col span={24}>
        <HeadHtml title="Danh sách suất chiếu" />
        <PageHeader title="Danh sách suất chiếu" extra={[{ text: 'Create', action: () => showDefaultDrawer() }]} />
        <Row></Row>
      </Col>
      <Drawer
        title={`Thêm suất chiếu mới`}
        placement="right"
        size="large"
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <Form onFinish={onFinish}>
          <Form.Item name="film" label="Chọn Phim">
            <Select>
              {listFilm.map((item) => (
                <Select.Option value={item._id}>{item.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="room" label="Chọn Phòng Chiếu">
            <Select>
              {listRoom.map((item) => (
                <Select.Option value={item._id}>{item.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Price" name="price">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Day" name="day">
            <DatePicker />
          </Form.Item>

          <Form.Item label="Start hour" name="startHour">
            <DatePicker showTime />
          </Form.Item>

          <Form.Item label="End hour" name="endHour">
            <DatePicker showTime />
          </Form.Item>
          <Form.Item label="Trạng thái" name="status">
            <Select>
              <Select.Option value="active">
                <Badge status="success" text="ACTIVE" />
              </Select.Option>
              <Select.Option value="inactive">
                <Badge status="error" text="INACTIVE" />
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoadingCreateShowTime}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  )
}

export default ShowTime
