import styled from 'styled-components'

const Page = styled.div`
  background: var(--color-background);

  [data-theme='dark'] & {
    background: transparent;
  }
`

export default Page
