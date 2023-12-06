import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import { Button, ActivityIndicator } from 'react-native-paper';
import logo from '../assets/logo.png'

const Index = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const toLogin = () => {
        navigation.navigate('Login')
    }
    const toRegistration = () => {
        navigation.navigate('Registration')
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.orange}></View>
                <View style={styles.black}></View>
                <View style={styles.gray}></View>
            </View>
            <View style={styles.body}>
                <Text style={styles.title}>MobileHub</Text>
                <Text style={styles.subtitle1}>¡Hola!</Text>
                {loading && <ActivityIndicator style={styles.activityIndicator} color='#00A898' />}

                <StatusBar style="auto" />
                <Button
                    style={styles.button}
                    mode="contained"
                    contentStyle={styles.buttonContent}
                    labelStyle={styles.buttonLabel}
                    onPress={() => toLogin()}
                >
                    Iniciar sesión
                </Button>
                <Button
                    style={styles.buttonSec}
                    mode="contained"
                    contentStyle={styles.buttonContent}
                    labelStyle={styles.buttonLabelSec}
                    onPress={() => toRegistration()}
                >
                    Registrarse
                </Button>
                <Image
                    source={logo}
                    style={styles.image}
                />
            </View>

            <View style={styles.footer}>
                <View style={styles.gray}></View>
                <View style={styles.black}></View>
                <View style={styles.orange}></View>
            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    body: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    orange: {
        backgroundColor: '#FCAF43',
        width: '100%',
        height: 20,
    },
    black: {
        backgroundColor: 'black',
        width: '87%',
        height: 20,
    },
    gray: {
        backgroundColor: '#D2D2D2',
        width: '74%',
        height: 20,
    },
    title: {
        fontSize: 36,
        color: '#FCAF43',
        fontFamily: 'Inika',
        paddingBottom: 5
    },
    subtitle1: {
        fontSize: 20,
        color: '#929292',
        fontFamily: 'Inika',
        paddingBottom: 5
    },
    form: {
        width: '80%',
    },
    label: {
        fontSize: 16,
        color: 'black',
        textAlign: 'left',
        fontFamily: 'Inika',
        marginBottom: 5,
        marginLeft: 10,
    },
    input: {
        paddingLeft: 15,
        height: 40,
        borderRadius: 20,
        marginBottom: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    button: {
        height: 40,
        marginTop: 10,
        width: 200,
        backgroundColor: '#FCAF43',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonLabel: {
        fontFamily: 'Inika',
        fontSize: 20
    },
    buttonSec: {
        backgroundColor: 'none',
    },
    buttonLabelSec: {
        fontFamily: 'Inika',
        fontSize: 16,
        color: 'black'
    },
    activityIndicator: {
        marginTop: 20
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
    },
});

export default Index;