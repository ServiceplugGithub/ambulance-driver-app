import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import AppText from '@/components/AppText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ColorsType } from '@/constants/colors';
import { fontFamily } from '@/constants/fonts';

interface Props {
    title?: string;
    subtitle?: string;
    onPress?: () => void;
    isLink?: boolean;
    containerStyle?: object;
}

function HeadingSubtitle(props: Props) {
    const { subtitle, title, onPress, isLink, containerStyle } = props;

    const color: ColorsType = useThemeColor() as ColorsType;

    const style = styles(color);


    return (

        <View style={[style.container, containerStyle]}>
            {title && <AppText style={[style.heading, isLink && style.link]}>{title}</AppText>}

            {subtitle && <View style={style.text}>
                <AppText style={[style.subtitles, isLink && style.link]}>{subtitle}</AppText>
            </View>}
        </View>

    );
}

export default HeadingSubtitle;

const styles = (color: ColorsType) => StyleSheet.create({
    box: { marginVertical: -10 },
    container: {
        alignItems: 'center'
    },
    heading: {
        color: color.secondary,
        textAlign: 'center',
        fontFamily: fontFamily[500],
        fontSize: 22,
        lineHeight: 24
    },
    text: {
        marginHorizontal: 2
    },
    subtitles: {
        fontSize: 14,
        fontFamily: fontFamily[400],
        // color: color.violet[1000],
        lineHeight: 16
    },
    link: {
        textDecorationLine: 'underline',
        textDecorationColor: color.primary,
        color: color.primary,

    }
});
