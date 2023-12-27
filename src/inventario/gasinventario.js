import * as React from 'react';
import { View } from 'react-native';
import BottomBar from '../componentes/bottombar';
import styles from '../style';
import { DataTable, Card} from 'react-native-paper';
import { ScrollView } from 'react-native';
//conexión api
import { getInventarioRedgas } from '../../api';


export default function GasInventario() {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([1,2,3,4,5,6,7,8,9,10,11]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInventarioRedgas();
        const data = response.map(item => ({
          key: item.inv_red_gas_id,
          name: item.inv_red_gas_tipo_repuesto,
          brand: item.inv_red_gas_marca_repuesto,
          cantidad: item.inv_red_gas_cantidad
        }));
        setItems(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Card style={styles.CenterContainer}>
        <Card.Actions>
            <Button
              title="Agregar"
              onPress={() => console.log('Agregar')}
            />
            <Button
              title="Eliminar"
              onPress={() => console.log('Eliminar')}
            />
          </Card.Actions>
        <ScrollView horizontal>
          <DataTable>
            <DataTable.Header style={{textAlign:'center'}}>
              <DataTable.Title>Tipo de repuesto</DataTable.Title>
              <DataTable.Title>Marca</DataTable.Title>
              <DataTable.Title numeric>Cantidad</DataTable.Title>
            </DataTable.Header>

            {items.slice(from, to).map((item) => (
              <TouchableOpacity onPress={handleEditItem (item)}>
              <DataTable.Row key={item.key}>
                <DataTable.Cell>{item.name}</DataTable.Cell>
                <DataTable.Cell>{item.brand}</DataTable.Cell>
                <DataTable.Cell numeric>{item.cantidad}</DataTable.Cell>
              </DataTable.Row>
              </TouchableOpacity>
            ))}
            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(items.length / itemsPerPage)}
              onPageChange={(newPage) => setPage(newPage)}
              label={`${from + 1}-${to} de ${items.length}`}
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              numberOfItemsPerPage={itemsPerPage}
              onItemsPerPageChange={(newItemsPerPage) =>
                onItemsPerPageChange(newItemsPerPage)
              }
              showFastPaginationControls
              selectPageDropdownLabel={'Filas por página'}
            />
          </DataTable>
          <View style={{ height: 80 }}></View>
          </ScrollView>
        </Card>
      </View>
      <BottomBar styles={styles.bottomBar} />
    </View>
  );
}
