import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Button, ActivityIndicator } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const Registration = ({ navigation }) => {

    const { signUp } = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [rut, setRut] = useState('');

    const [validationEmail, setValidationEmail] = useState('');
    const [validationName, setValidationName] = useState('');
    const [validationYear, setValidationYear] = useState('');
    const [validationRut, setValidationRut] = useState('');

    const [validationColorEmail, setValidationColorEmail] = useState('');
    const [validationColorName, setValidationColorName] = useState('');
    const [validationColorYear, setValidationColorYear] = useState('');
    const [validationColorRut, setValidationColorRut] = useState('');

    const validateEmail = () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@(ucn\.cl|alumnos\.ucn\.cl|disc\.ucn\.cl|ce\.ucn\.cl)$/;
        if (!email) {
            setValidationEmail('Debe ingresar un correo');
            setValidationColorEmail('red');
        }
        else if (emailRegex.test(email)) {
            setValidationEmail('Correo válido');
            setValidationColorEmail('green');
        } else {
            setValidationEmail('Ingrese un correo de dominio UCN');
            setValidationColorEmail('red');
        }
    };

    const validateName = () => {
        const longitudName = name.trim().length;
        if (!name) {
            setValidationName('Debe ingresar un nombre');
            setValidationColorName('red');
        }
        else if (/^[a-zA-Z ]+$/.test(name)) {
            if (longitudName < 10 || longitudName > 150) {
                setValidationName('El nombre debe tener entre 10 y 150 caracteres');
                setValidationColorName('red');
            } else {
                setValidationName('Nombre válido');
                setValidationColorName('green');
            }
        } else {
            setValidationName('Solo se permiten letras');
            setValidationColorName('red');
        }
    };

    const validateYear = () => {
        if (!year) {
            setValidationYear('Debe ingresar un año');
            setValidationColorYear('red');
        }
        else if (!/^\d+$/.test(year)) {
            setValidationYear('Solo se permiten números');
            setValidationColorYear('red');

        } else {
            const numericYear = parseInt(year, 10);

            if (numericYear >= 1900 && numericYear <= 2023) {
                setValidationYear('Año de nacimiento válido');
                setValidationColorYear('green');
            } else {
                setValidationYear('El año debe estar entre 1900 y 2023');
                setValidationColorYear('red');
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

        if (!rut) {
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

    const [isValid, setIsValid] = useState(false);
    useEffect(() => {
        validateEmail();
        validateName();
        validateYear();
        validateRut();
    }, [email, name, year, rut]);
    useEffect(() => {
        // Verifica si todas las validaciones son exitosas
        setIsValid(
            validationEmail === 'Correo válido' &&
            validationName === 'Nombre válido' &&
            validationYear === 'Año de nacimiento válido' &&
            validationRut === 'RUT válido'
        );
    }, [validationEmail, validationName, validationYear, validationRut]);

    const handleButton = () => {
        if (isValid) {
            console.log(email, name, year, rut);
            signUp({ email, name, year, rut });
        }
    };
    const toIndex = () => {
        navigation.navigate('Index');
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.orange}></View>
                <View style={styles.black}></View>
                <View style={styles.gray}></View>
            </View>
            <View style={styles.back}>
                <TouchableOpacity style={styles.buttonBack} onPress={() => toIndex()}>
                    <Icon name="arrow-left" size={20} color="black" weight="light" />
                </TouchableOpacity>
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
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    {email !== '' && validationEmail !== '' && (
                        <View style={styles.validationMessageContainer}>
                            <Text style={[styles.validationEmail, { color: validationColorEmail }]}>{validationEmail}</Text>
                        </View>
                    )}
                    <Text style={styles.label}>Nombre completo</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Juan Perez'
                        placeholderTextColor='#ccc'
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                    {name !== '' && validationName !== '' && (
                        <View style={styles.validationMessageContainer}>
                            <Text style={[styles.validationName, { color: validationColorName }]}>{validationName}</Text>
                        </View>
                    )}
                    <Text style={styles.label}>Año de nacimiento</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='1900'
                        placeholderTextColor='#ccc'
                        keyboardType="numeric"
                        value={year}
                        onChangeText={(text) => setYear(text)}
                    />
                    {year !== '' && validationYear !== '' && (
                        <View style={styles.validationMessageContainer}>
                            <Text style={[styles.validationYear, { color: validationColorYear }]}>{validationYear}</Text>
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
                    {rut !== '' && validationRut !== '' && (
                        <View style={styles.validationMessageContainer}>
                            <Text style={[styles.validationRut, { color: validationColorRut }]}>{validationRut}</Text>
                        </View>
                    )}

                </View>

                <StatusBar style="auto" />
                <Button
                    style={[styles.button,
                        !isValid && { backgroundColor: 'gray' },]}
                    mode="contained"
                    contentStyle={styles.buttonContent}
                    labelStyle={[
                        styles.buttonLabel,
                        !isValid && { color: 'white' },
                    ]}
                    onPress={handleButton}
                    disabled={!isValid}

                >
                    Registrarse
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
    buttonBack: {
        margin: '5px'
    },
});

export default Registration;