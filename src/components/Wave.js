import React from 'react'
import styled from 'styled-components'

const Svg = styled.svg`
  height: auto;
  display: block;
  min-width: 100%;
`

const Wave = styled.div`
  width: 100%;
  overflow: hidden;
  margin: -25px 0;
`

export default () => (
  <Wave>
    <Svg
      width="1440"
      height="197"
      viewBox="0 0 1440 197"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0)">
        <rect
          width="1440"
          height="1428"
          transform="translate(0 -521)"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-230 150.286L-133.688 158.071C-38.8125 165.857 153.812 181.429 345 158.071C536.187 134.714 728.812 72.4286 920 72.4286C1111.19 72.4286 1303.81 134.714 1398.69 165.857L1495 197V-130H1398.69C1303.81 -130 1111.19 -130 920 -130C728.812 -130 536.187 -130 345 -130C153.812 -130 -38.8125 -130 -133.688 -130H-230V150.286Z"
          fill="#272121"
          fillOpacity="0.1"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-9 120.714L71.9025 128.762C151.597 136.81 313.402 152.905 474 128.762C634.597 104.619 796.402 40.2381 957 40.2381C1117.6 40.2381 1279.4 104.619 1359.1 136.81L1440 169V-169H1359.1C1279.4 -169 1117.6 -169 957 -169C796.402 -169 634.597 -169 474 -169C313.402 -169 151.597 -169 71.9025 -169H-9V120.714Z"
          fill="#272121"
          fillOpacity="0.1"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 98.8571L80.4 106.048C159.6 113.238 320.4 127.619 480 106.048C639.6 84.4762 800.4 26.9524 960 26.9524C1119.6 26.9524 1280.4 84.4762 1359.6 113.238L1440 142V-160H1359.6C1280.4 -160 1119.6 -160 960 -160C800.4 -160 639.6 -160 480 -160C320.4 -160 159.6 -160 80.4 -160H0V98.8571Z"
          fill="#272121"
        />
        <rect y="-597" width="1440" height="602" fill="#272121" />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect
            width="1440"
            height="1428"
            fill="white"
            transform="translate(0 -521)"
          />
        </clipPath>
      </defs>
    </Svg>
  </Wave>
)
