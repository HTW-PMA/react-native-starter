import { StyleSheet, useColorScheme, Button, Alert } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

type ThemedButtonProps = {
    title: string;
    onPress?: () => void;
};

export default function ThemedButton({ title, onPress }: ThemedButtonProps) {
    const theme = useColorScheme() ?? 'light';

    return (
        <ThemedView>
            <Button
                title={title}
                onPress={onPress ?? (() => Alert.alert('This is an alert!'))}
                color={theme === 'light' ? styles.light.color : styles.dark.color}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    light: {
        color: 'teal',
    },
    dark: {
        color: 'magenta',
    }
});
