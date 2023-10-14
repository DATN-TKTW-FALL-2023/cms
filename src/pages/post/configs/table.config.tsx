import { FORMAT_TIME_DEFAULT, STATUS_DOCUMENT_FILTER } from '@configs/const.config'
import { EStatusDoc } from '@configs/interface.config'
import { fnStatusBadge } from '@libs/status'
import { TPost, TTaxonomy, TTaxonomyMakeTree, TUser } from '@modules/index'
import { useMutationRemovePostById } from '@src/queries/hooks'
import { Button, Popconfirm, Space, Tag, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { Link, useNavigate } from 'react-router-dom'

export const columnTablePost = (taxonomyMakeTree: TTaxonomyMakeTree[]): ColumnsType<TPost> => {
  const navigate = useNavigate()
  const { mutate } = useMutationRemovePostById()
  return [
    {
      title: 'Title',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      render(name, record) {
        return (
          <Link to={`/detail-post/${record._id}`}>
            <Typography.Text>{name}</Typography.Text>
          </Link>
        )
      },
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      render(author: TUser) {
        return author?.username ? <Link to={`/detail-user/${author._id}`}>{author.username}</Link> : '__'
      },
    },
    {
      title: 'Categories',
      dataIndex: 'taxonomies',
      key: 'taxonomies',
      ellipsis: {
        showTitle: false,
      },
      render(taxonomies: TTaxonomy[]) {
        return taxonomies?.length > 0 ? (
          <span>
            {taxonomies?.map((tax, index) => (
              <Tag key={index}>{tax.name}</Tag>
            ))}
          </span>
        ) : (
          '__'
        )
      },
      filters: taxonomyMakeTree,
      filterMode: 'tree',
      filterSearch: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render(status: EStatusDoc) {
        return fnStatusBadge(status)
      },
      filters: STATUS_DOCUMENT_FILTER,
      filterMultiple: false,
    },
    {
      title: 'Published',
      dataIndex: 'scheduleAt',
      key: 'scheduleAt',
      render: (value) => dayjs(value).format(FORMAT_TIME_DEFAULT),
      sorter: true,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value) => dayjs(value).format(FORMAT_TIME_DEFAULT),
      sorter: true,
    },
    {
      title: 'Action',
      key: 'action',
      render(_, record: TPost) {
        return (
          <Space size="middle">
            <Button type="link" onClick={() => navigate(`/detail-post/${record._id}`)}>
              Detail
            </Button>
            <Popconfirm placement="topRight" title="Are you sure?" onConfirm={() => mutate(record._id)}>
              <Button type="link">Delete</Button>
            </Popconfirm>
          </Space>
        )
      },
    },
  ]
}
