import React, { useState } from "react";
import { View, StyleSheet, Image, TextInput } from "react-native";

const ConfirmationPage = ({ route }) => {
    const { imageSource } = route.params;
    const [text, onChangeText] = useState('');

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: `file://${imageSource}` }}
                style={styles.confirmationImage}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Put text here"
                placeholderTextColor={"#aaa"}
                multiline={true}
                textAlignVertical="top"
                color="#aaa"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmationImage: {
        width: '100%',
        height: '50%',
    },
    input: {
        flex: 1,
        height: 100,
        width: '100%',
        textDecorationColor: '#aaa',
        textAlignVertical: 'top'
    },
});

export default ConfirmationPage;
