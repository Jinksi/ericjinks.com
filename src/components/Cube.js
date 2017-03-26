import React from 'react'
import styled, { keyframes } from 'styled-components'
import { color } from '../globalStyles'

const rotate360 = keyframes`
  from {
    transform: rotate3d(0, 0, 0, 0deg);
  }
  to {
    transform: rotate3d(1.8, 10, .5, 360deg);
  }
`

const cubeSize = 15
const Wrap = styled.div`
  perspective: 1000px;
  height: ${cubeSize * 2}vw;
`

const Cube = styled.div`
  position: relative;
  width: ${cubeSize * 2}vw;
  transform-style: preserve-3d;
  transform-origin: ${cubeSize}vw ${cubeSize}vw;
  animation: ${rotate360} 10s linear infinite;
`

const Side = styled.div`
  position: absolute;
  width: ${cubeSize * 2}vw;
  height: ${cubeSize * 2}vw;
  border: 1px dashed ${color.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  &:nth-child(1){
    transform: translateZ(-${cubeSize}vw) rotateY(180deg);
  }
  &:nth-child(2){
    transform: rotateY(-270deg) translateX(${cubeSize}vw);
    transform-origin: top right;
  }
  &:nth-child(3){
    transform: rotateY(270deg) translateX(-${cubeSize}vw);
    transform-origin: center left;
  }
  &:nth-child(4){
    transform: rotateX(-90deg) translateY(-${cubeSize}vw);
    transform-origin: top center;
  }
  &:nth-child(5){
    transform: rotateX(90deg) translateY(${cubeSize}vw);
    transform-origin: bottom center;
  }
  &:nth-child(6){
    transform: translateZ(${cubeSize}vw);
  }
`

export default (props) => (
  <Wrap>
    <Cube>
      <Side front>{props.text}</Side>
      <Side back>{props.text}</Side>
      <Side top>{props.text}</Side>
      <Side bottom>{props.text}</Side>
      <Side left>{props.text}</Side>
      <Side right>{props.text}</Side>
    </Cube>
  </Wrap>
)
