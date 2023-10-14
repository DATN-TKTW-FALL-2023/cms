import HeadHtml from '@components/layout/HeadHtml'
import FormSidebar from '@components/layout/FormSidebar'
import ActionPublish from '@components/widgets/ActionPublish'
import PageHeader from '@components/widgets/PageHeader'
import SelectSingleFileFormItem from '@components/widgets/SelectSingleFileFormItem'
import { Card, Col, Collapse, Form, Row, Space } from 'antd'
import SelectTreeInput from '@components/widgets/SelectTreeInput'
import { useQueryTaxonomyMakeTree, useMutationCreatePost } from '@src/queries/hooks'
import { checkAuth } from '@src/libs/localStorage'
import { useMemo } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { TCreatePost } from '@src/modules'

import FormInput from './components/FormInput'

function CreatePost() {
  const token = checkAuth()
  const navigate = useNavigate()
  const [form] = Form.useForm<TCreatePost>()
  const {
    data: taxonomyMakeTreeData,
    isLoading: isLoadingTaxonomyMakeTree,
    isFetching: isFetchingTaxonomyMakeTree,
  } = useQueryTaxonomyMakeTree('POST', token)
  const taxonomy = useMemo(
    () => (taxonomyMakeTreeData?.data ? taxonomyMakeTreeData?.data.children : []),
    [taxonomyMakeTreeData, isLoadingTaxonomyMakeTree, isFetchingTaxonomyMakeTree],
  )

  const { mutate: mutateCreatePost, isLoading: isLoadingCreatePost } = useMutationCreatePost()
  const onFinish = (values: TCreatePost) => {
    mutateCreatePost(values, {
      onSuccess: () => {
        navigate('/post')
      },
    })
  }

  return (
    <Col span={24}>
      <HeadHtml title="Create post" />
      <FormSidebar onFinish={onFinish} form={form} isLoading={isLoadingTaxonomyMakeTree}>
        <>
          <FormSidebar.Content>
            <Card hoverable title={<PageHeader title="Create post" isSearch={false} inCard />}>
              <FormInput form={form} />
            </Card>
          </FormSidebar.Content>
          <FormSidebar.Sidebar>
            <Row gutter={[0, 24]}>
              <Col span={24}>
                <ActionPublish
                  showInput={{ scheduleAt: true, status: true }}
                  onPublish={() => form.submit()}
                  loadingPublish={isLoadingCreatePost}
                />
              </Col>
              <Col span={24}>
                <Collapse defaultActiveKey={['1']} expandIconPosition="end">
                  <Collapse.Panel
                    header="Categories"
                    key="1"
                    extra={
                      <Link to="/create-category">
                        <Space>
                          <PlusOutlined />
                          Add category
                        </Space>
                      </Link>
                    }
                  >
                    <SelectTreeInput
                      name="taxonomies"
                      data={taxonomy}
                      fieldNames={{ label: 'name', value: '_id', children: 'children' }}
                    />
                  </Collapse.Panel>
                </Collapse>
              </Col>
              <Col span={24}>
                <Collapse defaultActiveKey={['1']} expandIconPosition="end">
                  <Collapse.Panel header="Thumbnail" key="1">
                    <SelectSingleFileFormItem form={form} name="thumbnailId" />
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

export default CreatePost
