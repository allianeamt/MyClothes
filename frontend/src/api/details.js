import axios from 'axios';

async function getData () {

    const response = await axios.get('http://localhost:3000/specifications').catch((error) => {
        return error.response.status;
    });
    return response.data;
}

function updateSpecifications (newData) {
    const response = axios.put('http://localhost:3000/specifications', newData).catch((error) => {
        return error.response.status;
    });
    return response.status;
}

export { getData, updateSpecifications }