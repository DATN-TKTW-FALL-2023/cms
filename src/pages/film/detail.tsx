import HeadHtml from '@components/layout/HeadHtml'
import FormSidebar from '@components/layout/FormSidebar'
import ActionPublish from '@components/widgets/ActionPublish'
import PageHeader from '@components/widgets/PageHeader'
import { Badge, Card, Col, Collapse, Form, Input, Row, Select, Space } from 'antd'
import {
  useQueryListLayout,
  useMutationCreateRoom,
  useQueryGetRoomById,
  useMutationUpdateRoomById,
  useQueryGetFilmById,
  useMutationUpdateFilmById,
} from '@src/queries/hooks'
import { checkAuth } from '@src/libs/localStorage'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { TCreatePost, TQueryLayout } from '@src/modules'
import { EOrder, EOrderBy } from '@src/configs/interface.config'
const LIMIT = 20

function DetailFilm() {
  const token = checkAuth()
  const navigate = useNavigate()
  const { id } = useParams()
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
                name="content"
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
              <Form.Item
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
                <ActionPublish onPublish={() => form.submit()} loadingPublish={isLoadingCreateFilm} />
              </Col>
            </Row>
          </FormSidebar.Sidebar>
        </>
      </FormSidebar>
    </Col>
  )
}

export default DetailFilm
