/* eslint-disable react/function-component-definition */
import { Button, Col, Divider, Input, Modal, Row, Typography } from 'antd'
import MediaScreen, { THandleMediaScreen } from '@components/screens/Media'
import { FolderAddOutlined, UploadOutlined } from '@ant-design/icons'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { TFile } from '@src/modules'

type TMediaManagerModal = {
  isMultiselect?: boolean
  handleAddFile?: (files: TFile[]) => void
  filesSelectedInit?: TFile[]
}

export type THandleMediaManagerModal = {
  onOpen: (x: boolean) => void
}

const MediaManagerModal: React.ForwardRefRenderFunction<THandleMediaManagerModal, TMediaManagerModal> = (
  { isMultiselect = false, handleAddFile, filesSelectedInit },
  ref,
) => {
  const mediaScreenRef = useRef<null | THandleMediaScreen>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [filesSelected, setFilesSelected] = useState<TFile[]>([])

  useImperativeHandle(ref, () => ({
    onOpen: (x) => setIsOpen(x),
  }))

  useEffect(() => {
    setFilesSelected(filesSelectedInit || [])
  }, [isOpen])

  const handleSelectFile = (fileS: TFile) => {
    setFilesSelected((old) => {
      if (isMultiselect) {
        const index = old.findIndex((item) => item._id === fileS._id)
        if (index < 0) {
          return [...old, fileS]
        }
        return [...old.slice(0, index), ...old.slice(index + 1)]
      }
      return [fileS]
    })
  }
  return (
    <Modal
      open={isOpen}
      width="96%"
      bodyStyle={{ overflowY: 'auto', height: 'calc(100vh - 180px)' }}
      className="media-modal-container"
      okText="Select"
      forceRender
      onCancel={() => {
        mediaScreenRef.current?.resetStates()
        setIsOpen(false)
      }}
      onOk={() => {
        if (handleAddFile) handleAddFile(filesSelected)
        mediaScreenRef.current?.resetStates()
        setFilesSelected([])
        setIsOpen(false)
      }}
      title={
        <Row gutter={[10, 10]}>
          <Col>
            <Typography.Title level={4} style={{ margin: 0 }}>
              Media Manager
            </Typography.Title>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<FolderAddOutlined />}
              onClick={() => mediaScreenRef.current?.openModalAddFolder()}
            >
              Create Folder
            </Button>
          </Col>
          <Col>
            <Button type="primary" icon={<UploadOutlined />} onClick={() => mediaScreenRef.current?.openModalUpload()}>
              Upload File
            </Button>
          </Col>
          <Col>
            <Input.Search
              placeholder="Tìm kiếm"
              className="search-bar"
              name="search"
              allowClear
              size="middle"
              onSearch={(value) => mediaScreenRef.current?.onSearch(value)}
            />
          </Col>
        </Row>
      }
      zIndex={10000}
    >
      <Divider />
      <MediaScreen
        position="modal"
        ref={mediaScreenRef}
        filesSelected={filesSelected}
        handleSelectFile={(file) => handleSelectFile(file)}
      />
    </Modal>
  )
}

export default forwardRef(MediaManagerModal)
