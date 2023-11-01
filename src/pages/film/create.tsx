import HeadHtml from '@components/layout/HeadHtml'
import FormSidebar from '@components/layout/FormSidebar'
import ActionPublish from '@components/widgets/ActionPublish'
import PageHeader from '@components/widgets/PageHeader'
import { Card, Col, Collapse, Form, Input, Row, Space } from 'antd'
import { useQueryTaxonomyMakeTree, useMutationCreateFilm } from '@src/queries/hooks'
import { checkAuth } from '@src/libs/localStorage'
import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TCreatePost } from '@src/modules'
import SelectTreeInput from '@src/components/widgets/SelectTreeInput'
import SelectSingleFileFormItem from '@src/components/widgets/SelectSingleFileFormItem'
import { PlusOutlined } from '@ant-design/icons'
import { labelStyle } from '@src/configs/const.config'
import TinymceInput from '@src/components/widgets/TinymceInput'

function CreateFilm() {
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

  const { mutate: mutateCreateFilm, isLoading: isLoadingCreateRoom } = useMutationCreateFilm()

  const onFinish = (values: any) => {
    console.log(values)
    mutateCreateFilm(values, {
      onSuccess: () => {
        navigate('/list-film')
      },
    })
  }

  return (
    <Col span={24}>
      <HeadHtml title="Thêm Film" />
      <FormSidebar onFinish={onFinish} form={form}>
        <>
          <FormSidebar.Content>
            <Card hoverable title={<PageHeader title="Thêm Film" isSearch={false} inCard />}>
              <Form.Item
                name="name"
                label="Tên phim"
                {...labelStyle}
                rules={[
                  {
                    required: true,
                    message: 'Tên phòng là bắt buộc!',
                  },
                ]}
              >
                <Input placeholder="Please enter title" />
              </Form.Item>
              <Form.Item name="director" label="Đạo diễn" {...labelStyle}>
                <Input placeholder="Please enter title" />
              </Form.Item>
              <Form.Item name="actor" {...labelStyle} label="Diễn Viên">
                <Input placeholder="Please enter title" />
              </Form.Item>
              <Form.Item
                name="duration"
                label="Thời lượng"
                {...labelStyle}
                rules={[
                  {
                    required: true,
                    message: 'Thời lượng là bắt buộc!',
                  },
                ]}
              >
                 <Input placeholder="Please enter title" />
              </Form.Item>
              <Form.Item name="content" {...labelStyle} label="Nội dung">
                <TinymceInput {...labelStyle} onEditorChange={(v) => form.setFieldsValue({ content: v })} h={400} />
              </Form.Item>
              <Form.Item name="trailerUrl" {...labelStyle} label="trailerUrl">
                <Input placeholder="Please enter title" />
              </Form.Item>
              <Form.Item name="excerpt" label="Ghi chú" {...labelStyle}>
                <Input.TextArea placeholder="Please enter excerpt" rows={4} />
              </Form.Item>
            </Card>
          </FormSidebar.Content>
          <FormSidebar.Sidebar>
            <Row gutter={[0, 24]}>
              <Col span={24}>
                <ActionPublish
                  showInput={{ scheduleAt: true, status: true }}
                  onPublish={() => form.submit()}
                  loadingPublish={isLoadingCreateRoom}
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
                    <SelectSingleFileFormItem form={form} name="thumbnail" />
                  </Collapse.Panel>
                </Collapse>
              </Col>
              <Col span={24}>
                <Collapse defaultActiveKey={['1']} expandIconPosition="end">
                  <Collapse.Panel header="Trailer" key="1">
                    <SelectSingleFileFormItem form={form} name="trailer" />
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

export default CreateFilm
