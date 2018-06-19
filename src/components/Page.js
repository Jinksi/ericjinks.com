import styled, { css } from 'styled-components'
import { color } from '../globalStyles'

export default styled.div`
  ${props => {
    if (props.white) {
      return css`
        color: ${color.black};
        background-color: ${color.primary};
      `
    }
  }};
`
