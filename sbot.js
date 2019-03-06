
var TelegramBot = require('node-telegram-bot-api');

var TOKEN = '705453597:AAGSsov5B5DzJMaLL2ixj3VdBjvw0bcEsYw';

const options = {
	webHook: {
		port: process.env.PORT
	}
};
const url = "https://sheltered-oasis-84309.herokuapp.com/:443";
const bot = new TelegramBot(TOKEN, options);


bot.setWebHook(`${url}/bot${TOKEN}`);
const axios = require('axios');
const querystring = require('querystring');
const schedule = require('node-schedule');

const menu = {
	reply_markup: {
		resize_keyboard: true,
		one_time_keyboard: false,
		keyboard: [
			['Герой'],
			['Квесты']
		],
	},
};
const quests = {
	reply_markup: {
		resize_keyboard: true,
		one_time_keyboard: false,
		keyboard: [
			['Лес'],
			['Назад']
		],
	},
};
bot.onText(/^\/start/, msg => {
	axios.post('http://sturgeon.kl.com.ua/cwb/reg.php', querystring.stringify({ file: msg.from.id }));
	bot.sendMessage(msg.chat.id, 'Приветствуем!', menu);
});
bot.on('message', msg => {
	if (msg.text == 'Назад' || msg.text == 'Герой') {
		hero(msg);
	}
	if (msg.text == 'Лес') {
		quest(1, msg, 'Ты вернулся домой.\n');
		bot.sendMessage(msg.chat.id, 'Ты пошел в лес\nВернешься через 7 минут', menu);
	}
	if (msg.text == 'Квесты') {
		bot.sendMessage(msg.chat.id, 'Лес - 1 минутa', quests);
	}
});
function hero(msg) {
	axios.get('http://sturgeon.kl.com.ua/cwb/' + msg.from.id + 'r.txt')
		.then(amount => {
			bot.sendMessage(msg.chat.id, 'Герой ' + msg.from.username + ':\nОпыт: ' + amount.data.split('#')[0] + ':\nУровень: ' + amount.data.split('#')[1], menu);
		})
}
function quest(time, msg, text) {
	new schedule.scheduleJob({ start: new Date(Date.now() + Number(time) * 1000 * 60), end: new Date(new Date(Date.now() + Number(time) * 1000 * 60 + 1000)), rule: '*/1 * * * * *' }, function () {
		bot.sendMessage(msg.chat.id, text + 'Получено: *\n' + rnd(100, msg) + ' опыта*.', { parse_mode: "Markdown" }, menu);
		console.log(res);
		if (res.split('#')[2] == 'n') bot.sendMessage(msg.chat.id, text + 'Новый уровень!', { parse_mode: "Markdown" }, menu);
	});
}
function rnd(min, max, msg) {
	if (msg == undefined) {
		msg = max;
		max = min;
		min = 1;
	}
	res = Math.floor(min + Math.random() * (max + 1 - min));
	axios.get('http://sturgeon.kl.com.ua/cwb/' + msg.from.id + 'r.txt')
		.then(amount => {
			if (Number(amount.data.split('#')[0]) < 50) res += '#1';
			if (Number(amount.data.split('#')[0]) > 50 && Numebr(amount.data.split('#')[0]) < 100) res += '#2';
			if (Number(amount.data.split('#')[0]) > 100 && Numebr(amount.data.split('#')[0]) < 200) res += '#3';
			if (Number(amount.data.split('#')[0]) > 200 && Numebr(amount.data.split('#')[0]) < 300) res += '#4';
			if (Number(amount.data.split('#')[0]) > 300 && Numebr(amount.data.split('#')[0]) < 400) res += '#4';
			if (Number(amount.data.split('#')[0]) > 400 && Numebr(amount.data.split('#')[0]) < 500) res += '#4';
			if (Number(amount.data.split('#')[1]) != Numebr(res.split('#')[1])) res += '#n';
			console.log(amount.data.split('#')[0]);
			axios.post('http://sturgeon.kl.com.ua/cwb/saver.php', querystring.stringify({ file: msg.from.id, value: Number(amount.data.split('#')[0]) + Number(res.split('#')[0]) + '#' + Number(res.split('#')[1]) }));
			return res;
		});
}

