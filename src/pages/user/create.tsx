import { Card, Col, Collapse, Form, Row } from 'antd'
import HeadHtml from '@components/layout/HeadHtml'
import PageHeader from '@components/widgets/PageHeader'
import FormSidebar from '@components/layout/FormSidebar'
import ActionPublish from '@src/components/widgets/ActionPublish'
import { TPostUser } from '@src/modules'
import { useMutationPostUser } from '@src/queries/hooks'
import { useNavigate } from 'react-router-dom'
import SelectSingleFileFormItem from '@src/components/widgets/SelectSingleFileFormItem'

import FormInput from './components/FormInput'

function CreateUser() {
  const navigate = useNavigate()
  const [form] = Form.useForm<TPostUser>()

  const { mutate, isLoading } = useMutationPostUser()
  const onFinish = (values: TPostUser) => {
    mutate(values, {
      onSuccess: () => {
        navigate('/user')
      },
    })
  }

  return (
    <Col span={24}>
      <HeadHtml title="Create user" />
      <FormSidebar form={form} scrollToFirstError onFinish={onFinish}>
        <>
          <FormSidebar.Content>
            <Card hoverable title={<PageHeader title="Create user" isSearch={false} inCard />}>
              <FormInput />
            </Card>
          </FormSidebar.Content>
          <FormSidebar.Sidebar>
            <Row gutter={[0, 24]}>
              <Col span={24}>
                <ActionPublish
                  onPublish={() => form.submit()}
                  showInput={{ isActive: true }}
                  loadingPublish={isLoading}
                />
              </Col>
              <Col span={24}>
                <Collapse defaultActiveKey={['1']} expandIconPosition="end">
                  <Collapse.Panel header="Avatar" key="1">
                    <SelectSingleFileFormItem form={form} name="avatar" />
                  </Collapse.Panel>
                </Collapse>
              </Col>
            </Row>
          </FormSidebar.Sidebar>
        </>
      </FormSidebar>
    </Col>
  )
}

export default CreateUser
