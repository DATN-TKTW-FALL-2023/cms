/* eslint-disable react/function-component-definition */
import { TSetPassword } from '@src/modules'
import { useMutationSetPassword } from '@src/queries/hooks'
import { regexPwdStrong } from '@src/utils/regex'
import { Form, Input, Modal } from 'antd'
import { forwardRef, useImperativeHandle, useState } from 'react'

export type THandleSetPasswordModal = {
  onOpen: (x: boolean) => void
}

type TSetPasswordModal = {
  userId?: string
}

const SetPasswordModal: React.ForwardRefRenderFunction<THandleSetPasswordModal, TSetPasswordModal> = (
  { userId },
  ref,
) => {
  const [form] = Form.useForm<TSetPassword>()
  const [isOpen, setIsOpen] = useState(false)

  useImperativeHandle(ref, () => ({
    onOpen: (x) => setIsOpen(x),
  }))

  const onClose = () => {
    setIsOpen(false)
    form.resetFields()
  }

  const { mutate, isLoading } = useMutationSetPassword()
  const onFinish = (values: TSetPassword) => {
    if (userId) {
      mutate(
        { id: userId, data: values },
        {
          onSuccess: () => {
            void onClose()
          },
        },
      )
    }
  }

  return (
    <Modal
      open={isOpen}
      title="Generate new password for user"
      width={450}
      onCancel={onClose}
      onOk={() => form.submit()}
      confirmLoading={isLoading}
      forceRender
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          name="newPassword"
          label="New password"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Password is required!',
            },
            {
              pattern: regexPwdStrong,
              message:
                'Password must be between 6 and 15 characters, in which there must be at least 1 special character, 1 number and 1 uppercase letter!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm password"
          hasFeedback
          dependencies={['newPassword']}
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'))
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default forwardRef(SetPasswordModal)
