import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  100% {
    transform: rotate(360deg) translateZ(0);
  }
`;
const Circle = styled.div`
  border-radius: 100%;
  animation: ${spin} 1s infinite linear;
`;

const IconLoaderCircle = ({
  length = 50,
  widthPercent = 0.125,
  bg = 'rgba(255,255,255,.5)',
  indicator = '#fff',
  style = {},
  props,
}) => {
  return (
    <Circle
      {...props}
      style={{
        width: length,
        height: length,
        border: `${length * widthPercent}px solid ${bg}`,
        borderTopColor: indicator,
        ...style,
      }}
    />
  );
};

export default IconLoaderCircle;