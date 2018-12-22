export let playerData = {
    name: '',
    episode1Answer: ''
};

export function setPlayerData(data) {
    playerData.episode1Answer = data.episode1Answer;
    playerData.name = data.name;
}

export function getStringifyPlayerData() {
    return playerData.episode1Answer + '\n';
}