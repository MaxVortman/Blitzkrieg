:- use_module(library(http/json), [json_read_dict/2]).
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_cors), [cors_enable/0]).
:- use_module(library(http/http_json), [reply_json/1, reply_json/2]).
:- use_module(library(http/http_parameters), [http_parameters/2]).
:- use_module(library(http/http_dispatch)).

:- dynamic state/1.
state(default).

read_json(Path, JsonDict) :-
    open(Path, read, JsonStream),
    json_read_dict(JsonStream, JsonDict).

move_to_next_state(Next) :-
    retract(state(_)),
    asserta(state(Next)).

restart :-
    move_to_next_state(default).

get_match_action(Query, [Action|_], Action) :-
    member(Query, Action.action).

get_match_action(Query, [_|T], Action) :-
    get_match_action(Query, T, Action). 

say("start_game", Text) :-
    state(default),
    read_json("content/intro.json", IntroDict),
    [Event|_] = IntroDict.events,
    Text = Event.event.text,
    move_to_next_state(intro).
    % _{events:[_{event:_{next_episode:_, text:T}}]}:<IntroDict.

say(_, Text) :-
    state(intro),
    read_json("content/intro.json", IntroDict),
    [Event|_] = IntroDict.events,
    [Action|_] = Event.event.actions,
    Text = Action.text,
    move_to_next_state(episode1).

say(".", Text) :-
    state(episode1),
    read_json("content/episode-1.json", Dict),
    [Event|_] = Dict.events,
    Text = Event.event.text,
    move_to_next_state(episode1_action).

say(Query, Text) :-
    state(episode1_action),
    read_json("content/episode-1.json", Dict),
    [Event|_] = Dict.events,
    get_match_action(Query, Event.event.actions, Action),
    Text = Action.text,
    move_to_next_state(episode2).

:- http_handler(root(.), query_handler, []).		
:- set_setting(http:cors, [*]).

server(Port) :-
    http_server(http_dispatch, [port(Port)]).

query_handler(Request) :-
    http_parameters(Request, [ query(Query, [])]),
    cors_enable,
    downcase_atom(Query, LowerCaseQuery),
    atom_string(LowerCaseQuery, QueryString),
    say(QueryString, T),
    reply_json(response{text:T}), !.