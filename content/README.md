# Blitzkrieg content*

This is subfolder of game dialogs and actions.

## Rules of episode writing

``` json
{
    "events":[
        {
            "conditions": [
                {
                    "property": "episode3Answer",
                    "value": "no"
                }
            ],
            "event": {
                "have_action": "true",
                "text": "Среда. Самое приятное событие дня – завтрак...",
                "actions": [
                    {
                        "action" : ["хочу"],
                        "text" : "Товарищ довольно улыбается...",
                        "player_data_changes": [
                            {
                                "property": "episode1Answer",
                                "value": "yes"
                            }
                        ],
                    },
                    {
                        "action": ["не хочу"],
                        "text" : "Ты внимательно выслушал его предложение...",
                        "player_data_changes": [
                            {
                                "property": "episode1Answer",
                                "value": "no"
                            }
                        ],
                    "next_episode": "episodeM"
                    }
                ],
                "default_next_episode": "episodeN"
            }
        },
        {
            "conditions": ...
        }
    ]
}
```

---

_*author Elaine Yagudina_