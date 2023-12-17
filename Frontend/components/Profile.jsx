import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Button, Modal, Portal, Provider } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const Profile = ({ navigation }) => {

    const { rut } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [year, setYear] = useState('');

    useEffect(() => {
        const obtenerAdministradores = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/admin/${rut}`);
                const administradores = response.data;
                setEmail(administradores.email)
                setName(administradores.name)
                setYear(administradores.year)
                console.log(email, name, year, rut)

            } catch (error) {
                console.error('Error al obtener administradores:', error.message);
            }
        };

        // Llama a la función para obtener los administradores
        obtenerAdministradores();
    }, []);


    console.log(email, name, year, rut)
    const [validationEmail, setValidationEmail] = useState('');
    const [validationName, setValidationName] = useState('');
    const [validationYear, setValidationYear] = useState('');

    const [validationColorEmail, setValidationColorEmail] = useState('');
    const [validationColorName, setValidationColorName] = useState('');
    const [validationColorYear, setValidationColorYear] = useState('');

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

    const [isValid, setIsValid] = useState(false);
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);

    useEffect(() => {
        validateEmail();
        validateName();
        validateYear();
    }, [email, name, year, rut]);

    useEffect(() => {
        // Verifica si todas las validaciones son exitosas
        setIsValid(
            validationEmail === 'Correo válido' &&
            validationName === 'Nombre válido' &&
            validationYear === 'Año de nacimiento válido'
        );
    }, [validationEmail, validationName, validationYear]);

    const editarAdministradores = async () => {

        const updates = { email, name, year }
        console.log(updates)
        try {
            const response = await axios.put(`http://localhost:3001/admin/${rut}`, updates);
            console.log(response.data.message)
            if (response.data.continue == true) {
                console.log('Cambio exitoso:');
                setVisible(true);
                setTimeout(() => {
                    setVisible(false);
                }, 1500);
            }
        } catch (error) {
            console.log('Error en el cambio:');
            setVisible1(true);
            setTimeout(() => {
                setVisible1(false);
            }, 1500);
            throw error;
        }
    };

    const handleButton = () => {
        if (isValid) {
            editarAdministradores()
        };
    }

    const toHome = () => {
        navigation.navigate('Home');
        console.log("home")
    };

    return (
        <Provider>
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.orange}></View>
                <View style={styles.black}></View>
                <View style={styles.gray}></View>
            </View>
            <View style={styles.back}>
                <TouchableOpacity style={styles.buttonBack} onPress={() => toHome()}>
                    <Icon name="arrow-left" size={20} color="black" weight="light" />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <Text style={styles.title}>Editar perfil</Text>
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
                        style={[styles.input, { backgroundColor: '#D2D2D2' }]}
                        placeholder='12.345.678-9'
                        placeholderTextColor='#ccc'
                        value={rut}
                        disabled
                    />
                    
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
                    Guardar
                </Button>
            </View>
            <Portal>
                <Modal visible={visible} style={styles.modalContainer} onDismiss={() => setVisible(false)}>
                    <View style={styles.modalContent}>
                        <Text style={[styles.title, { fontSize: 20, color: 'black' },]}>¡Cambio éxitoso!</Text>
                    </View>
                </Modal>
            </Portal>
            <Portal>
                <Modal visible={visible1} style={styles.modalContainer} onDismiss={() => setVisible1(false)}>
                    <View style={styles.modalContent}>
                        <Text style={styles.title}>Error en el cambio</Text>
                        <Text style={styles.subtitle1}>Intentalo otra vez</Text>
                    </View>
                </Modal>
            </Portal>
            <View style={styles.footer}>
                <View style={styles.gray}></View>
                <View style={styles.black}></View>
                <View style={styles.orange}></View>
            </View>
        </SafeAreaView>
        </Provider>
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
        fontSize: 20,
        color: 'white'
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
    modalContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
});

export default Profile