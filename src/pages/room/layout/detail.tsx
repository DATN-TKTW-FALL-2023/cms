import FormSidebar from '@components/layout/FormSidebar'
import ActionPublish from '@components/widgets/ActionPublish'
import HeadHtml from '@components/layout/HeadHtml'
import PageHeader from '@components/widgets/PageHeader'
import { checkAuth } from '@libs/localStorage'
import { queryClient } from '@queries/index'
import { useMutationUpdateLayoutById, useQueryGetLayoutById } from '@queries/hooks'
import { LIST_LAYOUT } from '@queries/keys'
import { Badge, Card, Col, Form, Input, InputNumber, Select } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { labelStyle } from '@src/configs/const.config'

type FieldType = {
  name?: string
  row?: number
  column?: number
}

function DetailLayoutRoom() {
  const token = checkAuth()
  const { id } = useParams()
  const [form] = Form.useForm<any>()
  const { data: LayoutData, isLoading: isLayoutLoading } = useQueryGetLayoutById(id || '')
  const { mutate, isLoading } = useMutationUpdateLayoutById()

  const navigate = useNavigate()
  const onFinish = (values: any) => {
    if (id)
      mutate(
        { id, data: values },
        {
          onSuccess: () => {
            queryClient.refetchQueries([LIST_LAYOUT])
            navigate('/layout-room')
          },
        },
      )
  }
  useEffect(() => {
    if (LayoutData) {
      form.setFieldsValue({
        name: LayoutData?.data?.name,
        row: LayoutData?.data?.row,
        column: LayoutData?.data?.column,
        status: LayoutData?.data?.status,
      })
    }
  }, [LayoutData])

  return (
    <>
      <HeadHtml title="Thêm Layout Phòng Chiếu" />
      <Col span={24}>
        <FormSidebar scrollToFirstError form={form} onFinish={onFinish} isLoading={isLayoutLoading}>
          <>
            <FormSidebar.Content>
              <Card hoverable title={<PageHeader title="Thêm Layout Phòng Chiếu" isSearch={false} inCard />}>
                <Form.Item<FieldType>
                  {...labelStyle}
                  label="Tên Layout"
                  name="name"
                  rules={[{ required: true, message: 'Vui lòng điền tên!' }]}
                  initialValue={LayoutData?.data?.name}
                >
                  <Input />
                </Form.Item>
                <Form.Item<FieldType>
                  {...labelStyle}
                  label="Số Hàng Ghế"
                  name="row"
                  rules={[{ required: true, message: 'Vui lòng điền số hàng ghế!' }]}
                  initialValue={LayoutData?.data?.row}
                >
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<FieldType>
                  {...labelStyle}
                  label="Số Ghế 1 Hàng"
                  name="column"
                  rules={[{ required: true, message: 'Vui lòng điền số ghế 1 hàng!' }]}
                  initialValue={LayoutData?.data?.column}
                >
                  <InputNumber style={{ width: '100%' }} />
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
              <Col span={24}>
                <ActionPublish onPublish={() => form.submit()} loadingPublish={isLoading} />.
              </Col>
            </FormSidebar.Sidebar>
          </>
        </FormSidebar>
      </Col>
    </>
  )
}

export default DetailLayoutRoom
