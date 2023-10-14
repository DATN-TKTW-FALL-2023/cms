/* eslint-disable react/function-component-definition */
import { TEditSlug } from '@configs/interface.config'
import { Form, Input, Modal } from 'antd'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

type TEditSlugModal = {
  slug: string | undefined
  onSave: (s: string) => void
  confirmLoading?: boolean
}

export type THandleEditSlugModal = {
  onOpen: (x: boolean) => void
}

export const EditSlugModal: React.ForwardRefRenderFunction<THandleEditSlugModal, TEditSlugModal> = (
  { slug, onSave, confirmLoading },
  ref,
) => {
  const [isOpen, setIsOpen] = useState(false)
  const [form] = Form.useForm<TEditSlug>()
  const onFinish = ({ slug }: TEditSlug) => {
    void onSave(slug)
  }

  useImperativeHandle(ref, () => ({
    onOpen: (x) => setIsOpen(x),
  }))

  useEffect(() => {
    form.setFieldsValue({ slug })
  }, [slug])

  return (
    <Modal
      open={isOpen}
      title="Edit Slug"
      okText="Save"
      confirmLoading={!!confirmLoading}
      onCancel={() => setIsOpen(false)}
      onOk={() => form.submit()}
      forceRender
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="slug" rules={[{ required: true, message: 'Slug is required!' }]}>
          <Input placeholder="Please enter slug" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default forwardRef(EditSlugModal)
