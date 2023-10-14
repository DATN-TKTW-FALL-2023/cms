import 'antd/dist/reset.css'
import './styles/styles.less'

import { QueryClientProvider } from 'react-query'
import { HelmetProvider } from 'react-helmet-async'
import { HashRouter } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ConfigProvider } from 'antd'
import LoadingApp from '@components/widgets/LoaderApp'
import { queryClient } from '@queries/index'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'

import RouteApp from './route'

dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider>
        <HelmetProvider>
          <LoadingApp loaded>
            <HashRouter>
              <RouteApp />
            </HashRouter>
          </LoadingApp>
        </HelmetProvider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </ConfigProvider>
    </QueryClientProvider>
  )
}

export default App
