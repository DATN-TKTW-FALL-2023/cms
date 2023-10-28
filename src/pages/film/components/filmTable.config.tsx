import { FORMAT_TIME_DEFAULT } from '@src/configs/const.config'
import { TTaxonomyMakeTree } from '@src/modules'
import { queryClient } from '@src/queries'
import { useMutationRemoveRoomById } from '@src/queries/hooks'
import { LIST_LAYOUT } from '@src/queries/keys'
import { Popconfirm, Button, Space, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { Link, useNavigate } from 'react-router-dom'

export const columnsTableLayout = (prefixDetailUrl: string, postType: string): ColumnsType<TTaxonomyMakeTree> => {
  const navigate = useNavigate()
  const { mutate } = useMutationRemoveRoomById()
  return [
    {
      title: 'Tên phim',
      dataIndex: 'name',
      key: 'name',
      render(name, record) {
        return (
          <Link to={`/${prefixDetailUrl}/${record._id}`}>
            <Typography.Text>{name}</Typography.Text>
          </Link>
        )
      },
    },
    {
      title: 'Đạo diễn',
      dataIndex: 'director',
      key: 'director',
      render: (director) => director,
    },
    {
      title: 'Diễn viên',
      dataIndex: 'actor',
      key: 'actor',
      render: (actor) => actor,
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
      render: (content) => content,
    },
    {
      title: 'Ghi chú',
      dataIndex: 'excerpt',
      key: 'excerpt',
      render: (excerpt) => excerpt,
    },
    {
      title: 'Ảnh nhỏ',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (thumbnail) => <img src={thumbnail} alt="Thumbnail" style={{ width: '100px' }} />,
    },
    {
      title: 'Phân loại phim',
      dataIndex: 'taxonomies',
      key: 'taxonomies',
      render: (taxonomies) => (
        <>
          {taxonomies.map((taxonomy:any) => (
            <span key={taxonomy._id}>{taxonomy.name}</span>
          ))}
        </>
      ),
    },
    {
      title: 'Published',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value) => dayjs(value).format(FORMAT_TIME_DEFAULT),
    },
    {
      title: 'trailerUrl',
      dataIndex: 'trailerUrl',
      key: 'trailerUrl',
      render: (trailerUrl) => trailerUrl,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: TTaxonomyMakeTree) => (
        <Space>
          <Button type="link" onClick={() => navigate(`/room/${record._id}`)}>
            Detail
          </Button>
          <Popconfirm
            placement="topRight"
            title="Are you sure?"
            onConfirm={() =>
              mutate(record._id, {
                onSuccess: () => {
                  queryClient.refetchQueries([LIST_LAYOUT, postType])
                },
              })
            }
          >
            <Button type="link">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]
}

