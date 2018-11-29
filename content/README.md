# Blitzkrieg content*

This is subfolder of game dialogs and actions.

## Rules of episode writing

``` json
{
    "events":[
        {
            "condition": "default",
            "event": {
                "text": "Среда. Самое приятное событие дня – завтрак...",
                "actions": [
                    {
                        "action" : ["хочу"],
                        "text" : "Товарищ довольно улыбается...",
                        "state-changes" : {
                        "colleagues-attitude" : "+ 10"
                        }
                    },
                    {
                        "action": ["не хочу"],
                        "text" : "Ты внимательно выслушал его предложение...",
                        "state-changes" : {
                        "colleagues-attitude" : "- 10"
                        }
                    }
                ]
            }
        }
    ]
}
```

---

_*author Elaine Yagudina_