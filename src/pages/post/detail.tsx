import HeadHtml from '@components/layout/HeadHtml'
import FormSidebar from '@components/layout/FormSidebar'
import ActionPublish from '@components/widgets/ActionPublish'
import PageHeader from '@components/widgets/PageHeader'
import { checkAuth } from '@libs/localStorage'
import {
  useQueryTaxonomyMakeTree,
  useQueryPostById,
  useMutationPatchPostById,
  useMutationRemovePostById,
  useMutationPutSlugPostById,
} from '@queries/hooks'
import { Card, Col, Collapse, Form, Row, Space } from 'antd'
import { useMemo, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons'
import SelectTreeInput from '@components/widgets/SelectTreeInput'
import SelectSingleFileFormItem from '@components/widgets/SelectSingleFileFormItem'
import { TPatchPost } from '@src/modules'
import EditSlugModal, { THandleEditSlugModal } from '@components/widgets/EditSlugModal'

import FormInput from './components/FormInput'

function DetailPost() {
  const { id } = useParams()
  const token = checkAuth()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const editSlugModalRef = useRef<null | THandleEditSlugModal>(null)
  const {
    data: postData,
    isLoading: isLoadingPostById,
    isFetching: isFetchingPostById,
  } = useQueryPostById(id || '', token)

  const post = useMemo(() => postData?.data, [postData, isLoadingPostById, isFetchingPostById])

  const {
    data: taxonomyMakeTreeData,
    isLoading: isLoadingTaxonomyMakeTree,
    isFetching: isFetchingTaxonomyMakeTree,
  } = useQueryTaxonomyMakeTree('POST', token)
  const taxonomy = useMemo(
    () => (taxonomyMakeTreeData?.data ? taxonomyMakeTreeData?.data.children : []),
    [taxonomyMakeTreeData, isLoadingTaxonomyMakeTree, isFetchingTaxonomyMakeTree],
  )

  const { mutate: mutatePatchPostById, isLoading: isLoadingPatchPostById } = useMutationPatchPostById()
  const onFinish = (values: TPatchPost) => {
    if (id) mutatePatchPostById({ id, data: values })
  }

  const { mutate: mutateRemovePostById, isLoading: isLoadingRemovePostById } = useMutationRemovePostById()
  const onDelete = () => {
    if (id)
      mutateRemovePostById(id, {
        onSuccess: () => {
          navigate('/post')
        },
      })
  }

  const { mutate: mutatePutSlugPostById, isLoading: isLoadingPutSlugPostById } = useMutationPutSlugPostById()
  const onUpdateSlug = (slug: string) => {
    if (id) {
      mutatePutSlugPostById(
        { id, slug },
        {
          onSuccess: () => {
            editSlugModalRef.current?.onOpen(false)
          },
        },
      )
    }
  }
  return (
    <>
      <Col span={24}>
        <HeadHtml title={post?.name || 'Detail post'} />
        <FormSidebar isLoading={isLoadingTaxonomyMakeTree || isLoadingPostById} form={form} onFinish={onFinish}>
          <>
            <FormSidebar.Content>
              <Card
                hoverable
                title={
                  <PageHeader
                    title={post?.name || 'Detail post'}
                    inCard
                    extra={[{ text: 'Edit slug', action: () => editSlugModalRef.current?.onOpen(true) }]}
                    isSearch={false}
                  />
                }
              >
                <FormInput form={form} data={post} />
              </Card>
            </FormSidebar.Content>
            <FormSidebar.Sidebar>
              <Row gutter={[0, 24]}>
                <Col span={24}>
                  <ActionPublish
                    showInput={{ scheduleAt: true, status: true }}
                    data={{
                      status: post?.status,
                      createdAt: post?.createdAt,
                      scheduleAt: post?.scheduleAt,
                    }}
                    onDelete={onDelete}
                    loadingUpdate={isLoadingPatchPostById}
                    onUpdate={() => form.submit()}
                    loadingDelete={isLoadingRemovePostById}
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
                        initialValue={
                          post?.taxonomies && post?.taxonomies.length > 0
                            ? post?.taxonomies.map((tax) => tax._id)
                            : undefined
                        }
                      />
                    </Collapse.Panel>
                  </Collapse>
                </Col>
                <Col span={24}>
                  <Collapse defaultActiveKey={['1']} expandIconPosition="end">
                    <Collapse.Panel header="Thumbnail" key="1">
                      <SelectSingleFileFormItem form={form} name="thumbnail" initialValue={post?.thumbnail} />
                    </Collapse.Panel>
                  </Collapse>
                </Col>
              </Row>
            </FormSidebar.Sidebar>
          </>
        </FormSidebar>
      </Col>
      <EditSlugModal
        slug={post?.slug}
        onSave={(x) => onUpdateSlug(x)}
        confirmLoading={isLoadingPutSlugPostById}
        ref={editSlugModalRef}
      />
    </>
  )
}

export default DetailPost
