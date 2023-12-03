import HeadHtml from '@components/layout/HeadHtml'
import FormSidebar from '@components/layout/FormSidebar'
import ActionPublish from '@components/widgets/ActionPublish'
import PageHeader from '@components/widgets/PageHeader'
import { Badge, Button, Card, Col, Collapse, Form, Input, Row, Select, Space } from 'antd'
import { useQueryGetRoomById, useMutationUpdateRoomById } from '@src/queries/hooks'
import { checkAuth } from '@src/libs/localStorage'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { TCreatePost, TQueryLayout } from '@src/modules'
const LIMIT = 20

function RoomSeats() {
  const token = checkAuth()
  const navigate = useNavigate()
  const { id } = useParams()
  const [form] = Form.useForm<TCreatePost>()

  const { mutate: mutateUpdateRoom, isLoading: isLoadingCreateRoom } = useMutationUpdateRoomById()
  const [seatingData, setSeatingData] = useState([])
  const [layout, setLayout] = useState({
    row: 0,
    column: 0,
  })
  const onFinish = (values: any) => {
    if (id)
      mutateUpdateRoom(
        { id, data: values },
        {
          onSuccess: () => {
            navigate('/room')
          },
        },
      )
  }
  const { data: RoomData, isLoading: isRoomDataLoading } = useQueryGetRoomById(id || '')

  useEffect(() => {
    if (RoomData) {
      setLayout(RoomData?.data.layout)
    }
  }, [RoomData])

  return (
    <Col span={24}>
      <HeadHtml title="Quản lý ghế" />
      <FormSidebar onFinish={onFinish} form={form} isLoading={isRoomDataLoading}>
        <>
          <FormSidebar.Content>
            <Card hoverable title={<PageHeader title="Quản lý ghế" isSearch={false} inCard />}>
              <Row gutter={[16, 16]}>
                {RoomData?.data?.seats?.map((seat: any, index: any) => (
                  <Col key={index} span={33.3333}>
                    <Card className={`seat ${seat}`} hoverable={seat === 'inactive'} onClick={() => {}}>
                      {seat.name}
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </FormSidebar.Content>
          <FormSidebar.Sidebar>
            <Row gutter={[0, 24]}>
              <Col span={24}>
                <ActionPublish onPublish={() => form.submit()} loadingPublish={isLoadingCreateRoom} />
              </Col>
            </Row>
          </FormSidebar.Sidebar>
        </>
      </FormSidebar>
    </Col>
  )
}

export default RoomSeats
