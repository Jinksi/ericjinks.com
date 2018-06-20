import React from 'react'
import styled from 'styled-components'
import 'loaders.css/loaders.min.css'

export default ({ text = 'Loading', ...props }) => (
  <Loading {...props}>
    <div className="loader-inner cube-transition">
      <div />
      <div />
    </div>
    <div className="Loading--Text">{text}</div>
  </Loading>
)

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  position: relative;

  .loader-inner {
    transform: translate(-25px, 0);
    left: 50%;
    top: 5rem;
    position: absolute;

    div {
      background-color: #272727;
    }
  }

  .Loading--Text {
    margin-top: 7rem;
    font-weight: 600;
    font-size: 1.6rem;
  }
`
