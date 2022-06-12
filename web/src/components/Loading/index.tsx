import React from 'react';
import ReactLoading, { LoadingType } from 'react-loading';

interface LoadingProps {
  type: LoadingType;
  color: string;
  height: number;
  width: number;
}

const Loading: React.FC<LoadingProps> = ({ type, color, height, width }) => (
  // <ReactLoading type={type} color={color} height={height} width={width} />
  <p>Loading</p>
);

export default Loading;
