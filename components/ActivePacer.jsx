import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'

const ActivePacer = () => {
    const [seconds, setSeconds] = useState(55);
    const [minutes, setMinutes] = useState(1);

    useEffect(() => {
        if (seconds > 0) {
            const secondsTimer = setTimeout(() => setSeconds(seconds - 1), 1000);
            return () => clearTimeout(secondsTimer);
        }
    }, [seconds]);

    useEffect(() => {
        if (seconds === 0 && minutes > 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
        }
    }, [seconds, minutes]);

    return (
        <View style={styles.container}>
            <View style={styles.pill}>
                <View style={{width: 30, height: 30, backgroundColor: '#FFC82E', borderRadius: 15}}/>
                <Text style={styles.text}>{minutes}m{seconds}s</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    pill: {
        borderRadius: 50,
        width: 80,
        height: 50,
        paddingHorizontal: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    text: {
        color: '#000',
        marginHorizontal: 5,
    },
});

export default ActivePacer