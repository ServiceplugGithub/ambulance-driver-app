import { ColorsType } from '@/constants/colors'
import { useThemeColor } from '@/hooks/useThemeColor'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type AppProps = {
    containerStyle?: object,
    children: any,
    statusBarProps?: object

}

function AppScreen(props: AppProps) {
    const { containerStyle, children, statusBarProps } = props;
    const color: ColorsType = useThemeColor() as ColorsType;

    const style = styles(color);

    return (
        <SafeAreaView style={[style.container, containerStyle]}>
            <StatusBar style="auto" {...statusBarProps} />
            {props.children}

        </SafeAreaView>
    )
}

const styles = (color: ColorsType) => StyleSheet.create({
    container: {
        backgroundColor: color.white,
        flex: 1

    }
});

export default AppScreen
