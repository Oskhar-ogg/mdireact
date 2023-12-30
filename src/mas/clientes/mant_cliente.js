import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Card } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { getClienteHistoricoCaldera, getClienteHistoricoCalefont } from '../../../api';
import styles from '../../style';
import BottomBar from '../../componentes/bottombar';

const HistoricoCliente = ({ route }) => {
    const [historicoCaldera, setHistoricoCaldera] = useState([]);
    const [historicoCalefont, setHistoricoCalefont] = useState([]);
    const { clienteId } = route.params;
    const navigation = useNavigation();

    const handleHistoricoCaldera = async () => {
        try {
            const response = await getClienteHistoricoCaldera(clienteId);
            setHistoricoCaldera(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleHistoricoCalefont = async () => {
        try {
            const response = await getClienteHistoricoCalefont(clienteId);
            setHistoricoCalefont(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleHistoricoCaldera();
        handleHistoricoCalefont();
    }, [clienteId]);

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Card style={styles.TopContainer}>
                    <Card.Title>Historico de Calderas</Card.Title>
                    <Card.Divider />
                    <FlatList
                        data={historicoCaldera}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => navigation.navigate('Histórico Cliente', { clienteId: item.cliente_id })}>
                                <Card>
                                    <Card.Title>Mantenimiento Historico del equipo</Card.Title>
                                    <Card.Divider/>
                                    <Text>Dueño del equipo: {item.cliente_nombre}</Text>
                                    <Text>Marca: {item.caldera_marca}</Text>
                                    <Text>Modelo: {item.caldera_modelo}</Text>
                                    <Text>Fecha de ultima mantención: {item.mantenimiento_fecha}</Text>
                                    <Text>Servicio Ejecutado: {item.mantenimiento_descripcion}</Text>
                                </Card>
                            </TouchableOpacity>
                        )}
                    />
                </Card>
                <View style={styles.BottomContainer} />
                <Card style={styles.container}>
                    <Card.Title>Historico de Calefont</Card.Title>
                    <Card.Divider />
                    <FlatList
                        data={historicoCalefont}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => navigation.navigate('Histórico Cliente', { clienteId: item.cliente_id })}>
                                <Card>
                                    <Card.Title>Mantenimiento Historico del equipo</Card.Title>
                                    <Card.Divider />
                                    <Text>Dueño del equipo: {item.cliente_nombre}</Text>
                                    <Text>Marca: {item.calefont_marca}</Text>
                                    <Text>Modelo: {item.calefont_modelo}</Text>
                                    <Text>Fecha de ultima mantención: {item.mantenimiento_fecha}</Text>
                                    <Text>Servicio Ejecutado: {item.mantenimiento_descripcion}</Text>
                                </Card>
                            </TouchableOpacity>
                        )}
                    />
                </Card>
                </View>
                <View style={{ height: 50 }}></View>
                <BottomBar />
            </View>
    );
};

export default HistoricoCliente;
