import axios from 'axios';

export async function postMessage(message, state) {
    const res = await axios
        .get("http://localhost:5000/action?query=" + message + "&state=" + state);
    return res.data;
}

export async function readMessage(state){
    const res = await axios
        .get("http://localhost:5000/read?state=" + state);
    return res.data;
}