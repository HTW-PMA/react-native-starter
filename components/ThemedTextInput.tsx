import React from 'react';
import { TextInput, TextInputProps, StyleSheet, ColorValue } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextInputProps = TextInputProps & {
    lightColor?: string;
    darkColor?: string;
    type?: 'default' | 'outlined' | 'underline' | 'rounded';
};

export function ThemedTextInput({
    style,
    lightColor,
    darkColor,
    type = 'default',
    ...rest
}: ThemedTextInputProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background') as ColorValue;
    const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'border');
    const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    return (
        <TextInput
            style={[
                { color: textColor, backgroundColor },
                type === 'default' ? styles.default : undefined,
                type === 'outlined' ? [styles.outlined, { borderColor }] : undefined,
                type === 'underline' ? [styles.underline, { borderColor }] : undefined,
                type === 'rounded' ? [styles.rounded, { borderColor }] : undefined,
                style,
            ]}
            placeholderTextColor={textColor}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
        padding: 10,
        borderWidth: 3,
        borderColor: 'purple',
        borderRadius: 4,
    },
    outlined: {
        fontSize: 16,
        padding: 10,
        borderWidth: 2,
        borderRadius: 4,
    },
    underline: {
        fontSize: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderRadius: 0,
    },
    rounded: {
        fontSize: 16,
        padding: 10,
        borderWidth: 1,
        borderRadius: 25,
    },
});
