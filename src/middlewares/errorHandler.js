import logger from '../libraries/logger/logger'

export default err => {
  logger.error({ err, event: 'error' }, 'Unhandled exception occured')
}
