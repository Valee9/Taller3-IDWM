// Importa los módulos necesarios de React, React Native y otras bibliotecas
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Button, Modal, Portal, Provider } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';

// Define el componente Login
const Login = ({ navigation }) => {

    // Obtiene la función de inicio de sesión desde el contexto de autenticación
    const { signIn } = useContext(AuthContext);
    // Estado para almacenar el email, password y si es visible
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    // Maneja el inicio de sesión
    const handleSignIn = async () => {
        const response = await signIn({email, password});
        if (!response.success) {
            setVisible(true);
            setTimeout(() => {
                setVisible(false);
            }, 1500);
        }
    };
    // Navega a la pantalla de index
    const toIndex = () => {
        navigation.navigate('Index');
    };
    // Renderiza el componente
    return (
        <Provider>
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
                <Text style={styles.subtitle2}>Iniciar sesión</Text>
                <View style={styles.form}>
                    <Text style={styles.label}>Correo</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='correo@alumnos.ucn.cl'
                        placeholderTextColor='#ccc'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <Text style={styles.label}>Contraseña</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder='********'
                        placeholderTextColor='#ccc'
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>
                <Button
                    style={styles.button}
                    mode="contained"
                    onPress={handleSignIn}
                    contentStyle={styles.buttonContent}
                    labelStyle={styles.buttonLabel}
                >
                    Iniciar
                </Button>
            </View>
            <Portal>
                    <Modal visible={visible} style={styles.modalContainer} onDismiss={() => setVisible(false)}>
                        <View style={styles.modalContent}>
                            <Text style={[styles.title, { fontSize: 26}]}>Inicio de sesión incorrecto</Text>
                            <Text style={[styles.subtitle1, { fontSize: 20}]}>Inténtalo otra vez</Text>
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
};

// Estilos del componente
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
        paddingBottom: 5,
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
        paddingBottom: 10
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
        fontSize: 20,
        color: 'white'
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

export default Login;