import React, { useState, useEffect, memo } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ThemedButton from '@/components/ThemedButton';

export default function Timer() {

    const [time, setTime] = useState(0);

    // console.log('Rendering TimerDisplay component with time:', time);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleReset = () => {
        setTime(0);
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.timerText}>Time: {time}s</ThemedText>
            <ThemedButton title="Reset Timer" onPress={handleReset} />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 20,
    },
    timerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
});
