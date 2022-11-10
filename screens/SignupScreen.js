import { View, Text, KeyboardAvoidingView, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TextInput, Button } from 'react-native-paper'
import { auth } from '../firebase'

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const userSignup = async () => {
        if (!email || !password) {
            Alert.alert("please all all the fields")
            return
        }
        try {
            const result = await auth.createUserWithEmailAndPassword(email, password)
            console.log("user is Registered")
            console.log(result.user.email)
        } catch (err) {
            Alert.alert("Something went wrong try again.")
        }
    }

    // const userSignup = async () => {
    //     const result = await auth.createUserWithEmailAndPassword(email, password);

    //     console.log(result.user);

    // }

    const handleCreateAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log("Account created");
                const user = userCredential.user;
                console.log(user);
            })
            .catch(error => {
                console.log(error);
            })
    }


    return (
        <KeyboardAvoidingView behavior="position">
            <View style={styles.box1}>
                <Image style={{ width: 200, height: 200 }} source={require('../assets/home.jpg')} />
                <Text style={styles.text}>please sign up to continue!</Text>
            </View>
            <View style={styles.box2}>
                <TextInput
                    label="Email"
                    value={email}
                    mode="outlined"
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    label="password"
                    value={password}
                    mode="outlined"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                />
                <Button mode="contained" onPress={() => userSignup()}>
                    SignUp
                </Button>
                <TouchableOpacity onPress={() => navigation.navigate("login")}><Text style={{ textAlign: "center" }}>Login ?</Text></TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    box1: {
        alignItems: "center"
    },
    box2: {
        paddingHorizontal: 10,
        height: "50%",
        justifyContent: "space-evenly"
    },
    text: {
        fontSize: 22
    }
});



export default SignupScreen