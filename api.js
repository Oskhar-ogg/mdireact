const API = process.env.EXPO_PUBLIC_API_URL
//const API = 'http://192.168.1.93:3001'

//SECTOR TARJETA
export const MontoMesBitacora = async () => {
  try {
      const res = await fetch(`${API}/tarjeta/montoMes`)
      if (!res.ok) {
          throw new Error(`Error al obtener el monto del mes: ${res.statusText}`)
      }
      const data = await res.json()
      // Verificar si data es null y asignar 0 si es el caso
      const montoMes = data ? data : 0
      return montoMes
  } catch (error) {
      console.error(error)
      throw new Error('Falló al extraer monto del mes de bitácora 🚫')
  }
}

export const MontoBitacora = async () => {
  try {
    const res = await fetch(`${API}/tarjeta/montoTotal`)
    if (!res.ok) {
      throw new Error(`Error al obtener el monto total: ${res.statusText}`)
    }
    const data = await res.json()
    // Verificar si data es null y asignar 0 si es el caso
    const montoTotal = data ? data : 0
    return montoTotal
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch total bitacora amount') // Actualiza el mensaje de error
  }
}

export const gastoMesBoletasApi = async () => {  // Cambiado el nombre de la función
  try {
    const res = await fetch(`${API}/tarjeta/gastomesboletas`)
    if (!res.ok) {
      throw new Error(`Error al obtener el monto total: ${res.statusText}`)
    }
    const data = await res.json()
    // Verificar si data es un array y obtener el primer elemento
    const firstElement = Array.isArray(data) ? data[0] : null
    // Obtener el valor de "Gasto_mes_boletas" o asignar 0 si es nulo
    const Gastoboletas = firstElement ? firstElement.Gasto_mes_boletas : 0
    return Gastoboletas
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch total boletas amount')
  }
}

export const gastoMesFacturasApi = async () => {
  try {
    const res = await fetch(`${API}/tarjeta/gastomesfacturas`);
    if (!res.ok) {
      throw new Error(`Error al obtener el monto total: ${res.statusText}`);
    }
    const data = await res.json();
    // Verificar si data es un array y obtener el primer elemento
    const firstElement = Array.isArray(data) ? data[0] : null;
    // Obtener el valor de "Gasto_mes_facturas" o asignar 0 si es nulo
    const Gastofacturas = firstElement ? firstElement.Gasto_mes_facturas : 0;
    return Gastofacturas;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch total facturas amount');
  }
};


//
// SECTOR TÉCNICO
export const getTecnico = async () => {
  try {
    const res = await fetch(`${API}/tecnico`)
     return await res.json()
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch tecnico')
  }
}
//
//SECTOR BITÁCORA

export const getBitacora = async () => {
    try {
      const res = await fetch(`${API}/bitacora`)
      return await res.json()
    } catch (error) {
      console.error(error)
      throw new Error('Failed to fetch bitacora')
    }
  }

export const getBitacoraID = async (bitacora_id) => {
    try {
      const res = await fetch(`${API}/bitacora/${bitacora_id}`)
      return await res.json()
    } catch (error) {
      console.error(error)
      throw new Error(`Failed to fetch bitacora with id: ${bitacora_id}`)
    }
  }



  export const saveBitacora = async (bitacoraData) => {
    try {
      const res = await fetch(`${API}/bitacora`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(bitacoraData),
      })
      return await res.json()
    } catch (error) {
      console.error(error)
      throw new Error('Failed to save bitacora')
    }
  }
  
  export const deleteBitacora = async (bitacora_id) => {
    try {
      console.log('Eliminar bitacora con id:', bitacora_id)
      const res = await fetch(`${API}/bitacora/${bitacora_id}`, {
        method: 'DELETE',
      })
      return await res.json()
    } catch (error) {
      console.error(error)
      throw new Error(`Failed to delete bitacora with id: ${bitacora_id}`)
    }
  }

  //SECTOR CALENDARIO

  export const getAgenda = async () => {
    try {
      const res = await fetch(`${API}/agenda`)
      return await res.json()
    } catch (error) {
      console.error(error)
      throw new Error('Failed to fetch agenda')
    }
  }
  
  export const getAgendas = async (agenda_id) => {
    try {
      const res = await fetch(`${API}/agenda/${agenda_id}`)
      return await res.json()
    } catch (error) {
      console.error(error)
      throw new Error(`Failed to fetch agenda with id: ${agenda_id}`)
    }
  }
  
  export const saveAgenda = async (agendaData) => {
    try {
      const res = await fetch(`${API}/agenda`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(agendaData),
      })
      return await res.json()
    } catch (error) {
      console.error(error)
      throw new Error('Failed to save agenda')
    }
  }
  
  export const deleteAgenda = async (agenda_id) => {
    try {
      console.log('Eliminar agenda con id:', agenda_id)
      const res = await fetch(`${API}/agenda/${agenda_id}`, {
        method: 'DELETE',
      })
      return await res.json()
    } catch (error) {
      console.error(error)
      throw new Error(`Failed to delete agenda with id: ${agenda_id}`)
    }
  }
 // SECTOR INVENTARIO

  export const getInventarioCaldera = async () => {
    try {
      const res = await fetch(`${API}/inv_caldera`)
      return await res.json()
    }
    catch (error) {
      console.error(error)
      throw new Error('Failed to fetch inventario caldera')
    }
  }

  export const saveInventarioCaldera = async (inventarioCalderaData) => {
    try {
      const res = await fetch(`${API}/inv_caldera`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(inventarioCalderaData),
      })
      return await res.json()
    } catch (error) {
      console.error(error)
      throw new Error('Failed to save inventario caldera')
    }
  }

  export const deleteInventarioCaldera = async (inv_cal_id) => {
    try {
      console.log('Eliminar inventario caldera con id:', inv_cal_id)
      const res = await fetch(`${API}/inv_caldera/${inv_cal_id}`, {
        method: 'DELETE',
      })
      return await res.json()
    } catch (error) {
      console.error(error)
      throw new Error(`Failed to delete inventario caldera with id: ${inv_cal_id}`)
    }
  }

  export const updateInventarioCaldera = async (inv_cal_id, inv_cal_cantidad) => {
    console.log('Actualizar inventario caldera con id:', inv_cal_id, inv_cal_cantidad);
    try {
      const response = await fetch(`${API}/inv_caldera/${inv_cal_id}`, {
        method: 'PATCH',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ inv_cal_id, inv_cal_cantidad }),
      });
      
      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update inventario caldera');
    }
  };
  

  export const getInventarioCalefont = async () => {
    try {
      const res = await fetch(`${API}/inv_calefont`)
      return await res.json()
    }
    catch (error) {
      console.error(error)
      throw new Error('Failed to fetch inventario caldera')
    }
  }

  export const saveInventarioCalefont = async (inventarioCalefontData) => {
    try {
      const res = await fetch(`${API}/inv_calefont`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(inventarioCalefontData),
      })
      return await res.json()
    } catch (error) {
      console.error(error)
      throw new Error('Failed to save inventario calefont')
    }
  }

  export const updateInventarioCalefont = async (inv_calefont_id, inv_calefont_cantidad) => {
    console.log('Actualizar inventario calefont con id:', inv_calefont_id, inv_calefont_cantidad);
    try {
      const response = await fetch(`${API}/inv_calefont/${inv_calefont_id}`, {
        method: 'PATCH',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({inv_calefont_id, inv_calefont_cantidad}),
      })
      
      return await response.json()
    } catch (error) {
      console.error(error)
      throw new Error('Failed to update inventario calefont')
    }
  }

  export const deleteInventarioCalefont = async (inv_calf_id) => {
    try {
      console.log('Eliminar inventario calefont con id:', inv_calf_id)
      const res = await fetch(`${API}/inv_calefont/${inv_calf_id}`, {
        method: 'DELETE',
      })
      return await res.json()
    } catch (error) {
      console.error(error)
      throw new Error(`Failed to delete inventario calefont with id: ${inv_calf_id}`)
    }
  }


  export const getInventarioEquipo = async () => {
    try {
      const res = await fetch(`${API}/inv_equipo`)
      return await res.json()
    }
    catch (error) {
      console.error(error)
      throw new Error('Failed to fetch inventario caldera')
    }
  }

  export const saveInventarioEquipo = async (inventarioEquipoData) => {
    try {
      const res = await fetch(`${API}/inv_equipo`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(inventarioEquipoData),
      })
      return await res.json()
    } catch (error) {
      console.error(error)
      throw new Error('Failed to save inventario equipo')
    }
  }

  export const updateInventarioEquipo = async (inv_equipo_id, inv_equipo_cantidad) => {
    try {
      const response = await fetch(`${API}/inv_equipo/${inv_equipo_id}`, {
        method: 'PATCH',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({inv_equipo_id, inv_equipo_cantidad}),
      })
      
      return await response.json()
    } catch (error) {
      console.error(error)
      throw new Error('Failed to update inventario equipo')
    }
  }

  export const deleteInventarioEquipo = async (inv_equ_id) => {
    try {
      console.log('Eliminar inventario equipo con id:', inv_equ_id)
      const res = await fetch(`${API}/inv_equipo/${inv_equ_id}`, {
        method: 'DELETE',
      })
      return await res.json()
    } catch (error) {
      console.error(error)
      throw new Error(`Failed to delete inventario equipo with id: ${inv_equ_id}`)
    }
  }

  export const getInventarioRedagua = async () => {
    try {
      const res = await fetch(`${API}/inv_redagua`)
      return await res.json()
    }
    catch (error) {
      console.error(error)
      throw new Error('Failed to fetch inventario caldera')
    }
  }

  export const saveInventarioRedagua = async (inventarioRedaguaData) => {
    try {
      const res = await fetch(`${API}/inv_redagua`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(inventarioRedaguaData),
      })
      return await res.json()
    } catch (error) {
      console.error(error)
      throw new Error('Failed to save inventario redagua')
    }
  }

  export const updateInventarioRedagua = async (inv_red_agua_id, inv_red_agua_cantidad) => {
    try {
      const response = await fetch(`${API}/inv_redagua/${inv_red_agua_id}`, {
        method: 'PATCH',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({inv_red_agua_id, inv_red_agua_cantidad}),
      })
      
      return await response.json()
    } catch (error) {
      console.error(error)
      throw new Error('Failed to update inventario redagua')
    }
  }

  export const deleteInventarioRedagua = async (inv_red_id) => {
    try {
      console.log('Eliminar inventario redagua con id:', inv_red_id)
      const res = await fetch(`${API}/inv_redagua/${inv_red_id}`, {
        method: 'DELETE',
      })
      return await res.json()
    } catch (error) {
      console.error(error)
      throw new Error(`Failed to delete inventario redagua with id: ${inv_red_id}`)
    }
  }

  export const getInventarioRedgas= async () => {
    try {
      const res = await fetch(`${API}/inv_redgas`)
      return await res.json()
    }
    catch (error) {
      console.error(error)
      throw new Error('Failed to fetch inventario caldera')
    }
  }

  export const saveInventarioRedgas = async (inventarioRedgasData) => {
    try {
      const res = await fetch(`${API}/inv_redgas`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(inventarioRedgasData),
      })
      return await res.json()
    } catch (error) {
      console.error(error)
      throw new Error('Failed to save inventario redgas')
    }
  }

  export const updateInventarioRedgas = async (inv_red_gas_id, inv_red_gas_cantidad) => {
    try {
      const response = await fetch(`${API}/inv_redgas/${inv_red_gas_id}`, {
        method: 'PATCH',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({inv_red_gas_id, inv_red_gas_cantidad}),
      })
      
      return await response.json()
    } catch (error) {
      console.error(error)
      throw new Error('Failed to update inventario redgas')
    }
  }

  export const deleteInventarioRedgas = async (inv_gas_id) => {
    try {
      console.log('Eliminar inventario redgas con id:', inv_gas_id)
      const res = await fetch(`${API}/inv_redgas/${inv_gas_id}`, {
        method: 'DELETE',
      })
      return await res.json()
    } catch (error) {
      console.error(error)
      throw new Error(`Failed to delete inventario redgas with id: ${inv_gas_id}`)
    }
  }

  export const getClienteHistoricoCaldera = async (cliente_id) => {
    try {
      const res = await fetch(`${API}/mantenimiento/caldera/${cliente_id}`);
      const jsonRes = await res.json();
      console.log('res:', jsonRes);
      return jsonRes;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch historico mantenciones caldera cliente');
    }
  };
  
  export const getClienteHistoricoCalefont = async (cliente_id) => {
    try {
      const res = await fetch(`${API}/mantenimiento/calefont/${cliente_id}`);
      const jsonRes = await res.json();
      console.log('res:', jsonRes);
      return jsonRes;
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
      })
      return await res.json()
    } catch (error) {
      console.error(error)
      throw new Error('Failed to save mantenciones caldera')
    }
  }
  
  export const saveMantencionesCalefont = async (mantencionesCalefontData) => {
    try {
      const res = await fetch(`${API}/mantenciones/calefont`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(mantencionesCalefontData),
      })
      return await res.json()
    } catch (error) {
      console.error(error)
      throw new Error('Failed to save mantenciones calefont')
    }
  }
  
  export const getClientes = async () => {
    try {
      const res = await fetch(`${API}/clientes`)
      return await res.json()
    } catch (error) {
      console.error(error)
      throw new Error('Failed to fetch clientes')
    }
  }
  
  export const saveCliente = async (clienteData) => {
    try {
      const res = await fetch(`${API}/clientes`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(clienteData),
      })
      return await res.json()
    } catch (error) {
      console.error(error)
      throw new Error('Failed to save cliente')
    }
  }
  
  
  
  export const getMantencionesCaldera = async () => {
    try {
      const res = await fetch(`${API}/mantenciones/caldera`)
      return await res.json()
    } catch (error) {
      console.error(error)
      throw new Error('Failed to fetch mantenciones caldera')
    }
  }
  
  export const getMantencionesCalefont = async () => {
    try {
      const res = await fetch(`${API}/mantenciones/calefont`)
      return await res.json()
    } catch (error) {
      console.error(error)
      throw new Error('Failed to fetch mantenciones calefont')
    }
  }