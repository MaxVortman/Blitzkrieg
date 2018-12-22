import axios from 'axios';
import { playerData } from './playerData';

export async function postMessage(message, state) {
    const url = "http://localhost:5000/action?query=" + message + "&state=" + state;
    const res = await axios.post(url, playerData);
    playerData.set(res.data.playerData);
    return res.data;
}

export async function readMessage(state) {
    const res = await axios
        .post("http://localhost:5000/read?state=" + state, playerData);
    return res.data;
}