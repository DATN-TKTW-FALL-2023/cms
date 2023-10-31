import { FORMAT_TIME_DEFAULT } from '@src/configs/const.config'
import { TTaxonomyMakeTree } from '@src/modules'
import { queryClient } from '@src/queries'
import { useMutationRemoveFilmById } from '@src/queries/hooks'
import { LIST_FILM } from '@src/queries/keys'
import { Popconfirm, Button, Space, Typography, Image } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { Link, useNavigate } from 'react-router-dom'
import placeholderImage from '@assets/placeholder-image.jpeg'

export const columnsTableFilm = (): ColumnsType<TTaxonomyMakeTree> => {
  const navigate = useNavigate()
  const { mutate } = useMutationRemoveFilmById()
  return [
    {
      title: 'Tên phim',
      dataIndex: 'name',
      key: 'name',
      render(name, record) {
        return (
          <Link to={`/film/${record._id}`}>
            <Typography.Text>{name}</Typography.Text>
          </Link>
        )
      },
      sorter: true,
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
      render: (v) => <Image width={70} height={70} src={v?.location || placeholderImage} preview />,
    },
    {
      title: 'Phân loại phim',
      dataIndex: 'taxonomies',
      key: 'taxonomies',
      render: (taxonomies) => (
        <>
          {taxonomies.map((taxonomy: any) => (
            <span key={taxonomy._id}>{taxonomy.name}</span>
          ))}
        </>
      ),
    },
    {
      title: 'Published',
      dataIndex: 'scheduleAt',
      key: 'scheduleAt',
      render: (value) => dayjs(value).format(FORMAT_TIME_DEFAULT),
      sorter: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: TTaxonomyMakeTree) => (
        <Space>
          <Button type="link" onClick={() => navigate(`/detail-film/${record._id}`)}>
            Detail
          </Button>
          <Popconfirm
            placement="topRight"
            title="Are you sure?"
            onConfirm={() =>
              mutate(record._id, {
                onSuccess: () => {
                  queryClient.invalidateQueries([LIST_FILM])
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
