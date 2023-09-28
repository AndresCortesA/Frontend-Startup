"use strict";

// Función para realizar una solicitud GET a la API
async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

// Función para obtener todos los campus desde la API
async function getAllCampuses() {
  const url = 'http://localhost:1234/campuses';
  return await fetchData(url);
}

// Función para obtener un campus por su ID desde la API
async function getCampusById(id) {
  const url = `http://localhost:1234/campuses/${id}`;
  return await fetchData(url);
}

// Función para crear un campus a través de la API
async function createCampus(campusData) {
  const url = 'http://localhost:1234/campuses';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(campusData),
    });

    if (!response.ok) {
      throw new Error('Error creating campus');
    }

    return true;
  } catch (error) {
    console.error('Error creating campus:', error);
    return false;
  }
}

// Función para actualizar un campus por su ID a través de la API
async function updateCampusById(id, campusData) {
  const url = `http://localhost:1234/campuses/${id}`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(campusData),
    });

    if (!response.ok) {
      throw new Error('Error updating campus');
    }

    return true;
  } catch (error) {
    console.error('Error updating campus:', error);
    return false;
  }
}

// Función para eliminar un campus por su ID a través de la API
async function deleteCampusById(id) {
  const url = `http://localhost:1234/campuses/${id}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error deleting campus');
    }

    return true;
  } catch (error) {
    console.error('Error deleting campus:', error);
    return false;
  }
}

// Función para cargar y mostrar la tabla de campus
async function loadCampusTable() {
  try {
    const response = await getAllCampuses();

    // Verificar que la respuesta no sea null y tenga una propiedad 'body' que sea un array
    if (response && Array.isArray(response.body)) {
      const campuses = response.body;
      const tableBody = document.querySelector('#campus-table tbody');

      // Limpiar la tabla existente
      tableBody.innerHTML = '';

      // Llenar la tabla con datos de la API
campuses.forEach(campus => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${campus.CampusName}</td>
    <td>
      <button class="btn btn-primary btn-sm" onclick="editCampus(${campus.ID})">Editar</button>
      <button class="btn btn-danger btn-sm" onclick="deleteCampus(${campus.ID})">Eliminar</button>
    </td>
  `;
  tableBody.appendChild(row);
});

    } else {
      console.error('La respuesta de la API no es un array válido:', response);
    }
  } catch (error) {
    console.error('Error al cargar la tabla de campus:', error);
  }
}


// Función para manejar la acción de edición de un campus
async function editCampus(id) {
  // Obtener los datos del campus por su ID
  const campus = await getCampusById(id);

  // Verificar si se obtuvieron datos
  if (campus) {
    // Llenar un formulario con los datos del campus para la edición
    const campusName = prompt('Editar nombre del campus:', campus.CampusName);
    if (campusName !== null) {
      const updatedCampusData = { CampusName: campusName };
      const success = await updateCampusById(id, updatedCampusData);

      if (success) {
        alert('Campus actualizado con éxito');
        // Volver a cargar la tabla de campus
        loadCampusTable();
      } else {
        alert('Error al actualizar el campus');
      }
    }
  }
}

// Función para manejar la acción de eliminación de un campus
async function deleteCampus(id) {
  const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este campus?');

  if (confirmDelete) {
    const success = await deleteCampusById(id);

    if (success) {
      alert('Campus eliminado con éxito');
      // Volver a cargar la tabla de campus
      loadCampusTable();
    } else {
      alert('Error al eliminar el campus');
    }
  }
}

// Cargar la tabla de campus al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  loadCampusTable();
});
