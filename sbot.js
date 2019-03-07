var TelegramBot = require('node-telegram-bot-api');

var TOKEN = '731896594:AAGhYDqRvnCUV0MhtOBs0UzbKqO7SRLqCmg';

const options = {
	webHook: {
		port: process.env.PORT
	}
};
const url = "https://upcreabot.herokuapp.com/";
const bot = new TelegramBot(TOKEN, options);

bot.setWebHook(`${url}/bot${TOKEN}`);

const axios = require('axios');
const querystring = require('querystring');
const schedule = require('node-schedule');

let texts = {
	'-1001227448699s': 'Приветствую тебя, меня зовут UpCreaBot, тебя приняли в ряды апсайтовцев! Добро пожаловать в наше уютное местечко😄',
	'-1001190080849s': 'Добро пожаловать в наш круг, мафиози, теперь ты во власти ботов😈. Наслаждайся игрой! Буду рад фидбеку)'
};
bot.onText(/^\/test/, (msg) => {
	bot.sendSticker(msg.chat.id, 'CAADAgADOAADyIsGAAE7re09I3hMQwI');
});
bot.onText(/^\/delBottom/, (msg) => {
	if(msg.from.username == 'wladislaw353' || msg.from.username == 'Pro100Artem') {
		if (msg.reply_to_message == undefined) ans(msg, '❌ Не указана точка начала');
		else {
			bot.getChatMember(msg.chat.id, msg.from.id).then( (user) => {
				if(user.status != 'creator' && user.status != 'administrator') ans(msg, '❌ Ты не админ');
				else {
					let i = 0;
					for(i = msg.reply_to_message.message_id; i < msg.message_id; i++){
						bot.deleteMessage(msg.chat.id, i);
					}
					ans(msg, '✅ Удалено ' + i + ' сообщений');
				}
			});
		}
	}
});
bot.onText(/\/say (.+)/, (msg) => {
	if(msg.from.username == 'wladislaw353' || msg.from.username == 'Pro100Artem') {
		bot.deleteMessage(msg.chat.id, msg.message_id);
		if (msg.reply_to_message != undefined) bot.sendMessage(msg.chat.id, msg.text.split('/say ')[1], {reply_to_message_id: msg.reply_to_message.message_id, parse_mode:"HTML"});
		else bot.sendMessage(msg.chat.id, msg.text.split('/say ')[1], {parse_mode:"HTML"});
	}
});
bot.onText(/\/tsay_(.+)/, (msg) => {
	if(msg.from.username == 'wladislaw353' || msg.from.username == 'Pro100Artem') {
		bot.deleteMessage(msg.chat.id, msg.message_id);
		onTime(Number(msg.text.split('_')[1]), msg, msg.text.split('_')[2]);
	}
});
bot.on('message', msg => {
	if (msg.text != undefined){ 
		if (msg.text.toLowerCase().indexOf('@all') != -1){
			let text = '';
			axios.get('http://sturgeon.kl.com.ua/vmf/' + msg.chat.id + '.txt').then( (users) => {
				users.data.split('#').forEach( (user) => {
					if (user.length > 1){
						text += user + ',';
						console.log(user);
					}
				});
				if (msg.text.split(' ').length > 1) text += '\n' + msg.text.replace(' ', '#').split('#')[1];
				else text += '\nПризываю вас играть в мафию!🌇';
				reply(msg, text);
			});
		}
		if (msg.text.toLowerCase().indexOf('привет') != -1) reply(msg, 'Привет)');
		if (msg.text.toLowerCase().indexOf('погода') != -1) {
			axios.get(`https://www.google.ca/search?ei=x0SBXJGxNdKprgT--JOIBA&q=%D0%BF%D0%BE%D0%B3%D0%BE%D0%B4%D0%B0+%D0%B2+%D0%BE%D0%B4%D0%B5%D1%81%D1%81%D0%B5&oq=%D0%BF%D0%BE%D0%B3%D0%BE%D0%B4%D0%B0+%D0%B2+%D0%BE%D0%B4%D0%B5%D1%81%D1%81%D0%B5&gs_l=psy-ab.3..0i131i67j0l9.23311.23311..23516...0.0..0.80.80.1......0....1..gws-wiz.......0i71.OElVmzz0rsY`).then((weather) => {
				console.log(weather.data);
				let fdegree = Number(weather.data.split('<span class="wob_t" style="display:inline">')[1].split('</span>')[0].slice(0, 2));
				let cdegree = (fdegree - 32) * 5/9;
				reply(msg, 'В Одессе сейчас ' + cdegree + ' °C | ' + fdegree + ' °F');
			});
		}
	}
});
bot.on('new_chat_members', (user) => {
	if (user.new_chat_participant.username == undefined) user.new_chat_participant.username = user.new_chat_participant.first_name;
	else user.new_chat_participant.username = '@' + user.new_chat_participant.username;
	if (user.new_chat_participant.username != 'UpCreaBot') bot.sendMessage(user.chat.id, texts[user.chat.id + 's']);
	else bot.sendMessage(user.chat.id, 'Приветсвую вас, я только что получил новый пакет модификаций, теперь я просто всемогущ🔥\nИ я снова с вами😊');
	axios.post('http://sturgeon.kl.com.ua/vmf/save.php', querystring.stringify({ file: user.chat.id, value: '#' +  user.new_chat_participant.username}));
});
function onTime(time, msg, text) {
	new schedule.scheduleJob({ start: new Date(Date.now() + Number(time) * 1000 * 60), end: new Date(new Date(Date.now() + Number(time) * 1000 * 60 + 1000)), rule: '*/1 * * * * *' }, function () {
		bot.sendMessage(msg.chat.id, text, { parse_mode: "HTML" });
	});
}
function reply(msg, text){
	bot.sendMessage(msg.chat.id, text, {reply_to_message: msg.message_id, parse_mode:"HTML"});
}
