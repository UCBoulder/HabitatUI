import React, { useState } from "react";
import { View, StyleSheet, Image, TextInput } from "react-native";

const ConfirmationPage = () => {
    const [text, onChangeText] = useState('');

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: `file://'${imageSource}` }}
                style={styles.confirmationImage}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Put text here"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    confirmationImage: {
        width: '50%',
        height: '50%',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default ConfirmationPage;