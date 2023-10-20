import { FORMAT_TIME_DEFAULT } from '@src/configs/const.config'
import { TTaxonomyMakeTree } from '@src/modules'
import { queryClient } from '@src/queries'
import { useMutationRemoveLayoutById } from '@src/queries/hooks'
import { LIST_LAYOUT } from '@src/queries/keys'
import { Popconfirm, Button, Space, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { Link, useNavigate } from 'react-router-dom'

export const columnsTableLayout = (prefixDetailUrl: string, postType: string): ColumnsType<TTaxonomyMakeTree> => {
  const navigate = useNavigate()
  const { mutate } = useMutationRemoveLayoutById()
  return [
    {
      title: 'Tên',
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
      title: 'Hàng',
      dataIndex: 'row',
      key: 'row',
      render: (v) => v || '__',
    },
    {
      title: 'Cột',
      dataIndex: 'column',
      key: 'column',
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
          <Button type="link" onClick={() => navigate(`/layout-room/${record._id}`)}>
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
