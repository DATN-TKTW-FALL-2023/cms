import { labelStyle } from '@configs/const.config'
import { checkAuth } from '@libs/localStorage'
import { TUser } from '@src/modules'
import { useQueryListRole } from '@queries/hooks'
import { Form, Input, Select } from 'antd'
import { useMemo } from 'react'
import type { SelectProps } from 'antd'
import { regexPwdStrong, regexUsername } from '@utils/regex'

type TFormInput = {
  data?: TUser
}

function FormInput({ data }: TFormInput) {
  const token = checkAuth()
  const currentRoles: string[] = useMemo(() => {
    if (data && data?.roles?.length > 0) {
      return data?.roles?.map((role) => role._id)
    }
    return []
  }, [data])
  const {
    data: rolesData,
    isLoading: isLoadingRoles,
    isFetching: isFetchingRoles,
  } = useQueryListRole({ limit: 0 }, token)
  const roleOptions: SelectProps['options'] = useMemo(() => {
    if (rolesData?.data && rolesData?.data?.length > 0) {
      return rolesData?.data?.map((role) => ({ label: role.code, value: role._id, key: role._id }))
    }
    return []
  }, [rolesData, isLoadingRoles, isFetchingRoles])
  return (
    <>
      <Form.Item
        name="username"
        label="Username"
        {...labelStyle}
        initialValue={data?.username}
        rules={[
          {
            required: true,
            message: 'Username is required!',
          },
          {
            pattern: regexUsername,
            message: 'Username must not contain special characters, at least 3 characters and up to 30 characters!',
          },
        ]}
      >
        <Input placeholder="Please enter username" />
      </Form.Item>
      <Form.Item
        name="firstName"
        label="First name"
        {...labelStyle}
        initialValue={data?.firstName}
        rules={[
          {
            required: true,
            message: 'First name is required!',
          },
        ]}
      >
        <Input placeholder="Please enter first name" />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Last name"
        {...labelStyle}
        initialValue={data?.lastName}
        rules={[
          {
            required: true,
            message: 'Last name is required!',
          },
        ]}
      >
        <Input placeholder="Please enter last name" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        {...labelStyle}
        initialValue={data?.email}
        rules={[
          {
            type: 'email',
            message: 'Email invalid!',
          },
        ]}
      >
        <Input placeholder="Please enter email" />
      </Form.Item>
      {!data && (
        <>
          <Form.Item
            name="password"
            label="Password"
            {...labelStyle}
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
            <Input.Password placeholder="Please enter password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm password"
            {...labelStyle}
            hasFeedback
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'))
                },
              }),
            ]}
          >
            <Input.Password placeholder="Please enter confirm password" />
          </Form.Item>
        </>
      )}
      <Form.Item name="phone" label="Phone" {...labelStyle} initialValue={data?.phone}>
        <Input placeholder="Please enter phone" />
      </Form.Item>
      <Form.Item name="roles" label="Roles" {...labelStyle} initialValue={currentRoles}>
        <Select placeholder="Please select role" options={roleOptions} mode="multiple" allowClear />
      </Form.Item>
    </>
  )
}

export default FormInput
