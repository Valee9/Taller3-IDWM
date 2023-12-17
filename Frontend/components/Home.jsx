// Importa los módulos necesarios de React, React Native y otras bibliotecas
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Button, Modal, Portal, Provider } from 'react-native-paper';
import { Table, Row } from 'react-native-table-component';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

// Define el componente Home
const Home = ({ navigation }) => {

    // Obtiene la función de cierre de sesión desde el contexto de autenticación
    const { logOut } = useContext(AuthContext);
    // Navega a la pantalla de perfil
    const toProfile = () => {
        navigation.navigate('Profile');
    };
    // Navega a la pantalla de cambio de contraseña
    const toPassword = () => {
        navigation.navigate('Password');
    };
    // Estado para almacenar la lista de repositorios y de commits
    const [repos, setRepos] = useState([])
    const [commits, setCommits] = useState([])
    // Efecto para cargar la lista de repositorios al iniciar el componente
    useEffect(() => {
        const obtenerRepos = async () => {
            try {
                // Realiza una solicitud para obtener la lista de repositorios desde el servidor
                const response = await axios.get(`http://localhost:3001/repos`);
                // Actualiza el estado con la lista de repositorios
                setRepos(response.data)

            } catch (error) {
                console.error('Error al obtener los repositorios:', error.message);
            }
        };
        // Llama a la función para obtener los administradores
        obtenerRepos();
    }, []);

    // Estado para la creación de la tabla de repositorios
    const tableHead = ['Nombre', 'Fecha', 'Commits', 'Acciones'];
    const tableData = repos.map((repo, index) => [
        `${repo.name}`,
        `${new Date(repo.created_at).toLocaleDateString()}`,
        `${repo.commits}`,
        <View style={styles.buttonAction}>
            <Button style={styles.buttonMore} key={index} onPress={() => handleVerMasClick(repo)} mode="contained" labelStyle={styles.buttonLabelMore}>
                Ver
            </Button>
        </View>

    ]);
    // Estado para controlar la visibilidad del modal de commits
    const [visible, setVisible] = useState(false);
    // Maneja el clic en el botón "Ver más" de un repositorio
    const handleVerMasClick = async (repo) => {
        console.log(`Ver más clic en el repositorio: ${repo.name}`);
        try {
            // Realizar una solicitud al servidor para obtener los commits del repositorio seleccionado
            const response = await axios.get(`http://localhost:3001/repos/${repo.name}`);
        
            // response.data contendrá la lista de commits
            const commit = response.data;
            setCommits(commit)
            // Muestra el modal con los commits
            setVisible(true);
          } catch (error) {
            console.error('Error al obtener los commits:', error.message);
          }
    };

    // Estado para la creación de la tabla de commits
    const tableHead1 = ['Mensaje', 'Fecha'];
    const tableData1 = commits.map((commit) => [
        `${commit.commit.message}`,
        `${new Date(commit.commit.author.date).toLocaleDateString()}`
    ]);

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
                <TouchableOpacity style={styles.buttonBack} onPress={logOut}>
                    <Icon name="sign-out" size={26} color="black" weight="light" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonBack} onPress={() => toProfile()}>
                    <Icon name="user" size={26} color="black" weight="light" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonBack} onPress={() => toPassword()}>
                    <Icon name="key" size={26} color="black" weight="light" />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <Text style={styles.title}>MobileHub</Text>

                {Array.isArray(repos) && repos.length > 0 ? (
                    <>
                        <ScrollView style={styles.tableContainer}>
                            <Table borderStyle={styles.border}>
                                <Row data={tableHead} style={styles.head} textStyle={styles.headText} />
                                {tableData.map((rowData, index) => (
                                    <Row key={index} data={rowData} textStyle={styles.rowText} />
                                ))}

                            </Table>

                        </ScrollView>
                    </>

                ) : (
                    <Text style={styles.subtitle1}>Cargando repositorios...</Text>
                )}

            </View>
            <Portal>
                <Modal visible={visible} style={styles.modalContainer} onDismiss={() => setVisible(false)}>
                    <View style={styles.modalContent}>
                        <Text style={[styles.title, { fontSize: 22, color: 'black' },]}>Commits</Text>

                        {Array.isArray(commits) && commits.length > 0 ? (
                    <>
                        <ScrollView style={styles.tableContainer}>
                            <Table borderStyle={styles.border}>
                                <Row data={tableHead1} style={styles.head} textStyle={styles.headText} />
                                {tableData1.map((rowData, index) => (
                                    <Row key={index} data={rowData} textStyle={styles.rowText} />
                                ))}

                            </Table>

                        </ScrollView>
                    </>

                ) : (
                    <Text style={styles.subtitle1}>Cargando repositorios...</Text>
                )}

                        <Button style={styles.button} onPress={() => setVisible(false)} labelStyle={styles.buttonLabel}>Cerrar</Button>
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
    buttonAction:{
        alignItems: 'center',
        margin: 5
      },
    buttonMore: {
        height: 30,
        width: 70,
        padding: 0,
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
    buttonLabelMore: {
        fontFamily: 'Inika',
        fontSize: 12,
        margin: 0,
        color: 'white'
    },
    validationMessageContainer: {
        marginTop: 5,
        paddingLeft: 10,
    },
    validationMessage: {
        color: 'white',
    },
    buttonBack: {
        marginRight: '5px',
        paddingRight: '5px'
    },
    back: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },
    tableContainer: {
        width: '95%',
        marginBottom: 15,
    },
    head: {
        height: 40,
        backgroundColor: '#bbb',
        fontFamily: 'Inika'
    },
    headText: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'Inika'
    },
    rowText: {
        margin: 5,
        textAlign: 'center',
        fontFamily: 'Inika',
    },
    border: {
        borderWidth: 1,
        borderColor: '#ccc',
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
        width: 350,
        maxHeight: 700
    },
});
export default Home