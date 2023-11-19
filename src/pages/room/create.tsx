import HeadHtml from '@components/layout/HeadHtml'
import FormSidebar from '@components/layout/FormSidebar'
import ActionPublish from '@components/widgets/ActionPublish'
import PageHeader from '@components/widgets/PageHeader'
import { Badge, Card, Col, Collapse, Form, Input, Row, Select, Space } from 'antd'
import { useQueryListLayout, useMutationCreateRoom } from '@src/queries/hooks'
import { checkAuth } from '@src/libs/localStorage'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TCreatePost, TQueryLayout } from '@src/modules'
import { EOrder, EOrderBy } from '@src/configs/interface.config'
import { labelStyle } from '@src/configs/const.config'
const LIMIT = 20

function CreateRoom() {
  const token = checkAuth()
  const navigate = useNavigate()
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

  const { mutate: mutateCreateRoom, isLoading: isLoadingCreateRoom } = useMutationCreateRoom()

  const onFinish = (values: TCreatePost) => {
    mutateCreateRoom(values, {
      onSuccess: () => {
        navigate('/room')
      },
    })
  }

  return (
    <Col span={24}>
      <HeadHtml title="Thêm Phòng Chiếu" />
      <FormSidebar onFinish={onFinish} form={form} isLoading={isLoadingListLayout}>
        <>
          <FormSidebar.Content>
            <Card hoverable title={<PageHeader title="Thêm Phòng Chiếu" isSearch={false} inCard />}>
              <Form.Item
                {...labelStyle}
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
              <Form.Item {...labelStyle} name="excerpt" label="Ghi chú">
                <Input.TextArea placeholder="Please enter excerpt" rows={4} />
              </Form.Item>
              <Form.Item {...labelStyle} name="layout" label="Chọn layout">
                <Select>
                  {layout.map((item) => (
                    <Select.Option value={item._id}>{item.name}</Select.Option>
                  ))}
                </Select>
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

export default CreateRoom
