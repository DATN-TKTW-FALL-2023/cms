import FormSidebar from '@components/layout/FormSidebar'
import ActionPublish from '@components/widgets/ActionPublish'
import HeadHtml from '@components/layout/HeadHtml'
import PageHeader from '@components/widgets/PageHeader'
import { checkAuth } from '@libs/localStorage'
import { TPostTaxonomy } from '@modules/index'
import { queryClient } from '@queries/index'
import { useMutationCreateLayout } from '@queries/hooks'
import { LIST_LAYOUT } from '@queries/keys'
import { Badge, Card, Col, Form, Input, InputNumber, Select } from 'antd'
import { useNavigate } from 'react-router-dom'

type FieldType = {
  name?: string
  row?: number
  column?: number
}

function CreateLayoutRoom() {
  const token = checkAuth()
  const [form] = Form.useForm<any>()

  const { mutate, isLoading } = useMutationCreateLayout()
  const navigate = useNavigate()

  const onFinish = (values: any) => {
    mutate(
      { ...values },
      {
        onSuccess: () => {
          queryClient.refetchQueries([LIST_LAYOUT])
          navigate('/layout-room')
        },
      },
    )
  }

  return (
    <>
      <HeadHtml title="Thêm Layout Phòng Chiếu" />
      <Col span={24}>
        <FormSidebar scrollToFirstError form={form} onFinish={onFinish}>
          <>
            <FormSidebar.Content>
              <Card hoverable title={<PageHeader title="Thêm Layout Phòng Chiếu" isSearch={false} inCard />}>
                <Form.Item<FieldType>
                  label="Tên Layout"
                  name="name"
                  rules={[{ required: true, message: 'Vui lòng điền tên!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<FieldType>
                  label="Số Hàng Ghế"
                  name="row"
                  rules={[{ required: true, message: 'Vui lòng điền số hàng ghế!' }]}
                >
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<FieldType>
                  label="Số Ghế 1 Hàng"
                  name="column"
                  rules={[{ required: true, message: 'Vui lòng điền số ghế 1 hàng!' }]}
                >
                  <InputNumber style={{ width: '100%' }} />
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

export default CreateLayoutRoom
