import HeadHtml from '@components/layout/HeadHtml'
import FormSidebar from '@components/layout/FormSidebar'
import ActionPublish from '@components/widgets/ActionPublish'
import PageHeader from '@components/widgets/PageHeader'
import { Badge, Card, Col, Collapse, Form, Input, Row, Select, Space } from 'antd'
import {
  useQueryListLayout,
  useMutationCreateRoom,
  useQueryGetRoomById,
  useMutationUpdateRoomById,
} from '@src/queries/hooks'
import { checkAuth } from '@src/libs/localStorage'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { TCreatePost, TQueryLayout } from '@src/modules'
import { EOrder, EOrderBy } from '@src/configs/interface.config'
const LIMIT = 20

function DetailRoom() {
  const token = checkAuth()
  const navigate = useNavigate()
  const { id } = useParams()
  const [form] = Form.useForm<TCreatePost>()
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

  const layout = useMemo(
    () => (listLayout?.data ? listLayout?.data : []),
    [listLayout, isLoadingListLayout, isFetchingListLayout],
  )

  const { mutate: mutateUpdateRoom, isLoading: isLoadingCreateRoom } = useMutationUpdateRoomById()

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
      form.setFieldsValue({
        name: RoomData?.data?.name,
        excerpt: RoomData?.data?.excerpt,
        status: RoomData?.data?.status,
      })
    }
  }, [RoomData])

  return (
    <Col span={24}>
      <HeadHtml title="Sửa Phòng Chiếu" />
      <FormSidebar onFinish={onFinish} form={form} isLoading={isRoomDataLoading}>
        <>
          <FormSidebar.Content>
            <Card hoverable title={<PageHeader title="Sửa Phòng Chiếu" isSearch={false} inCard />}>
              <Form.Item
                name="name"
                label="Tên Phòng"
                rules={[
                  {
                    required: true,
                    message: 'Tên phòng là bắt buộc!',
                  },
                ]}
              >
                <Input placeholder="Please enter title" />
              </Form.Item>
              <Form.Item name="excerpt" label="Ghi chú">
                <Input.TextArea placeholder="Please enter excerpt" rows={4} />
              </Form.Item>
              <Form.Item name="layout" label="Chọn layout">
                <Select>
                  {layout.map((item) => (
                    <Select.Option value={item._id}>{item.name}</Select.Option>
                  ))}
                </Select>
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

export default DetailRoom
