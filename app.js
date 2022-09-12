const templateVars = ['title', 'description', 'subtitle', 'location', 'date', 'cfp-deadline', 'cfp-url', 'themes', 'formats'];
const templateVar = {}

let slackId = "";
const params = new URLSearchParams(window.location.search)
if (params.has('slackId')) {
    slackId = params.get('slackId')
}

for (const iterator of templateVars) {
    templateVar[iterator] = document.querySelector(`#section-preview [data-id=${iterator}]`);
}
console.log(templateVar);

// const url = "https://mtg-france.slack.com/api/chat.postMessage?_x_id=noversion-1662727006.555&_x_csid=N2rFjH-I6PA&slack_route=TG89NE5NH&_x_version_ts=1662697644&_x_gantry=true&fp=b2";
document.querySelector('input[type="button"][id="submit"]').addEventListener('click', e => {
    console.log('send');
    // sendData();
    const url = generateUrl();
    console.log(url);
    window.open(url, '_blank').focus();
});

// const converter = new showdown.Converter();

// async function sendData() {
//     const response = await fetch(url, {
//         method: 'POST',
//         body: {
//             channel: 'UG9CWAL06',
//             blocks: template.blocks
//         }
//     });
//     const data = await response.json();
// }

document.querySelector("#form").addEventListener("keyup", e => {

    const eltId = e.target.dataset.id;
    let value = e.target.value;
    // if (eltId === 'description' || eltId === 'subtitle') {
    //     value = converter.makeHtml(value)
    // }
    if (eltId === 'cfp-url') {
        templateVar[e.target.dataset.id].href = value;
    } 
    // else if (eltId === 'description' || eltId === 'subtitle') {
    //     templateVar[e.target.dataset.id].innerHTML = value;
    // }
    else {
        templateVar[e.target.dataset.id].textContent = value;
    }
});


function generateUrl() {
    const template = {
        "blocks": [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": `${templateVar.title.textContent}`,
                    "emoji": true
                }
            },
            {
                "type": "context",
                "elements": [
                    {
                        "text": `${document.querySelector('#section-form [data-id="subtitle"]').value}`,
                        "type": "mrkdwn"
                    }
                ]
            },
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `${document.querySelector('#section-form [data-id="description"]').value}`
                }
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": `*Location*\n${templateVar.location.textContent}`,
                    },
                    {
                        "type": "mrkdwn",
                        "text": `*Dates*\n${templateVar.date.textContent}`,
                    }
                ]
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": `*CFP deadline*\n${templateVar['cfp-deadline'].textContent}`
                    },
                    {
                        "type": "mrkdwn",
                        "text": `*CFP*\n<${templateVar['cfp-url'].href}|Click here>`
                    }
                ]
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": `*Themes*\n${templateVar.themes.textContent}`
                    },
                    {
                        "type": "mrkdwn",
                        "text": `*Formats*\n${templateVar.formats.textContent}`
                    }
                ]
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "emoji": true,
                            "text": "Submit a talk"
                        },
                        "style": "primary",
                        "url": `${templateVar['cfp-url'].href}`,
                        "value": "click_me_123"
                    }
                ]
            },
        ]
    };
    const url = `https://app.slack.com/block-kit-builder/${slackId}#${JSON.stringify(template)}`;
    return url;
}