import axios from 'axios';
import { playerData, setPlayerData } from './playerData';

export async function postMessage(message, state) {
    const url = "http://localhost:5000/action?query=" + message + "&state=" + state;
    const res = await axios.post(url, playerData);
    setPlayerData(res.data.playerData);
    return res.data;
}

export async function readMessage(state) {
    const res = await axios
        .post("http://localhost:5000/read?state=" + state, playerData);
    return res.data;
}