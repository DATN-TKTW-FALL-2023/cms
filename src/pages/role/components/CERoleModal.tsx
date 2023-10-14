/* eslint-disable react/function-component-definition */
import { ROLE_INIT } from '@src/configs/const.config'
import { TResDataListApi } from '@src/configs/interface.config'
import { TPermission, TPostRole, TQueryRole, TRole } from '@src/modules'
import { queryClient } from '@src/queries'
import { useMutationPatchRoleById, useMutationPostRole } from '@src/queries/hooks'
import { LIST_ROLE } from '@src/queries/keys'
import { regexAZUppercase } from '@src/utils/regex'
import { Form, Input, Modal, TreeSelect } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { SHOW_CHILD } from 'rc-tree-select'
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react'

type TCERoleModal = {
  permissions: TPermission[]
  data?: TRole
  paramsQsRole?: TQueryRole
  onReset?: () => void
}

export type THandleCERoleModal = {
  onOpen: (v: boolean) => void
}

const CERoleModal: React.ForwardRefRenderFunction<THandleCERoleModal, TCERoleModal> = (
  { permissions, data, paramsQsRole, onReset },
  ref,
) => {
  const [isOpen, setIsOpen] = useState(false)
  const [form] = Form.useForm<TPostRole>()

  const treeDataPermission = useMemo(() => {
    const treeData: any = []
    permissions?.forEach((permissionGroup: any) => {
      const { group, permissions } = permissionGroup
      const children: any = []
      permissions.forEach((child: any) => {
        children.push({ title: child, value: child })
      })
      const newParent = {
        title: group,
        value: group,
        children,
      }
      treeData.push(newParent)
    })
    return treeData
  }, [permissions])

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        code: data.code,
        description: data.description,
        permissions: data.permissions,
      })
    }
  }, [data])

  const onClose = () => {
    form.setFieldsValue({
      code: undefined,
      description: undefined,
      permissions: undefined,
    })
    if (onReset) void onReset()
    setIsOpen(false)
  }

  const { mutate: mutatePatchRoleById, isLoading: isLoadingPatchRoleById } = useMutationPatchRoleById()
  const { mutate: mutatePostRole, isLoading: isLoadingPostRole } = useMutationPostRole()
  const onFinish = (values: TPostRole) => {
    if (data) {
      mutatePatchRoleById(
        { id: data._id, data: values },
        {
          onSuccess: () => {
            const old = queryClient.getQueryData<TResDataListApi<TRole[]>>([LIST_ROLE, JSON.stringify(paramsQsRole)])
            queryClient.setQueryData([LIST_ROLE, JSON.stringify(paramsQsRole)], () => {
              const oldData = old?.data || []
              if (oldData?.length <= 0) return { ...old, data: [] }
              const index = oldData.findIndex((item) => item._id === data._id)
              if (index >= 0)
                return {
                  ...old,
                  data: [...oldData.slice(0, index), { ...oldData[index], ...values }, ...oldData.slice(index + 1)],
                }
              return { ...old }
            })
            void onClose()
          },
        },
      )
    } else {
      mutatePostRole(values, {
        onSuccess: (res) => {
          const newRole = res.data
          const old = queryClient.getQueryData<TResDataListApi<TRole[]>>([LIST_ROLE, JSON.stringify(paramsQsRole)])
          queryClient.setQueryData([LIST_ROLE, JSON.stringify(paramsQsRole)], () => {
            const oldData = old?.data || []
            return {
              ...old,
              data: [newRole, ...oldData],
            }
          })
          void onClose()
        },
      })
    }
  }

  useImperativeHandle(ref, () => ({
    onOpen: (v) => setIsOpen(v),
  }))
  return (
    <Modal
      open={isOpen}
      title="Create/Edit role"
      forceRender
      onOk={() => form.submit()}
      onCancel={onClose}
      okText="Save"
      confirmLoading={!!isLoadingPatchRoleById || !!isLoadingPostRole}
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          name="code"
          label="Code"
          rules={[
            {
              required: true,
              message: 'Code is required!',
            },
            {
              pattern: regexAZUppercase,
              message: 'Code must be unsigned all-caps letters!',
            },
          ]}
        >
          <Input placeholder="Please type" disabled={data ? ROLE_INIT.includes(data?.code) : false} />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <TextArea placeholder="Please type" />
        </Form.Item>
        <Form.Item name="permissions" label="Permissions">
          <TreeSelect
            treeData={treeDataPermission}
            showCheckedStrategy={SHOW_CHILD}
            treeCheckable
            placeholder="New folder parent"
            bordered
            treeLine
            treeDefaultExpandAll
            dropdownMatchSelectWidth={false}
            allowClear
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default forwardRef(CERoleModal)
