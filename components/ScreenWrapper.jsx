import { View, useColorScheme } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../constants/theme';

const ScreenWrapper = ({children})=>{
    const colorScheme = useColorScheme();
    const isDarkTheme = colorScheme === 'dark';
    const {top} = useSafeAreaInsets();
    const paddingTop = 30
    return (
        <View 
        style={[
            {
            flex: 1, 
            paddingTop, 
            width: "100%",
        },
        isDarkTheme
        ? {backgroundColor: theme.darkColors.bg}
        : {backgroundColor: theme.lightColors.bg}
    ]}
        >
            {
                children
            }
        </View>
    )
}

export default ScreenWrapper;