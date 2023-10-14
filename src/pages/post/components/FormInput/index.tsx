import TinymceInput from '@src/components/widgets/TinymceInput'
import { labelStyle } from '@src/configs/const.config'
import { TPost } from '@src/modules'
import { Form, FormInstance, Input } from 'antd'

type TFormInput = {
  data?: TPost
  form: FormInstance
}
function FormInput({ data, form }: TFormInput) {
  return (
    <>
      <Form.Item
        name="name"
        label="Title"
        {...labelStyle}
        initialValue={data?.name}
        rules={[
          {
            required: true,
            message: 'Username is required!',
          },
          {
            max: 255,
            message: 'Name cannot be longer than 255 characters',
          },
          {
            min: 3,
            message: 'Name must be at least 3 characters',
          },
        ]}
      >
        <Input placeholder="Please enter title" />
      </Form.Item>
      <Form.Item name="excerpt" label="Excerpt" {...labelStyle} initialValue={data?.excerpt}>
        <Input.TextArea placeholder="Please enter excerpt" rows={4} />
      </Form.Item>
      <Form.Item name="content" label="Content" {...labelStyle} initialValue={data?.content}>
        <TinymceInput
          {...labelStyle}
          initialValue={data?.content}
          onEditorChange={(v) => form.setFieldsValue({ content: v })}
          h={1000}
        />
      </Form.Item>
    </>
  )
}

export default FormInput
