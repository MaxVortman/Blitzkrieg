# Blitzkrieg content*

This is subfolder of game dialogs and actions.

## Rules of episode writing

``` json
{
    "events":[
        {
            "condition": "default",
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
                    }
                ],
                "next_episode": "episodeN"
            }
        }
    ]
}
```

---

_*author Elaine Yagudina_