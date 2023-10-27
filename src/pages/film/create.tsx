import HeadHtml from '@components/layout/HeadHtml'
import FormSidebar from '@components/layout/FormSidebar'
import ActionPublish from '@components/widgets/ActionPublish'
import PageHeader from '@components/widgets/PageHeader'
import { Badge, Card, Col, Collapse, Form, Input, Row, Select, Space } from 'antd'
import {
  useQueryListLayout,
  useQueryTaxonomyMakeTree,
  useMutationCreateFilm,
} from '@src/queries/hooks'
import { checkAuth } from '@src/libs/localStorage'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TCreatePost, TQueryLayout } from '@src/modules'
import { EOrder, EOrderBy } from '@src/configs/interface.config'
import SelectTreeInput from '@src/components/widgets/SelectTreeInput'
import SelectSingleFileFormItem from '@src/components/widgets/SelectSingleFileFormItem'
import { PlusOutlined } from '@ant-design/icons'
const LIMIT = 20

function CreateFilm() {
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
    isLoading: isLoadingListLayout,
  } = useQueryListLayout(params, token)

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
    console.log(values);
    mutateCreateFilm(values, {
      onSuccess: () => {
        console.log(values);
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
                name="name"
                label="Tên phim"
                rules={[
                  {
                    required: true,
                    message: 'Tên phòng là bắt buộc!',
                  },
                ]}
              >
                <Input placeholder="Please enter title" />
              </Form.Item>
              <Form.Item
                name="director"
                label="Đạo diễn"
                rules={[
                  {
                    required: true,
                    message: 'Đạo diễn là bắt buộc!',
                  },
                ]}
              >
                <Input placeholder="Please enter title" />
              </Form.Item>
              <Form.Item
                name="actor"
                label="Diễn Viên"
                rules={[
                  {
                    required: true,
                    message: 'Diễn Viên là bắt buộc!',
                  },
                ]}
              >
                <Input placeholder="Please enter title" />
              </Form.Item>
              <Form.Item
                name="content"
                label="Nội dung"
                rules={[
                  {
                    required: true,
                    message: 'Nội dung phim bắt buộc!',
                  },
                ]}
              >
                <Input placeholder="Please enter title" />
              </Form.Item>
              <Form.Item
                name="trailerUrl"
                label="trailerUrl"
                rules={[
                  {
                    required: true,
                    message: 'trailerUrl phim bắt buộc!',
                  },
                ]}
              >
                <Input placeholder="Please enter title" />
              </Form.Item>
              <Form.Item name="excerpt" label="Ghi chú">
                <Input.TextArea placeholder="Please enter excerpt" rows={4} />
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
                <ActionPublish
                  showInput={{ scheduleAt: true }}
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

export default CreateFilm
