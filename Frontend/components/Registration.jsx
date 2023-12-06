
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView } from 'react-native';
import { Button, ActivityIndicator } from 'react-native-paper';

const Registration = ({ navigation }) => {
    const [correo, setCorreo] = useState('');
    const [nombre, setNombre] = useState('');
    const [año, setAño] = useState('');
    const [rut, setRut] = useState('');

    const [validationCorreo, setValidationCorreo] = useState('');
    const [validationNombre, setValidationNombre] = useState('');
    const [validationAño, setValidationAño] = useState('');
    const [validationRut, setValidationRut] = useState('');

    const [validationColorCorreo, setValidationColorCorreo] = useState('');
    const [validationColorNombre, setValidationColorNombre] = useState('');
    const [validationColorAño, setValidationColorAño] = useState('');
    const [validationColorRut, setValidationColorRut] = useState('');

    const validateCorreo = () => {
        console.log(correo);
    
        const correoRegex = /^[a-zA-Z0-9._-]+@(ucn\.cl|alumnos\.ucn\.cl|disc\.ucn\.cl|ce\.ucn\.cl)$/;
        if (!isNaN(correo)) {
            setValidationCorreo('Debe ingresar un correo');
            setValidationColorCorreo('red');
        }
        else if (correoRegex.test(correo)) {
            setValidationCorreo('Correo válido');
            setValidationColorCorreo('green');
        } else {
            setValidationCorreo('Ingrese un correo de dominio UCN');
            setValidationColorCorreo('red');
        }
    };

    const validateNombre = () => {
        console.log(nombre)
        const longitudNombre = nombre.trim().length;
        if (!isNaN(nombre)) {
            setValidationNombre('Debe ingresar un nombre');
            setValidationColorNombre('red');
        }
        else if (/^[a-zA-Z ]+$/.test(nombre)) {
            console.log("Letras");
            if (longitudNombre < 10 || longitudNombre > 150) {
                setValidationNombre('El nombre debe tener entre 10 y 150 caracteres');
                setValidationColorNombre('red');
            } else {
                setValidationNombre('Nombre válido');
                setValidationColorNombre('green');
            }
        } else {
            setValidationNombre('Solo se permiten letras');
            setValidationColorNombre('red');
        }
    };

    const validateAño = () => {
        console.log(año)
        if (!isNaN(año)) {
            setValidationAño('Debe ingresar un año');
            setValidationColorAño('red');
        }
        else if (!/^\d+$/.test(año)) {
            setValidationAño('Solo se permiten números');
            setValidationColorAño('red');
        } else {
            const numericAño = parseInt(año, 10);
    
            if (numericAño >= 1900 && numericAño <= 2023) {
                setValidationAño('Año de nacimiento válido');
                setValidationColorAño('green');
            } else {
                setValidationAño('El año debe estar entre 1900 y 2023');
                setValidationColorAño('red');
            }
        }
    };

    const validateRut = () => {
        const cleanRut = rut.replace(/[.-]/g, '');

        const cuerpo = cleanRut.slice(0, -1);
        const dv = cleanRut.slice(-1).toUpperCase();

        let suma = 0;
        let multiplo = 2;

        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += parseInt(cuerpo.charAt(i)) * multiplo;
            multiplo = multiplo < 7 ? multiplo + 1 : 2;
        }

        const resultado = (11 - (suma % 11)).toString();

        const digitoVerificador = resultado === '10' ? 'K' : resultado;

        if (!isNaN(rut)) {
            setValidationRut('Debe ingresar un rut');
            setValidationColorRut('red');
        }
        else if (dv === digitoVerificador) {
            setValidationRut('RUT válido');
            setValidationColorRut('green');
        } else {
            setValidationRut('El digito verificador no es válido');
            setValidationColorRut('red');
        }
    };

    


    

    const handleButton = () => {
        validateCorreo();
        validateNombre();
        validateAño();
        validateRut();
    };
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
                <Text style={styles.subtitle2}>Registrarse</Text>
                <View style={styles.form}>
                    <Text style={styles.label}>Correo</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='correo@alumnos.ucn.cl'
                        placeholderTextColor='#ccc'
                        value={correo}
                        onChangeText={(text) => setCorreo(text)}
                    />
                    {validationCorreo !== '' && (
                        <View style={styles.validationMessageContainer}>
                            <Text style={[styles.validationCorreo, { color: validationColorCorreo }]}>{validationCorreo}</Text>
                        </View>
                    )}
                    <Text style={styles.label}>Nombre completo</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Juan Perez'
                        placeholderTextColor='#ccc'
                        value={nombre}
                        onChangeText={(text) => setNombre(text)}
                    />
                    {validationNombre !== '' && (
                        <View style={styles.validationMessageContainer}>
                            <Text style={[styles.validationNombre, { color: validationColorNombre }]}>{validationNombre}</Text>
                        </View>
                    )}
                    <Text style={styles.label}>Año de nacimiento</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='1900'
                        placeholderTextColor='#ccc'
                        keyboardType="numeric"
                        value={año}
                        onChangeText={(text) => setAño(text)}
                    />
                    {validationAño !== '' && (
                        <View style={styles.validationMessageContainer}>
                            <Text style={[styles.validationAño, { color: validationColorAño }]}>{validationAño}</Text>
                        </View>
                    )}
                    <Text style={styles.label}>Rut</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='12.345.678-9'
                        placeholderTextColor='#ccc'
                        value={rut}
                        onChangeText={(text) => setRut(text)}
                    />
                    {validationRut !== '' && (
                        <View style={styles.validationMessageContainer}>
                            <Text style={[styles.validationRut, { color: validationColorRut }]}>{validationRut}</Text>
                        </View>
                    )}

                </View>

                <StatusBar style="auto" />
                <Button
                    style={styles.button}
                    mode="contained"
                    contentStyle={styles.buttonContent}
                    labelStyle={styles.buttonLabel}
                    onPress={handleButton}
                >
                    Iniciar
                </Button>
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
        color: 'black',
        fontFamily: 'Inika',
        paddingBottom: 5
    },
    subtitle2: {
        fontSize: 16,
        color: '#929292',
        fontFamily: 'Inika',
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
        marginTop: 20,
        marginLeft: 10,
    },
    input: {
        paddingLeft: 15,
        height: 40,
        borderRadius: 20,
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
        marginTop: 30,
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
    activityIndicator: {
        marginTop: 20
    },
    validationMessageContainer: {
        marginTop: 5,
        paddingLeft: 10,
    },
    validationMessage: {
        color: 'white',
    },
});

export default Registration;