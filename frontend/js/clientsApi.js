
export const getClients = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/clients', {
      method: 'GET'
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const sendClientData = async (client, method, id = null) => {
  try {
    const response = await fetch(`http://localhost:3000/api/clients/${method === 'POST' ? '' : id}`, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(client)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const deleteClientItem = async (id) => {
  try {
    await fetch(`http://localhost:3000/api/clients/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export const findClient = async (value) => {
  try {
    const response = await fetch(`http://localhost:3000/api/clients?search=${value}`, {
      method: 'GET'
    });
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error);
  }
}