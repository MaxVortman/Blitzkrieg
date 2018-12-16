:- use_module(library(http/json), [json_read_dict/2]).
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_cors), [cors_enable/0]).
:- use_module(library(http/http_json), [reply_json/1, reply_json/2]).
:- use_module(library(http/http_parameters), [http_parameters/2]).
:- use_module(library(http/http_dispatch)).

read_json(Path, JsonDict) :-
    open(Path, read, JsonStream),
    json_read_dict(JsonStream, JsonDict).

get_match_action(Query, [Action|_], Action) :-
    member(Query, Action.action).

get_match_action(Query, [_|T], Action) :-
    get_match_action(Query, T, Action). 

say("start_game", _, State, Text) :-
    read_json("content/intro.json", IntroDict),
    [Event|_] = IntroDict.events,
    Text = Event.event.text,
    State = intro.

say(_, intro, State, Text) :-
    read_json("content/intro.json", IntroDict),
    [Event|_] = IntroDict.events,
    [Action|_] = Event.event.actions,
    Text = Action.text,
    State = episode1.

say(".", episode1, State, Text) :-
    read_json("content/episode-1.json", Dict),
    [Event|_] = Dict.events,
    Text = Event.event.text,
    State = episode1_action.

say(Query, episode1_action, State, Text) :-
    read_json("content/episode-1.json", Dict),
    [Event|_] = Dict.events,
    get_match_action(Query, Event.event.actions, Action),
    Text = Action.text,
    State = episode2.

:- http_handler(root(.), query_handler, []).		
:- set_setting(http:cors, [*]).

server(Port) :-
    http_server(http_dispatch, [port(Port)]).

query_handler(Request) :-
    http_parameters(Request, [ query(Query, []), state(State, [])]),
    cors_enable,
    downcase_atom(Query, LowerCaseQuery),
    atom_string(LowerCaseQuery, QueryString),
    say(QueryString, State, NextState,T),
    reply_json(response{text:T, state:NextState}), !.