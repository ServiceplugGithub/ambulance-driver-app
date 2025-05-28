import globalStyles from '@/constants/baseStyles';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { Text, TextProps } from 'react-native';

export type AppTextProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
};

function AppText({ style, children, lightColor, darkColor, ...otherProps }: AppTextProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text') as string;

    return (
        <Text
            numberOfLines={otherProps?.numberOfLines}
            ellipsizeMode={otherProps?.ellipsizeMode}
            style={[globalStyles.baseText,
            { color },
                style

            ]}
            {...{ otherProps }}>
            {children}
        </Text>
    );
}

export default AppText;
