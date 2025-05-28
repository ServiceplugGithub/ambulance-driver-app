import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const vh = (h: number) => {
  const res = (h / 100) * screenHeight;
  return Math.round(res);
};

export const vw = (w: number) => {
  const res = (w / 100) * screenWidth;
  return Math.round(res);
};
