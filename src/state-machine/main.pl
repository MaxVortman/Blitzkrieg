:- use_module(library(http/json), [json_read_dict/2]).

read_json(Path, JsonDict) :-
    open(Path, read, JsonStream),
    json_read_dict(JsonStream, JsonDict).
    

say(start_game, T) :-
    atom_string(Path, "C:\\Users\\User\\source\\repos\\Blitzkrieg\\content\\intro.json"),
    read_json(Path, IntroDict),
    _{events: [_{condition: _, event: _{'next-episode': _, text: T}}]} :< IntroDict.