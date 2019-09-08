import _format from 'date-fns/format'
import _kebabCase from 'lodash/kebabCase'

export const displayDate = date => _format(new Date(date), 'MMMM Do, YYYY')

export const getPostSlug = ({ date, title }) =>
  `/${_format(new Date(date), 'YYYY/MM/')}${_kebabCase(title)}/`

export const isWhiteTheme = ({ location }) =>
  location.pathname.indexOf('/blog') === 0
