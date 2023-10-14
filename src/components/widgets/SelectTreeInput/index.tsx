import { Form, FormItemProps, TreeSelect } from 'antd'
import { FieldNamesType } from 'antd/es/cascader'

type TTreeData = {
  [key: string]: any
  children: TTreeData[]
}

type TSelectTreeInput = {
  data?: TTreeData[]
  fieldNames?: FieldNamesType
}

function SelectTreeInput({ data, fieldNames, ...props }: TSelectTreeInput & FormItemProps) {
  return (
    <Form.Item {...props}>
      <TreeSelect
        showSearch
        style={{ width: '100%' }}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select item"
        allowClear
        multiple
        treeDefaultExpandAll
        treeData={data}
        fieldNames={fieldNames}
      />
    </Form.Item>
  )
}

export default SelectTreeInput
