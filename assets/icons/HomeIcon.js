import React from 'react';
import Svg, { Polyline, Path } from 'react-native-svg';

function HomeIcon(props) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      class="feather feather-home"
    >
      <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></Path>
      <Polyline points="9 22 9 12 15 12 15 22"></Polyline>
    </Svg>
  );
}

export default HomeIcon;
