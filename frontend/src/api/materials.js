import axios from 'axios';

async function getData () {
    const response = await axios.get('http://localhost:3000/materials').catch((error) => {
        return error.response.status;
    });
    return response.data;
}

function updateData (newData) {
    const response = axios.put('http://localhost:3000/materials', newData).catch((error) => {
        return error.response.status;
    });
    return response.status;
}

export { getData, updateData }
