import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Button, Modal, Portal, Provider } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const Password = ({ navigation }) => {
    const { rut } = useContext(AuthContext);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const { logOut } = useContext(AuthContext);
    useEffect(() => {
        const obtenerAdministradores = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/admin/${rut}`);
                const administradores = response.data;
                setPassword(administradores.password)

            } catch (error) {
                console.error('Error al obtener administradores:', error.message);
            }
        };

        // Llama a la función para obtener los administradores
        obtenerAdministradores();
    }, []);

    const editarAdministradores = async () => {
        console.log(password)
        if (password !== confirmPassword) {
            console.log('Las contraseñas no coinciden');
            setVisible1(true);
            setTimeout(() => {
                setVisible1(false);
            }, 1500);
            return;
        }

        const updates = { password }
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
                    <Text style={styles.title}>Editar contraseña</Text>
                    <View style={styles.form}>
                        <Text style={styles.label}>Nueva contraseña</Text>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="#ccc"
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry
                        />
                        <Text style={styles.label}>Repita la contraseña</Text>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="#ccc"
                            onChangeText={(text) => setConfirmPassword(text)}
                            secureTextEntry
                        />
                    </View>

                    <StatusBar style="auto" />
                    <Button
                        style={styles.button}
                        mode="contained"
                        contentStyle={styles.buttonContent}
                        labelStyle={styles.buttonLabel}
                        onPress={editarAdministradores}

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
                            <Text style={[styles.title, { fontSize: 26}]}>Las contraseñas no coinciden</Text>
                            <Text style={[styles.subtitle1, { fontSize: 20}]}>Intentalo otra vez</Text>
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

export default Password