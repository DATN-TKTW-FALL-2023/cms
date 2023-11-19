import HeadHtml from '@components/layout/HeadHtml'
import FormSidebar from '@components/layout/FormSidebar'
import ActionPublish from '@components/widgets/ActionPublish'
import PageHeader from '@components/widgets/PageHeader'
import { Card, Col, Collapse, Form, Image, Input, Row, Select, Space } from 'antd'
import { useQueryGetFilmById, useMutationUpdateFilmById, useQueryTaxonomyMakeTree } from '@src/queries/hooks'
import { checkAuth } from '@src/libs/localStorage'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { TCreatePost, TQueryLayout } from '@src/modules'
import { EOrder, EOrderBy } from '@src/configs/interface.config'
import TinymceInput from '@src/components/widgets/TinymceInput'
import { labelStyle } from '@src/configs/const.config'
import SelectTreeInput from '@src/components/widgets/SelectTreeInput'
import { PlusOutlined } from '@ant-design/icons'
import SelectSingleFileFormItem from '@src/components/widgets/SelectSingleFileFormItem'
const LIMIT = 20

function DetailFilm() {
  const token = checkAuth()
  const navigate = useNavigate()
  const { id } = useParams()
  const [form] = Form.useForm<any>()
  const [params, setParams] = useState<TQueryLayout>({
    page: 1,
    limit: LIMIT,
    order: EOrder.DESC,
    orderBy: EOrderBy.CREATED_DATE,
  })

  const {
    data: taxonomyMakeTreeData,
    isLoading: isLoadingTaxonomyMakeTree,
    isFetching: isFetchingTaxonomyMakeTree,
  } = useQueryTaxonomyMakeTree('POST', token)
  const taxonomy = useMemo(
    () => (taxonomyMakeTreeData?.data ? taxonomyMakeTreeData?.data.children : []),
    [taxonomyMakeTreeData, isLoadingTaxonomyMakeTree, isFetchingTaxonomyMakeTree],
  )

  const { mutate: mutateUpdateFilm, isLoading: isLoadingCreateFilm } = useMutationUpdateFilmById()

  const onFinish = (values: any) => {
    if (id)
      mutateUpdateFilm(
        { id, data: values },
        {
          onSuccess: () => {
            navigate('/film')
          },
        },
      )
  }
  const { data: FilmData, isLoading: isFilmDataLoading } = useQueryGetFilmById(id || '')

  useEffect(() => {
    if (FilmData) {
      form.setFieldsValue({
        name: FilmData?.data?.name,
        director: FilmData?.data?.director,
        trailerUrl: FilmData?.data?.trailerUrl,
        actor: FilmData?.data?.actor,
        content: FilmData?.data?.content,
        excerpt: FilmData?.data?.excerpt,
      })
    }
  }, [FilmData])

  return (
    <Col span={24}>
      <HeadHtml title="Sửa Film" />
      <FormSidebar onFinish={onFinish} form={form} isLoading={isFilmDataLoading}>
        <>
          <FormSidebar.Content>
            <Card hoverable title={<PageHeader title="Sửa Film" isSearch={false} inCard />}>
              <Form.Item
                {...labelStyle}
                name="name"
                label="Tên Film"
                rules={[
                  {
                    required: true,
                    message: 'Tên Film là bắt buộc!',
                  },
                ]}
              >
                <Input placeholder="Please enter title" />
              </Form.Item>
              <Form.Item
                {...labelStyle}
                name="director"
                label="Đạo diễn"
                rules={[
                  {
                    required: true,
                    message: 'Tên Film là bắt buộc!',
                  },
                ]}
              >
                <Input placeholder="Please enter title" />
              </Form.Item>

              <Form.Item
                {...labelStyle}
                name="actor"
                label="Diễn viên"
                rules={[
                  {
                    required: true,
                    message: 'Tên Film là bắt buộc!',
                  },
                ]}
              >
                <Input placeholder="Please enter title" />
              </Form.Item>
              <Form.Item
                {...labelStyle}
                name="content"
                label="Nội dung"
                rules={[
                  {
                    required: true,
                    message: 'Tên Film là bắt buộc!',
                  },
                ]}
              >
                <TinymceInput
                  initialValue={FilmData?.data?.content}
                  onEditorChange={(v) => form.setFieldsValue({ content: v })}
                  h={400}
                />
              </Form.Item>
              <Form.Item
                {...labelStyle}
                name="trailerUrl"
                label="Trailer Url"
                rules={[
                  {
                    required: true,
                    message: 'Trailer Url là bắt buộc!',
                  },
                ]}
              >
                <Input placeholder="Please enter title" />
              </Form.Item>
              <Form.Item
                {...labelStyle}
                name="excerpt"
                label="Nội dung"
                rules={[
                  {
                    required: true,
                    message: 'Tên Film là bắt buộc!',
                  },
                ]}
              >
                <Input placeholder="Please enter title" />
              </Form.Item>
            </Card>
          </FormSidebar.Content>
          <FormSidebar.Sidebar>
            <Row gutter={[0, 24]}>
              <Col span={24}>
                <ActionPublish onPublish={() => form.submit()} loadingPublish={isFilmDataLoading} />
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
                    <Image src={FilmData?.data?.thumbnail?.location} />
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

export default DetailFilm
