const TelegramBot = require('node-telegram-bot-api');
var TOKEN = '671152584:AAGKvTqwm9nYQcgt29BQvF0ZxxlQJ-f6fOQ';
const options = {
    webHook: {
        port: process.env.PORT
    }
};
const url = "https://upstud.herokuapp.com//:443";
const bot = new TelegramBot(TOKEN, options);
bot.setWebHook(`${url}/bot${TOKEN}`);

//functions
function ansBtn(msg, text, btn) {
    async function send() {
        let x = await bot.sendMessage(msg.chat.id, text, btn);
        return x;
    }
    send();
}
function ans(msg, text) {
    async function send() {
        let x = await bot.sendMessage(msg.chat.id, text, { reply_to_message: msg.message_id, parse_mode: "HTML" });
        return x;
    }
    send();
}
function exist(str, substr) {
    if (str.toLowerCase().indexOf(substr.toLowerCase()) != -1) return true;
    return false;
}
function alert(msg, sendText) {
    bot.answerCallbackQuery(msg.id, text = sendText, show_alert = true);
}
function getLink(id, name) {
    return `<a href="tg://user?id=${id}"> ${(name + '').replace('<', '&lt;').replace('>', '&gt;')}</a>`;
}
//end functions

//data
let menu = {
    reply_markup: {
        inline_keyboard: [
            [{ text: 'SEO', callback_data: 'seo' }, { text: 'Маркетолог', callback_data: 'marketolog' }, { text: 'SMM', callback_data: 'smm' }],
            [{ text: 'Android', callback_data: 'android' }, { text: 'Front-end', callback_data: 'front' }, { text: 'Back-end', callback_data: 'back' }],
            [{ text: 'Дизайнер', callback_data: 'designer' }, { text: 'Копирайтер', callback_data: 'copywriter' }, { text: 'PR-менеджер', callback_data: 'pr' }],
            [{ text: 'HR-менеджер', callback_data: 'hr' }, { text: 'Project', callback_data: 'pm' }, { text: 'IOS', callback_data: 'ios' }]
        ]
    }
}
let users = {}
let texts = {
    seo: "описание seo",
    designer: "Стажировка Веб-Дизайнера направлена на командное практическое обучение в самостоятельном освоении новых навыков. Помимо освоения разработки сайтов  на сетке bootstrap, идет поверхностное изучение Брендинга и Фирменного стиля, так как многие проекты требуют разработки под ключ.",
    copywriter: "3",
    android: "4",
    front: "Практика по направлению Front-End ориентирована на командное практическое обучение в самостоятельном освоении новых навыков.\nПомимо освоения Front-end направления: html5, css3, flexbox, js, анимация и т.д., идет поверхностное изучение PHP, так как многие проекты требуют навыков Full Stack, например таких как: натяжение верстки на CMS, вывод функционала, формы оправки, установка модулей и т.д.\nПрактическое обучение CMS OpenCart./nПрактика бесплатная, длительность 3 месяца. Теоретическое обучение самостоятельное, практическое обучение с ментором в командной работе.",
    marketolog: "6",
    smm: "описание smm",
    ios: "описание ios",
    pm: "описание pm",
    pr: "описание pr",
    hr: "описание hr",
    back: "описание back-end"
}
let admins = {
    seo: -1001283098154,
    designer: -1001283098154,
    copywriter: -1001283098154,
    android: -1001283098154,
    front: -1001283098154,
    marketolog: -1001283098154,
    smm: -1001283098154,
    ios: -1001283098154,
    pm: -1001283098154,
    pr: -1001283098154,
    hr: -1001283098154,
    back: -1001283098154
}
let tests = {
    seo: -1001283098154,
    designer: -1001283098154,
    copywriter: -1001283098154,
    android: -1001283098154,
    front: -1001283098154,
    marketolog: -1001283098154,
    smm: -1001283098154,
    ios: -1001283098154,
    pm: -1001283098154,
    pr: -1001283098154,
    hr: -1001283098154,
    back: -1001283098154
}
let adminMessages = {
    // fromId: {
    //     msg_id: 2341,
    //     reciever_id: 98871235
    // }
}
let que_ans = [
    ['длится интернатура;длится курс;длятся курсы;длится практика;длится стажировка', 'Длительность курса для копирайтера, веб-дизайнера и SMM специалиста - 2 месяца + месяц стажировки\nДля SEO специалиста и разработчиков - 3 месяца + месяц стажировки\nДля маркетолога и менеджеров - 4 месяца + 2 месяца стажировки', menu],
    ['адрес', 'Мы находимся на ул. Большая Арнаутская, 15, вход слева от банка "Пумб". Офис 37а (3 этаж). Для уточнения времени свяжитесь с нашим <a href = "tg://user?id=466910261">менеджером</a>'],
    ['бесплатно', 'Интернатура полностью бесплатная'],
    ['Привет', 'Привет! Что бы ты хотел узнать?'],
    ['направлен', 'Направления:', menu],
    ['ок;спасибо;пока;до свидания', 'Всего доброго, пиши если захочешь узнать еще что-то'],
    ['Когда нач;Когда можно нач', 'Начать можно в любое время, но вначале нужно заполнить <a href = "https://up-site.com.ua/pages/anketa/">форму</a> и выполнить тестовое задание'],
    ['Возраст', 'Чем старше человек, тем сложнее воспринимает новую информацию и переучивается. Так что если тебе уже глубоко за 30, то мы вряд ли будем думать о долгосрочных перспективах совместной работы. Разве только если ты очень молод душой и фонтанируешь креативными идеями'],
    ['перспектив;трудоустройств', 'Мы заинтересованы в том, чтобы наши лучшие ученики работали с нами'],
    ['график', 'Практическое обучение 20 часов в неделю (10:00-14:00 или 14:00-18:00)'],
    ['Как проход', 'Теоретическое обучение самостоятельное. На практике оттачиваются практические навыки. У тебя будет ментор, который подскажет и направит ход мыслей']
]
let tests = {
    seo: ['SEO1', 'SEO2', 'SEO3', 'SEO4', 'SEO5'],
    designer: ['des1', 'des2', 'des3', 'des4', 'des5'],
    copywriter: ['des1', 'des2', 'des3', 'des4', 'des5'],
    android: ['des1', 'des2', 'des3', 'des4', 'des5'],
    front: ['des1', 'des2', 'des3', 'des4', 'des5'],
    marketolog: ['des1', 'des2', 'des3', 'des4', 'des5'],
    smm: ['des1', 'des2', 'des3', 'des4', 'des5'],
    ios: ['des1', 'des2', 'des3', 'des4', 'des5'],
    pm: ['des1', 'des2', 'des3', 'des4', 'des5'],
    pr: ['des1', 'des2', 'des3', 'des4', 'des5'],
    hr: ['des1', 'des2', 'des3', 'des4', 'des5'],
    back: ['des1', 'des2', 'des3', 'des4', 'des5']
}
//end data

//handlers
bot.on('message', (msg) => { // any message
    if (msg.text != undefined && !exist(msg.text, '/') && users[msg.from.id].banned == 0 && msg.chat.id > 0) {
        if (users[msg.from.id].stage == 'link') {
            users[msg.from.id].link = msg.text;
            ans({ chat: { id: -1001283098154 } }, '#HR\nНовый пользователь:\nСсылка: ' + users[msg.from.id].link + '\nСсылка на пользователя: ' + getLink(msg.from.id, msg.from.first_name));
            ansBtn(msg, 'Пройдите тест: ', { reply_markup: { inline_keyboard: [[{ text: 'Пройти тестирование', callback_data: 'test' + users[msg.from.id].direction }]] } });
            users[msg.from.id].stage = 'waiting';
        } else if (users[msg.from.id].stage == 'email') {
            users[msg.from.id].link = msg.text;
            ans({ chat: { id: -1001283098154 } }, '#HR\nНовая питухля:\nСсылка в сибирь: ' + users[msg.from.id].link + '\nСама питухля: ' + getLink(msg.from.id, msg.from.first_name));
            ansBtn(msg, 'Пройдите тест: ', { reply_markup: { inline_keyboard: [[{ text: 'Пройти тестирование', callback_data: 'test' + users[msg.from.id].direction }]] } });
            users[msg.from.id].stage = 'waiting';
        } else if (users[msg.from.id].stage != 'testing') {
            if (users[msg.from.id] != undefined && users[msg.from.id].direction != 'none') {
                let answer = 'Не понимаю, о чем вы. Попробуйте перефразировать вашу мысль.';
                let buttons = {};
                que_ans.forEach((questions) => {
                    questions[0].split(';').forEach((sent) => {
                        if (exist(msg.text, sent)) {
                            answer = questions[1];
                            questions[2] != undefined ? buttons = questions[2] : buttons = { reply_markup: { inline_keyboard: [] } };
                        }
                    });
                });
                if (users[msg.from.id].test == 0) buttons.reply_markup.inline_keyboard.push([{ text: 'Пройти тестирование', callback_data: 'test' + users[msg.from.id].direction }]);
                ansBtn(msg, answer, buttons);
            } else {
                ansBtn(msg, 'Какое направление тебя интересует?', menu);
            }
        } else {
            users[msg.from.id].answers[users[msg.from.id].num] = msg.text;
            users[msg.from.id].num++;
            if (users[msg.from.id].num != tests[users[msg.from.id].direction].length) {
                users[msg.from.id].stage = 'testing';
                ansBtn(msg, tests[users[msg.from.id].direction][users[msg.from.id].num] + '?', { reply_markup: { inline_keyboard: [[{ text: 'Пропустить', callback_data: 'skiptest' + users[msg.from.id].direction }]] } });
            } else {
                users[msg.from.id].stage = 'complete';
                ans(msg, 'Тест пройден, результаты отправлены');
                ans({ chat: { id: -1001283098154 } }, 'Новыйе результаты:\n' + JSON.stringify(users[msg.from.id].answers));
            }
        }
    }
});
bot.on('callback_query', async (call) => { // when buttons clicked
    let msg = call.message;
    if (call.data.includes('invite-')) {
        ans({ chat: { id: call.data.split('invite-')[1] } }, 'Вы приглашены в UpSite');
        ans(msg, 'Приглашение отправлено');
    } else if (call.data.includes('send-')) {
        ans({ chat: { id: call.data.split('send-')[1] } }, tests[users[call.data.split('send-')[1]].direction]);
        ans(msg, 'Тестовое задание отправлено');
    } else {
        if (texts[call.data] != undefined) { // выбирается специальность
            if (exist(users[call.from.id].direction, '?') || users[call.from.id].direction == 'none') users[call.from.id].direction = call.data + '?';
            if (users[call.from.id].stage != 'testing') ansBtn(msg, texts[call.data], { reply_markup: { inline_keyboard: [[{ text: 'Подтвердить', callback_data: 'confirm' + users[call.from.id].direction.replace('?', '') }]] } }); // answer text from que_ans
            else if (users[call.from.id].stage == 'testing') alert(msg, 'Сначала завершите тест');
            else alert(msg, 'Вы уже прошли тест');
        } else {
            if (exist(call.data, 'skip')) { // пропуск вопроса
                users[call.from.id].answers[users[call.from.id].num] = 'Пропущен';
                users[call.from.id].num++;
            }
            if (exist(call.data, 'link') && users[call.from.id].stage == 'free') {
                users[call.from.id].stage = 'link';
                ans(msg, 'Укажите ссылку');
            }
            if (exist(call.data, 'email') && users[call.from.id].stage == 'free') {
                users[call.from.id].stage = 'email';
                ans(msg, 'Укажите почту');
            }
            if (exist(call.data, 'confirm') && exist(users[call.from.id].direction, '?')) {
                users[call.from.id].direction = call.data.split('confirm')[1];
                ansBtn(msg, 'Как вы к нам пришли?: ', { reply_markup: { inline_keyboard: [[{ text: 'По вакансии', callback_data: 'link' }], [{ text: 'Заполнял анкету', callback_data: 'email' }]] } });
            }
            if (exist(call.data, 'test')) { // запуск теста
                if (users[call.from.id].stage == 'complete') alert(msg, 'Вы уже прошли тест'); // тест уже пройден
                else { // следующий вопрос
                    if (users[call.from.id].num != tests[call.data.split('test')[1]].length - 1) {
                        users[call.from.id].stage = 'testing';
                        ansBtn(msg, tests[call.data.split('test')[1]][users[call.from.id].num] + '?', { reply_markup: { inline_keyboard: [[{ text: 'Пропустить', callback_data: 'skiptest' + users[call.from.id].direction }]] } });
                    } else {
                        users[call.from.id].stage = 'complete'; // тест завершен
                        ans(msg, 'Тест пройден. Если у вас еще есть вопросы, можете спросить у меня');
                        let message = await ansBtn({ chat: { id: admins[users[call.from.id].direction] } }, 'Новые результаты:\n' + JSON.stringify(users[call.from.id].answers), {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: 'Пригласить', callback_data: 'invite-' + users[call.from.id] }, { text: 'Отправить тестовое', callback_data: 'send-' + users[call.from.id] }]
                                ]
                            }
                        });
                        adminMessages[admins[users[call.from.id].direction]] = { msg_id: message.message_id, reciever_id: call.from.id }
                    }
                }
            }
        }
    }
});
bot.onText(/\/start/, (msg) => { //start
    if (users[msg.from.id] == undefined) { //not registred
        users[msg.from.id] = { banned: 0, stage: 'free', num: 1, direction: 'none', answers: {}, link: '' };
        users[msg.from.id].dirMsg = ansBtn(msg, 'Привет! Выбери свою специальность:', menu);
    }
    else ans(msg, 'Привет! Что бы ты хотел узнать ?'); //registred
});


bot.onText(/\/users/, (msg) => { //users
    ans(msg, JSON.stringify(users));
});
//end handlers

