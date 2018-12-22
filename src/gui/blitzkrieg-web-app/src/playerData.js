export let playerData = {
    episode1Answer: '',
    episode3Answer: '',
    episode4Answer: '',
    episode5Answer: '',
    episode6Answer: '',
    episode7Answer: '',
    episode8Answer: '',
    episode9Answer: '',
    readBookEpisodeAnswer: '',
    readEpisodeAnswer: '',
    talkEpisodeAnswer: '',
    set: function (data) {
        for (var attr in data) {
            if (this[attr] !== data[attr])
                this[attr] = data[attr];
        }
    },
    toString: function () {
        var str = '';
        for (var attr in this) {
            if (typeof this[attr] === 'string' && this[attr] !== '') {
                str += this[attr] + '\n';
            }
        }
        return str;
    }
};