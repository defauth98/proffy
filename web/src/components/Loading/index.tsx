import React from 'react';
import ReactLoading, { LoadingType } from 'react-loading';

interface LoadingProps {
  type: LoadingType;
  color: string;
  height: number;
  width: number;
}

function Loading({
  type, color, height, width,
}: LoadingProps) {
  return (
    <ReactLoading type={type} color={color} height={height} width={width} />
  );
}

export default Loading;
