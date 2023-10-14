import { Avatar, Card, Col, Collapse, Form, Row, Space, Typography } from 'antd'
import HeadHtml from '@components/layout/HeadHtml'
import PageHeader from '@components/widgets/PageHeader'
import FormSidebar from '@components/layout/FormSidebar'
import ActionPublish from '@components/widgets/ActionPublish'
import { TPatchUser, TUser } from '@src/modules'
import { useNavigate, useParams } from 'react-router-dom'
import { checkAuth } from '@libs/localStorage'
import { useMutationPatchUserById, useMutationRemoveUserById, useQueryUserById } from '@src/queries/hooks'
import { useMemo, useRef } from 'react'
import SelectSingleFileFormItem from '@src/components/widgets/SelectSingleFileFormItem'
import { queryClient } from '@src/queries'
import { TResApi } from '@src/configs/interface.config'
import { USER_PROFILE } from '@src/queries/keys'
import { UserOutlined } from '@ant-design/icons'

import SetPasswordModal, { THandleSetPasswordModal } from './components/SetPasswordModal'
import FormInput from './components/FormInput'

function DetailUser() {
  const navigate = useNavigate()
  const { id } = useParams()
  const token = checkAuth()
  const [form] = Form.useForm<TPatchUser>()

  const setPasswordModalRef = useRef<null | THandleSetPasswordModal>(null)

  const profile = useMemo(() => {
    const profileData = queryClient.getQueryData<TResApi<TUser>>([USER_PROFILE])
    if (profileData?.data) return profileData?.data
    return null
  }, [])

  const { data: userData, isLoading, isFetching } = useQueryUserById(id || '', token)
  const user = useMemo(() => userData?.data, [userData, isLoading, isFetching])

  const { mutate: mutatePatchUserById, isLoading: isLoadingPatchUserById } = useMutationPatchUserById()
  const onFinish = (values: TPatchUser) => {
    if (id) mutatePatchUserById({ id, data: values })
  }

  const { mutate: mutateRemoveUserById, isLoading: isLoadingRemoveUserById } = useMutationRemoveUserById()
  const onRemove = () => {
    if (id)
      mutateRemoveUserById(id, {
        onSuccess: () => {
          navigate('/user')
        },
      })
  }

  return (
    <Col span={24}>
      <HeadHtml title={`${user?.username || 'Detail user'}`} />
      <FormSidebar form={form} scrollToFirstError onFinish={onFinish} isLoading={isLoading}>
        <>
          <FormSidebar.Content>
            <Card
              hoverable
              title={
                <PageHeader
                  title={
                    <Space>
                      <Avatar src={user?.avatar?.location} size={36} icon={<UserOutlined />} />
                      <Typography.Text>{`${user?.username || 'Detail user'}`}</Typography.Text>
                    </Space>
                  }
                  isSearch={false}
                  inCard
                  extra={[{ text: 'Set password', action: () => setPasswordModalRef.current?.onOpen(true) }]}
                />
              }
            >
              <FormInput data={userData?.data} />
            </Card>
          </FormSidebar.Content>
          <FormSidebar.Sidebar>
            <Row gutter={[0, 24]}>
              <Col span={24}>
                <ActionPublish
                  onPublish={() => form.submit()}
                  showInput={{ isActive: true }}
                  data={{ isActive: user?.isActive, createdAt: user?.createdAt }}
                  loadingUpdate={isLoadingPatchUserById}
                  onDelete={profile?._id !== user?._id ? onRemove : undefined}
                  loadingDelete={isLoadingRemoveUserById}
                  onUpdate={() => form.submit()}
                />
              </Col>
              <Col span={24}>
                <Collapse defaultActiveKey={['1']} expandIconPosition="end">
                  <Collapse.Panel header="Avatar" key="1">
                    <SelectSingleFileFormItem form={form} name="avatar" initialValue={user?.avatar} />
                  </Collapse.Panel>
                </Collapse>
              </Col>
            </Row>
          </FormSidebar.Sidebar>
        </>
      </FormSidebar>
      <SetPasswordModal ref={setPasswordModalRef} userId={id} />
    </Col>
  )
}

export default DetailUser
