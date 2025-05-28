import React from 'react';

import { Image } from 'expo-image';
import { icons } from '@/assets';

interface LogoProps {
    height?: number;
    width?: number | string;
}

const Logo: React.FC<LogoProps> = (props) => {
    const { height, width } = props;
    return (

        <Image style={{
            height: height || 120, width: typeof width === 'number' ? width : '100%'
        }}
            contentFit='contain'
            source={icons.servicePlugLogo} />

    );
};

export default Logo;
