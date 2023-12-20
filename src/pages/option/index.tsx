import FormSidebar from '@components/layout/FormSidebar'
import ActionPublish from '@components/widgets/ActionPublish'
import HeadHtml from '@components/layout/HeadHtml'
import PageHeader from '@components/widgets/PageHeader'
import { checkAuth } from '@libs/localStorage'
import { queryClient } from '@queries/index'
import { LIST_OPTION } from '@queries/keys'
import { Badge, Card, Col, Collapse, Form, Input, InputNumber, Select } from 'antd'
import { useNavigate } from 'react-router-dom'
import SelectMultipleFileFormItem from '@src/components/widgets/SelectMultipleFileFormItem'
import { useMutationUpdateOption, useQueryGetListOption } from '@src/queries/hooks/option'
import { labelStyle } from '@src/configs/const.config'
import { useEffect, useMemo, useState } from 'react'
import { EOrder, EOrderBy } from '@src/configs/interface.config'
const LIMIT = 20
function OptionManager() {
  const token = checkAuth()
  const [form] = Form.useForm<any>()
  const [params, setParams] = useState<any>({
    page: 1,
    limit: LIMIT,
    order: EOrder.DESC,
    orderBy: EOrderBy.CREATED_DATE,
  })
  const { mutate, isLoading } = useMutationUpdateOption()
  const navigate = useNavigate()
  const {
    data: listOption,
    isLoading: isLoadingListOption,
    isFetching: isFetchingListOption,
  } = useQueryGetListOption(params, token)
  const listOptionData = useMemo(() => listOption?.data, [listOption, isLoadingListOption, isFetchingListOption])

  const onFinish = (values: any) => {
    const convertedData = {
      options: Object.keys(values).map((key) => ({
        key: key,
        value: values[key],
      })),
    }

    mutate(JSON.stringify(convertedData, null, 2), {
      onSuccess: () => {
        queryClient.refetchQueries([LIST_OPTION])
        navigate('/options')
      },
    })
  }

  useEffect(() => {
    if (listOptionData?.length) {
      const initialValues = listOptionData.reduce((acc: any, cur: any) => {
        acc[cur.key] = cur.value
        return acc
      }, {})
      form.setFieldsValue(initialValues)
    }
  }, [listOptionData])

  return (
    <>
      <HeadHtml title="Quản lý chung" />
      <Col span={24}>
        <FormSidebar scrollToFirstError form={form} onFinish={onFinish} isLoading={isLoadingListOption}>
          <>
            <FormSidebar.Content>
              <Card hoverable title={<PageHeader title="Quản lý Hệ Thống" isSearch={false} inCard />}>
                <Form.Item
                  name="LOGO"
                  label="Ảnh Logo"
                  {...labelStyle}
                  rules={[
                    {
                      required: true,
                      message: 'Logo là bắt buộc',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="BANNER"
                  label="Ảnh Banner"
                  {...labelStyle}
                  rules={[
                    {
                      required: true,
                      message: 'Ảnh là bắt buộc',
                    },
                  ]}
                >
                  <Input placeholder="https://i.imgur.com/c32nk43M.png" />
                </Form.Item>
              </Card>
            </FormSidebar.Content>
            <FormSidebar.Sidebar>
              <Col span={24}>
                <ActionPublish onPublish={() => form.submit()} loadingPublish={isLoading} />.
              </Col>
            </FormSidebar.Sidebar>
          </>
        </FormSidebar>
      </Col>
    </>
  )
}

export default OptionManager
