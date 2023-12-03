import FormSidebar from '@src/components/layout/FormSidebar'
import HeadHtml from '@src/components/layout/HeadHtml'
import PageHeader from '@src/components/widgets/PageHeader'
import { labelStyle } from '@src/configs/const.config'
import { EOrder, EOrderBy } from '@src/configs/interface.config'
import { checkAuth } from '@src/libs/localStorage'
import { useMutationUpdateShowTimeById, useQueryListRoom, useQueryShowtimeById } from '@src/queries/hooks'
import { Badge, Button, Card, Col, ConfigProvider, DatePicker, Form, Image, Input, Row, Select, TimePicker } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const LIMIT = 20

const DetailShowtime = () => {
  const { id } = useParams()
  const token = checkAuth()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [params, setParams] = useState<any>({
    page: 1,
    limit: LIMIT,
    order: EOrder.DESC,
    orderBy: EOrderBy.CREATED_DATE,
    s: '',
  })

  const {
    data: listRoomData,
    isLoading: isLoadingListRoom,
    isFetching: isFetchingListRoom,
  } = useQueryListRoom(params, token)

  const listRoom = useMemo(
    () => (listRoomData?.data ? listRoomData?.data : []),
    [listRoomData, isLoadingListRoom, isFetchingListRoom],
  )
  const {
    data: ShowTimeData,
    isLoading: isShowTimeDataLoading,
    isFetching: isFetchingShowTime,
  } = useQueryShowtimeById(id || '')

  useEffect(() => {
    form.setFieldsValue({
      room: ShowTimeData?.data?.room?._id,
      price: ShowTimeData?.data?.price,
      status: ShowTimeData?.data?.status,
      day: dayjs(ShowTimeData?.data?.day || new Date()),
      startHour: dayjs(ShowTimeData?.data?.startHour),
      endHour: dayjs(ShowTimeData?.data?.endHour),
    })
  }, [form, isFetchingShowTime])

  const { mutate: mutateUpdateShowTime, isLoading: isLoadingUpdateShowTime } = useMutationUpdateShowTimeById()

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
    if (id)
      mutateUpdateShowTime(
        { id, data },
        {
          onSuccess: () => {
            navigate('/showtime')
          },
        },
      )
  }
  return (
    <Col span={24}>
      <HeadHtml title="Chi Tiết Suất Chiếu" />
      <FormSidebar isLoading={isFetchingShowTime} onFinish={onFinish} form={form}>
        <FormSidebar.Content>
          <Card hoverable title={<PageHeader title="Quản lý suất chiếu" isSearch={false} inCard />}>
            <Row>
              <Col span={5}>
                <Image width={200} src={ShowTimeData?.data?.film?.thumbnail?.location} />
              </Col>
              <Col span={18}>
                <h2>{ShowTimeData?.data?.film?.name}</h2>
                <Form.Item {...labelStyle} name="room" label="Chọn Phòng Chiếu">
                  <Select>
                    {listRoom.map((item) => (
                      <Select.Option value={item._id}>{item.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item {...labelStyle} label="Price" name="price">
                  <Input type="number" />
                </Form.Item>

                <Form.Item {...labelStyle} label="Day" name="day">
                  <DatePicker />
                </Form.Item>

                <Form.Item {...labelStyle} label="Start hour" name="startHour">
                  <TimePicker format="HH:mm" />
                </Form.Item>

                <Form.Item {...labelStyle} label="End hour" name="endHour">
                  <TimePicker format="HH:mm" />
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
                  <Button type="primary" htmlType="submit" loading={isLoadingUpdateShowTime}>
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </FormSidebar.Content>
      </FormSidebar>
    </Col>
  )
}

export default DetailShowtime
