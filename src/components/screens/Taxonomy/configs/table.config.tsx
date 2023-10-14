import { FORMAT_TIME_DEFAULT } from '@src/configs/const.config'
import { TTaxonomyMakeTree } from '@src/modules'
import { queryClient } from '@src/queries'
import { useMutationRemoveTaxonomyById } from '@src/queries/hooks'
import { MAKE_TREE_TAXONOMY } from '@src/queries/keys'
import { Popconfirm, Button, Space, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { Link, useNavigate } from 'react-router-dom'

export const columnsTableTaxonomy = (prefixDetailUrl: string, postType: string): ColumnsType<TTaxonomyMakeTree> => {
  const navigate = useNavigate()
  const { mutate } = useMutationRemoveTaxonomyById()
  return [
    {
      title: 'Name',
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
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (v) => v || '__',
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
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
          <Button type="link" onClick={() => navigate(`/${prefixDetailUrl}/${record._id}`)}>
            Detail
          </Button>
          <Popconfirm
            placement="topRight"
            title="Are you sure?"
            onConfirm={() =>
              mutate(record._id, {
                onSuccess: () => {
                  queryClient.refetchQueries([MAKE_TREE_TAXONOMY, postType])
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
