import axios from 'axios';

export async function startGame() {
    return await postMessage("start_game");
}


export async function postMessage(message) {
    const res = await axios
        .get("http://localhost:5000/?query=" + message);
    return res.data.text;
}