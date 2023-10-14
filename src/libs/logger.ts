import LogT from 'logt'

// eslint-disable-next-line import/no-mutable-exports
let logger: LogT

if (process.env.NODE_ENV === 'production') {
  logger = new LogT('info') // or logger = new LogT("none")
} else {
  logger = new LogT('silly')
}

export default logger
