//const API = process.env.EXPO_PUBLIC_API_URL
const API = 'http://192.168.1.93:3001'

//SECTOR TARJETA
export const MontoMesBitacora = async () => {
  try {
      const res = await fetch(`${API}/tarjeta/montoMes`);
      if (!res.ok) {
          throw new Error(`Error al obtener el monto del mes: ${res.statusText}`);
      }
      const data = await res.json();

      // Verificar si data es null y asignar 0 si es el caso
      const montoMes = data ? data : 0;
      return montoMes;
  } catch (error) {
      console.error(error);
      throw new Error('Falló al extraer monto del mes de bitácora 🚫');
  }
};

export const MontoBitacora = async () => {
  try {
    const res = await fetch(`${API}/tarjeta/montoTotal`); // Cambio en la URL
    return await res.json();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch total bitacora amount'); // Actualiza el mensaje de error
  }
};
//
// SECTOR TÉCNICO
export const getTecnico = async () => {
  try {
    const res = await fetch(`${API}/tecnico`);
     return await res.json();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch tecnico');
  }
};
//
//SECTOR BITÁCORA

export const getBitacora = async () => {
    try {
      const res = await fetch(`${API}/bitacora`);
      return await res.json();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch bitacora');
    }
  };

export const getBitacoraID = async (bitacora_id) => {
    try {
      const res = await fetch(`${API}/bitacora/${bitacora_id}`);
      return await res.json();
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to fetch bitacora with id: ${bitacora_id}`);
    }
  }



  export const saveBitacora = async (bitacoraData) => {
    try {
      const res = await fetch(`${API}/bitacora`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(bitacoraData),
      });
      return await res.json();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to save bitacora');
    }
  };
  
  export const deleteBitacora = async (bitacora_id) => {
    try {
      console.log('Eliminar bitacora con id:', bitacora_id);
      const res = await fetch(`${API}/bitacora/${bitacora_id}`, {
        method: 'DELETE',
      });
      return await res.json();
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to delete bitacora with id: ${bitacora_id}`);
    }
  };

  //SECTOR CALENDARIO

  export const getAgenda = async () => {
    try {
      const res = await fetch(`${API}/agenda`);
      return await res.json();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch agenda');
    }
  };
  
  export const getAgendas = async (agenda_id) => {
    try {
      const res = await fetch(`${API}/agenda/${agenda_id}`);
      return await res.json();
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to fetch agenda with id: ${agenda_id}`);
    }
  };
  
  export const saveAgenda = async (agendaData) => {
    try {
      const res = await fetch(`${API}/agenda`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(agendaData),
      });
      return await res.json();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to save agenda');
    }
  };
  
  export const deleteAgenda = async (agenda_id) => {
    try {
      console.log('Eliminar agenda con id:', agenda_id);
      const res = await fetch(`${API}/agenda/${agenda_id}`, {
        method: 'DELETE',
      });
      return await res.json();
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to delete agenda with id: ${agenda_id}`);
    }
  };
 // SECTOR INVENTARIO

  export const getInventarioCaldera = async () => {
    try {
      const res = await fetch(`${API}/inv_caldera`);
      return await res.json();
    }
    catch (error) {
      console.error(error);
      throw new Error('Failed to fetch inventario caldera');
    }
  };

  export const saveInventarioCaldera = async (inventarioCalderaData) => {
    try {
      const res = await fetch(`${API}/inv_caldera`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(inventarioCalderaData),
      });
      return await res.json();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to save inventario caldera');
    }
  }

  export const updateInventarioCaldera = async (inv_cal_id, inv_cal_cantidad) => {
    try {
      const res = await fetch(`${API}/inv_caldera/${inv_cal_id}`, {
        method: 'PUT',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ inv_cal_cantidad }),
      });
      return await res.json();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update inventario caldera');
    }
  }

  export const getInventarioCalefont = async () => {
    try {
      const res = await fetch(`${API}/inv_calefont`);
      return await res.json();
    }
    catch (error) {
      console.error(error);
      throw new Error('Failed to fetch inventario caldera');
    }
  };

  export const getInventarioEquipo = async () => {
    try {
      const res = await fetch(`${API}/inv_equipo`);
      return await res.json();
    }
    catch (error) {
      console.error(error);
      throw new Error('Failed to fetch inventario caldera');
    }
  };

  export const getInventarioRedagua = async () => {
    try {
      const res = await fetch(`${API}/inv_redagua`);
      return await res.json();
    }
    catch (error) {
      console.error(error);
      throw new Error('Failed to fetch inventario caldera');
    }
  };

  export const getInventarioRedgas= async () => {
    try {
      const res = await fetch(`${API}/inv_redgas`);
      return await res.json();
    }
    catch (error) {
      console.error(error);
      throw new Error('Failed to fetch inventario caldera');
    }
  };



  export const getClienteHistoricoCaldera = async (cliente_id) => {
    try {
      const res = await fetch(`${API}/mantenciones/caldera?cliente_id=${cliente_id}`);
      return await res.json();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch historico mantenciones caldera cliente');
    }
  };
  
  export const getClienteHistoricoCalefont = async (cliente_id) => {
    try {
      const res = await fetch(`${API}/mantenciones/calefont?cliente_id=${cliente_id}`);
      return await res.json();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch historico mantenciones calefont cliente');
    }
  };
  
  
  export const saveMantencionesCaldera = async (mantencionesCalderaData) => {
    try {
      const res = await fetch(`${API}/mantenciones/caldera`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(mantencionesCalderaData),
      });
      return await res.json();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to save mantenciones caldera');
    }
  }
  
  export const saveMantencionesCalefont = async (mantencionesCalefontData) => {
    try {
      const res = await fetch(`${API}/mantenciones/calefont`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(mantencionesCalefontData),
      });
      return await res.json();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to save mantenciones calefont');
    }
  }
  
  export const getClientes = async () => {
    try {
      const res = await fetch(`${API}/clientes`);
      return await res.json();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch clientes');
    }
  }
  
  export const saveCliente = async (clienteData) => {
    try {
      const res = await fetch(`${API}/clientes`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(clienteData),
      });
      return await res.json();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to save cliente');
    }
  }
  
  
  
  export const getMantencionesCaldera = async () => {
    try {
      const res = await fetch(`${API}/mantenciones/caldera`);
      return await res.json();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch mantenciones caldera');
    }
  }
  
  export const getMantencionesCalefont = async () => {
    try {
      const res = await fetch(`${API}/mantenciones/calefont`);
      return await res.json();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch mantenciones calefont');
    }
  }