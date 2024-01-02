import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Card } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { getClienteHistoricoCaldera, getClienteHistoricoCalefont } from '../../../api';
import styles from '../../style';
import BottomBar from '../../componentes/bottombar';

const renderHistoricoItemCaldera = (item, navigation) => (
    <TouchableOpacity onPress={() => navigation.navigate('Histórico Cliente', { clienteId: item.cliente_id })}>
        <Card>
            <Text h4>Dueño del equipo: {item.cliente_nombre}</Text>
            <Text h4>Marca: {item.caldera_marca}</Text>
            <Text h4>Modelo: {item.caldera_modelo}</Text>
            <Text h4>Fecha de última mantención: {item.mantenimiento_fecha ? new Date(item.mantenimiento_fecha).toLocaleDateString() : 'Fecha no disponible'}</Text>
            <Text h4>Servicio Ejecutado: {item.mantenimiento_descripcion}</Text>
        </Card>
    </TouchableOpacity>
);

const renderHistoricoItemCalefont = (item, navigation) => (
    <TouchableOpacity onPress={() => navigation.navigate('Histórico Cliente', { clienteId: item.cliente_id })}>
        <Card>
            <Text h4>Dueño del equipo: {item.cliente_nombre}</Text>
            <Text h4>Marca: {item.calefont_marca}</Text>
            <Text h4>Modelo: {item.calefont_modelo}</Text>
            <Text h4>Fecha de última mantención: {item.mantenimiento_fecha ? new Date(item.mantenimiento_fecha).toLocaleDateString() : 'Fecha no disponible'}</Text>
            <Text h4>Servicio Ejecutado: {item.mantenimiento_descripcion}</Text>
        </Card>
    </TouchableOpacity>
);

const HistoricoCliente = ({ route }) => {
    const [historicoCaldera, setHistoricoCaldera] = useState([]);
    const [historicoCalefont, setHistoricoCalefont] = useState([]);
    const { clienteId } = route.params;
    const navigation = useNavigation();

    const handleHistoricoCaldera = async () => {
        try {
            const response = await getClienteHistoricoCaldera(clienteId);
            setHistoricoCaldera(response || []); // Asegurar que sea un array
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleHistoricoCalefont = async () => {
        try {
            const response = await getClienteHistoricoCalefont(clienteId);
            setHistoricoCalefont(response || []); // Asegurar que sea un array
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        handleHistoricoCaldera();
        handleHistoricoCalefont();
    }, [clienteId]);

    return (
        <View style={styles.container}>
            <Card style={styles.TopContainer}>
                <Card.Title>Historico de Calderas</Card.Title>
                <Card.Divider />
                {(historicoCaldera !== null && historicoCaldera.length === 0) ? (
                    <Text>No hay datos registrados para este cliente en mantenimiento de calderas.</Text>
                ) : (
                    <FlatList
                        data={historicoCaldera}
                        renderItem={({ item }) => renderHistoricoItemCaldera(item, navigation)}
                    />
                )}
            </Card>

            <Card style={styles.TopContainer}>
                <Card.Title>Historico de Calefont</Card.Title>
                <Card.Divider />
                {(historicoCalefont !== null && historicoCalefont.length === 0) ? (
                    <Text>No hay datos registrados para este cliente en mantenimiento de calefonts.</Text>
                ) : (
                    <FlatList
                        data={historicoCalefont}
                        renderItem={({ item }) => renderHistoricoItemCalefont(item, navigation)}
                    />
                )}
            </Card>
            <View style={{ height: 80 }}></View>            
            <BottomBar />
        </View>
    );
};

export default HistoricoCliente;
