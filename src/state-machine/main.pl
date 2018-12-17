:- use_module(library(http/json), [json_read_dict/2]).
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_cors), [cors_enable/0]).
:- use_module(library(http/http_json), [reply_json/1, reply_json/2]).
:- use_module(library(http/http_parameters), [http_parameters/2]).
:- use_module(library(http/http_dispatch)).

get_path(State, Path) :-
    string_concat("content/", State, HalfPath),
    string_concat(HalfPath, ".json", Path).

read_json(State, JsonDict) :-
    get_path(State, Path),
    open(Path, read, JsonStream),
    json_read_dict(JsonStream, JsonDict).

get_match_action(Query, [Action|_], Action) :-
    member(Query, Action.action).

get_match_action(Query, [_|T], Action) :-
    get_match_action(Query, T, Action). 

say(_, intro, State, Text) :-
    read_json(intro, IntroDict),
    [Event|_]=IntroDict.events,
    [Action|_]=Event.event.actions,
    Text=Action.text,
    State=episode1.

say(Query, episode1, State, Text) :-
    read_json(episode1, Dict),
    [Event|_]=Dict.events,
    get_match_action(Query, Event.event.actions, Action),
    Text=Action.text,
    State=episode2.

read_text(State, Text) :-
    read_json(State, Dict),
    [Event|_]=Dict.events,
    Text=Event.event.text.
    

:- http_handler(root(read), read_handler, []).		
:- http_handler(root(action), action_handler, []).	
:- set_setting(http:cors, [*]).

server(Port) :-
    http_server(http_dispatch, [port(Port)]).

read_handler(Request) :-
    http_parameters(Request, [state(State, [])]),
    cors_enable,
    read_text(State, T),
    reply_json(response{text:T}), !.

action_handler(Request) :-
    http_parameters(Request, [query(Query, []), state(State, [])]),
    cors_enable,
    downcase_atom(Query, LowerCaseQuery),
    atom_string(LowerCaseQuery, QueryString),
    say(QueryString, State, NextState, T),
    reply_json(response{state:NextState, text:T}), !.