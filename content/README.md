# Blitzkrieg content

This is subfolder of game dialogs and actions.

## Rules of episode writing

``` json
{
    "events":[
        {
            "condition": "default", //стандартное событие
            "event": {
                "text": "Среда. Самое приятное событие дня – завтрак...",
                "actions": [
                    {
                        "action" : "игрок согласился",
                        "state-changes" : {
                        "Colleagues-attitude" : "+ 10" //какая-то условная единица
                        }
                    },
                    {
                        "action": "игрок отказался",
                        "state-changes" : {
                        "Colleagues-attitude" : "- 10"
                        }
                    }
                ],
                "next-episode" : "episode-???"
            }
        }
    ]
}
```