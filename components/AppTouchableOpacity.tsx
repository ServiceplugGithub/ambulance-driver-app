import React, { PropsWithChildren } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps;

function AppTouchableOpacity({
    children,
    ...otherProps
}: PropsWithChildren<Props>): React.JSX.Element {
    return (
        <TouchableOpacity activeOpacity={0.8} {...otherProps}>
            {children}
        </TouchableOpacity>
    );
}

export default AppTouchableOpacity;
