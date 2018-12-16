import axios from 'axios';

export async function startGame() {
    return await postMessage("start_game", "start");
}


export async function postMessage(message, state) {
    const res = await axios
        .get("http://localhost:5000/?query=" + message + "&state=" + state);
    return res.data;
}