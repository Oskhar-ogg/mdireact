const API = process.env.EXPO_PUBLIC_API_URL

export const MontoMesBitacora = async () => {
  try {
      const res = await fetch(`${API}/mes`);
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
    const res = await fetch(`${API}/total`); // Cambio en la URL
    return await res.json();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch total bitacora amount'); // Actualiza el mensaje de error
  }
};


export const getBitacora = async () => {
    try {
      const res = await fetch(`${API}/bitacora`);
      return await res.json();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch bitacora');
    }
  };

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