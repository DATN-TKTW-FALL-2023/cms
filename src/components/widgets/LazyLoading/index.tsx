import { Spin } from 'antd'
import { lazy, Suspense } from 'react'

const lazyLoading = (importFunc: any) => {
  const LazComponent = lazy(importFunc)
  return function (props: any) {
    return (
      <Suspense
        fallback={
          <div className="lazy-loading-main">
            <Spin />
          </div>
        }
      >
        <LazComponent {...props} />
      </Suspense>
    )
  }
}

export default lazyLoading
