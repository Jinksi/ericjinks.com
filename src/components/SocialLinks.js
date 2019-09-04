import React from 'react'
import styled from 'styled-components'

export const Github = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 1792 1792"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1664 896q0 251-146.5 451.5t-378.5 277.5q-27 5-39.5-7t-12.5-30v-211q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-121-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-86-13.5q-44 113-7 204-79 85-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-40 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 89t.5 54q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"
      fill="currentColor"
    />
  </svg>
)
export const Twitter = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 1792 1792"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1684 408q-67 98-162 167 1 14 1 42 0 130-38 259.5t-115.5 248.5-184.5 210.5-258 146-323 54.5q-271 0-496-145 35 4 78 4 225 0 401-138-105-2-188-64.5t-114-159.5q33 5 61 5 43 0 85-11-112-23-185.5-111.5t-73.5-205.5v-4q68 38 146 41-66-44-105-115t-39-154q0-88 44-163 121 149 294.5 238.5t371.5 99.5q-8-38-8-74 0-134 94.5-228.5t228.5-94.5q140 0 236 102 109-21 205-78-37 115-142 178 93-10 186-50z"
      fill="currentColor"
    />
  </svg>
)
export const Instagram = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 1792 1792"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1490 1426v-648h-135q20 63 20 131 0 126-64 232.5t-174 168.5-240 62q-197 0-337-135.5t-140-327.5q0-68 20-131h-141v648q0 26 17.5 43.5t43.5 17.5h1069q25 0 43-17.5t18-43.5zm-284-533q0-124-90.5-211.5t-218.5-87.5q-127 0-217.5 87.5t-90.5 211.5 90.5 211.5 217.5 87.5q128 0 218.5-87.5t90.5-211.5zm284-360v-165q0-28-20-48.5t-49-20.5h-174q-29 0-49 20.5t-20 48.5v165q0 29 20 49t49 20h174q29 0 49-20t20-49zm174-208v1142q0 81-58 139t-139 58h-1142q-81 0-139-58t-58-139v-1142q0-81 58-139t139-58h1142q81 0 139 58t58 139z"
      fill="currentColor"
    />
  </svg>
)

const SocialsWrap = styled.div`
  margin-left: auto;
  display: flex;
`

const SocialLink = styled.a`
  text-decoration: none;
  padding: 0.5rem;
  width: 3rem;
  height: 3rem;
  color: inherit;
  &:hover,
  &:focus {
    color: inherit;
  }
  + * {
    margin-left: 1rem;
  }
  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`

export default () => (
  <SocialsWrap>
    <SocialLink aria-label="Github" href="https://github.com/Jinksi">
      <Github />
    </SocialLink>
    <SocialLink aria-label="Twitter" href="https://twitter.com/jinksi">
      <Twitter />
    </SocialLink>
  </SocialsWrap>
)
