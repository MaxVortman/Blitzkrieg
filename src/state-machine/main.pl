:- use_module(library(http/json), [json_read/2,json_read_dict/2]).
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_cors), [cors_enable/2,cors_enable/0]).
:- use_module(library(http/http_json),
              [reply_json/1,reply_json_dict/1, http_read_json_dict/2]).
:- use_module(library(http/http_parameters), [http_parameters/2]).
:- use_module(library(http/http_client), [http_read_data/3]).
:- use_module(library(http/http_dispatch)).

get_path(State, Path) :-
    string_concat("content/", State, HalfPath),
    string_concat(HalfPath, ".json", Path).

read_json(State, JsonDict) :-
    get_path(State, Path),
    open(Path, read, JsonStream),
    json_read_dict(JsonStream, JsonDict).

get_match_action(_, [Action], Action).

get_match_action(Query, [Action|_], Action) :-
    member(Query, Action.action).

get_match_action(Query, [_|T], Action) :-
    get_match_action(Query, T, Action). 

make_changes([Change|Changes], Data, ResData) :-
    string_to_atom(Change.property, Prop),
    NewData=Data.put(Prop, Change.value),
    make_changes(Changes, NewData, ResData).

make_changes([], Data, Data).

handle_changes(Action, Data, NewData) :-
    has_key(Action, player_data_changes),
    make_changes(Action.player_data_changes, Data, NewData).

handle_changes(_, Data, Data).

has_key(Dict, Key) :-
    dict_keys(Dict, Keys),
    member(Key, Keys).

conditions_true([H|T], Data) :-
    string_to_atom(H.property, Prop),
    Data.get(Prop) = H.value,
    conditions_true(T, Data).

conditions_true([], _).

get_match_event([Event], _, Event).

get_match_event([H|_], Data, H) :-
    conditions_true(H.conditions, Data).

get_match_event([_|T], Data, Event) :-
    get_match_event(T, Data, Event).

say(Query, State, NewState, Text, Data, NewData) :-
    read_json(State, Dict),
    get_match_event(Dict.events, Data, Event),
    get_match_action(Query, Event.event.actions, Action),
    Text=Action.text,
    NewState=Event.event.default_next_episode,
    handle_changes(Action, Data, NewData), !.

read_text(State, NextState, Text, Data, HaveAction) :-
    read_json(State, Dict),
    get_match_event(Dict.events, Data, Event),
    Text=Event.event.text,
    HaveAction=Event.event.have_action,
    NextState=Event.event.default_next_episode.
    
:- http_handler(root(read), read_handler, []).		
:- http_handler(root(action), action_handler, []).	
:- set_setting(http:cors, [*]).

server(Port) :-
    http_server(http_dispatch, [port(Port)]).

read_handler(Request) :-
    option(method(options), Request), !,
    cors_enable(Request,
                [ methods([get,post,delete])
                ]),
    format('~n').                           % 200 with empty body

read_handler(Request) :-
    option(method(post), Request), !,
    http_parameters(Request, [state(State, [])]),
    cors_enable,
    http_read_json_dict(Request, Data),
    read_text(State, NextState, T, Data, HaveAction),
    reply_json(response{have_action:HaveAction, text:T, next_state:NextState}), !.

action_handler(Request) :-
    option(method(options), Request), !,
    cors_enable(Request,
                [ methods([get,post,delete])
                ]),
    format('~n').                           % 200 with empty body

action_handler(Request) :-
    option(method(post), Request), !,
    http_parameters(Request, [query(Query, []), state(State, [])]),
    cors_enable,
    http_read_json_dict(Request, Data),
    downcase_atom(Query, LowerCaseQuery),
    atom_string(LowerCaseQuery, QueryString),
    say(QueryString, State, NewState, T, Data, NewData),
    reply_json(response{ playerData:NewData,
                              state:NewState,
                              text:T
                            }), !.