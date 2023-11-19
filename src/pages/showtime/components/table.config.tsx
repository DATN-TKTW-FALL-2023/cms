import { FORMAT_TIME_DEFAULT } from '@src/configs/const.config'
import { TTaxonomyMakeTree } from '@src/modules'
import { queryClient } from '@src/queries'
import { useMutationRemoveLayoutById } from '@src/queries/hooks'
import { useMutationRemoveShowtimeById } from '@src/queries/hooks/showtime'
import { LIST_LAYOUT, LIST_SHOWTIME } from '@src/queries/keys'
import { Popconfirm, Button, Space, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { Link, useNavigate } from 'react-router-dom'

export const columnsTableShowTime = (): ColumnsType<any> => {
  const navigate = useNavigate()
  const { mutate } = useMutationRemoveShowtimeById()
  return [
    {
      title: 'Phim',
      dataIndex: 'film',
      key: 'film',
      render(film, record) {
        console.log(film)
        return (
          <Link to={`/showtime/${record._id}`}>
            <Typography.Text>{film?.name}</Typography.Text>
          </Link>
        )
      },
    },
    {
      title: 'Giờ chiếu',
      dataIndex: 'film',
      key: 'film',
      render: (v) => v.scheduleAt || '__',
    },
    {
      title: 'Published',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value) => dayjs(value).format(FORMAT_TIME_DEFAULT),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: TTaxonomyMakeTree) => (
        <Space>
          <Button type="link" onClick={() => navigate(`/showtime/${record._id}`)}>
            Detail
          </Button>
          <Popconfirm
            placement="topRight"
            title="Are you sure?"
            onConfirm={() =>
              mutate(record._id, {
                onSuccess: () => {
                  queryClient.refetchQueries([LIST_SHOWTIME])
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
