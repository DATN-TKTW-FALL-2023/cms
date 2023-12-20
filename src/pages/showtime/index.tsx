import HeadHtml from '@components/layout/HeadHtml'
import PageHeader from '@components/widgets/PageHeader'
import { EOrder, EOrderBy } from '@configs/interface.config'
import { labelStyle } from '@src/configs/const.config'
import { checkAuth } from '@src/libs/localStorage'
import { TQueryPost } from '@src/modules'
import { useQueryListFilm, useQueryListRoom } from '@src/queries/hooks'
import { useMutationCreateShowtime, useQueryListShowtime } from '@src/queries/hooks/showtime'
import {
  Badge,
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Table,
  TimePicker,
} from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { columnsTableShowTime } from './components/table.config'
import dayjs from 'dayjs'

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
  const [listFilmLabel, setListFilmLabel] = useState<any[]>([])
  const [form] = Form.useForm()
  const [startHour, setStartHour] = useState<any>(dayjs('23:00', 'HH:mm'))
  const [endHour, setEndHour] = useState<any>(dayjs('23:59', 'HH:mm'))
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
  const columns = columnsTableShowTime()

  const showDefaultDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  const { mutate: mutateCreateShowTime, isLoading: isLoadingCreateShowTime } = useMutationCreateShowtime()
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  useEffect(() => {
    if (listFilmData?.data) {
      setListFilmLabel(listFilmData?.data.map((item) => ({ value: item._id, label: item.name })))
    }
  }, [listFilm])

  const {
    data: listShowTime,
    isLoading: isLoadingListShowTime,
    isFetching: isFetchingListShowTime,
  } = useQueryListShowtime(params, token)

  const listShowTimeData = useMemo(
    () => listShowTime?.data,
    [listShowTime, isLoadingListShowTime, isFetchingListShowTime],
  )

  const onFinish = (values: any) => {
    const { day, startHour, endHour } = values

    // Kết hợp ngày và giờ thành một đối tượng moment hoặc dayjs
    const formattedStartHour = dayjs(startHour, 'HH:mm')
    const formattedEndHour = dayjs(endHour, 'HH:mm')

    const startDateTime = dayjs(day.format('YYYY-MM-DD'))
      .set('hour', formattedStartHour.hour())
      .set('minute', formattedStartHour.minute())
    const endDateTime = dayjs(day.format('YYYY-MM-DD'))
      .set('hour', formattedEndHour.hour())
      .set('minute', formattedEndHour.minute())
    const data = { ...values, startHour: startDateTime.toISOString(), endHour: endDateTime.toISOString() }
    mutateCreateShowTime(data, {
      onSuccess: () => {
        navigate('/showtime')
        form.resetFields()
      },
    })
  }

  function range(start: any, end: any) {
    const result = []
    for (let i = start; i < end; i++) {
      result.push(i)
    }
    return result
  }

  function disabledDate(current: any) {
    return current && dayjs(current).isBefore(new Date(), 'day')
  }

  function disabledStartHour(current: any) {
    if ((current && current.format('YYYY-MM-DD') === new Date(), 'day')) {
      return {
        disabledHours: () => range(dayjs(endHour).hour(), 24),
      }
    }
  }

  function disabledEndHour(current: any) {
    if ((current && current.format('YYYY-MM-DD') === new Date(), 'day')) {
      return {
        disabledHours: () => range(0, dayjs(startHour).hour()),
      }
    }
  }

  return (
    <>
      <Col span={24}>
        <HeadHtml title="Danh sách suất chiếu" />
        <PageHeader
          title="Danh sách suất chiếu"
          extra={[{ text: 'Create', action: () => showDefaultDrawer() }]}
          isSearch={false}
        />
        <Row>
          <Col span={24}>
            <Table
              columns={columns}
              rowKey="_id"
              dataSource={listShowTimeData}
              loading={isLoadingListShowTime}
              pagination={false}
              scroll={{ x: 992 }}
            />
          </Col>
        </Row>
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
        <Form onFinish={onFinish} form={form}>
          <Form.Item {...labelStyle} name="film" label="Chọn Phim">
            <Select
              showSearch
              placeholder="Nhập tên phim"
              optionFilterProp="children"
              filterOption={filterOption}
              options={listFilmLabel}
            />
          </Form.Item>

          <Form.Item {...labelStyle} name="room" label="Chọn Phòng Chiếu">
            <Select>
              {listRoom.map((item) => (
                <Select.Option value={item._id}>{item.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item {...labelStyle} label="Giá vé" name="price">
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item {...labelStyle} label="Ngày chiếu" name="day">
            <DatePicker
              disabledDate={(current) => {
                return current && current <= dayjs()
              }}
            />
          </Form.Item>

          <Form.Item {...labelStyle} label="Giờ bắt đầu" name="startHour">
            <TimePicker
              format="HH:mm"
              disabledDate={disabledDate}
              disabledTime={disabledStartHour}
              onChange={(v) => setStartHour(v)}
            />
          </Form.Item>

          <Form.Item {...labelStyle} label="Giờ kết thúc" name="endHour">
            <TimePicker
              format="HH:mm"
              disabledDate={disabledDate}
              disabledTime={disabledEndHour}
              onChange={(v) => setEndHour(v)}
            />
          </Form.Item>
          <Form.Item {...labelStyle} label="Trạng thái" name="status">
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
              Thêm suất chiếu
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  )
}

export default ShowTime
