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

let lastMusic = -1;
let musicid = [
	'CQADAgADGQYAAmt6EEiKhl7Aojp0nQI',
	'CQADAgADGAYAAmt6EEjacEpxcjthQAI',
	'CQADAgAD-AEAAm5EEEgZ7XD6nv5gPAI',
	'CQADAgADGgYAAmt6EEjhTRxBEIfySwI',
	'CQADAgAD-QEAAm5EEEjxENFM1B7LSQI',
	'CQADAgADHwYAAmt6EEiuahRall4ncQI',
	'CQADAgADIAYAAmt6EEhRI7sPI7r2vwI',
	'CQADAgADHAYAAmt6EEiAD7yx8bmDAwI',
	'CQADAgADHQYAAmt6EEi-Vy6anpSp2wI',
	'CQADAgADIwYAAmt6EEgShUm7F9oK3QI',
	'CQADAgADGwYAAmt6EEi_zgk4SbYRAAEC',
	'CQADAgADIQYAAmt6EEgI97HmooRzpwI',
	'CQADAgADJAYAAmt6EEjz5xLH1X62KgI',
	'CQADAgADIgYAAmt6EEgKGyLe_RTRWgI',
	'CQADAgADHgYAAmt6EEhehilr0ozxKgI'
];
let restrict = 'диктатур, диктатор, лгбт, ориентаци, гетеро, террор, путин, сталин, поребрик, прокопски, prokopian, dictatorship'.split(', ');
let al = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'.split('');
let weDates = ['8.3', '31.12', '1.1', '2.1', '3.1', '7.1', '14.1', '14.10', '24.8', '29.6', '1.4'];
let texts = {
	'-1001227448699s': 'Приветствую тебя, меня зовут UpCreaBot, тебя приняли в ряды апсайтовцев! Добро пожаловать в наше уютное местечко😄',
	'-1001190080849s': 'Добро пожаловать в наш круг, мафиози, теперь ты во власти ботов😈. Наслаждайся игрой!)',
	'-369468468s': 'Привет в тестовом чате!'
};	
let weather = '';
if (new Date().getDay() == 6 || new Date().getDay == 0 || weDates.indexOf(new Date().getDate() + '.' + (new Date().getMonth() + 1)) != -1) {
	new schedule.scheduleJob('00 7 * * *', () => {
		getWeather(-1001227448699, 'Доброе утро))\nСегодня ', '\nВсем хорошего настроения✨');
	});
}else{
	new schedule.scheduleJob('00 6 * * *', () => {
		getWeather(-1001227448699, 'Доброе утро))\nСегодня ', '\nВсем хорошего настроения✨');
	});
}
bot.onText(/^\/test/, (msg) => {
	bot.sendSticker(msg.chat.id, 'CAADAgADOAADyIsGAAE7re09I3hMQwI');
});
bot.on('audio', (msg) => {
	reply(msg, 'ID: ' + msg.audio.file_id);
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
					bot.deleteMessage(msg.chat.id, msg.message_id);
				}
			});
		}
	}
});
bot.onText(/\/add (.+)/, (msg) => {
	if(msg.from.username == 'wladislaw353' || msg.from.username == 'Pro100Artem') axios.post('http://sturgeon.kl.com.ua/vmf/save.php', querystring.stringify({ file: user.chat.id, value: '#' +  msg.text.split(' ')[1]}));
});
bot.onText(/\/say (.+)/, (msg) => {
	if(msg.from.username == 'wladislaw353' || msg.from.username == 'Pro100Artem') {
		bot.deleteMessage(msg.chat.id, msg.message_id);
		if (msg.reply_to_message != undefined) bot.sendMessage(msg.chat.id, msg.text.split('/say ')[1], {reply_to_message_id: msg.reply_to_message.message_id, parse_mode:"HTML"});
		else bot.sendMessage(msg.chat.id, msg.text.split('/say ')[1], {parse_mode:"HTML"});
	}else bot.deleteMessage(msg.chat.id, msg.message_id);
});
bot.onText(/\/tsay_(.+)/, (msg) => {
	if(msg.from.username == 'wladislaw353' || msg.from.username == 'Pro100Artem') {
		bot.deleteMessage(msg.chat.id, msg.message_id);
		onTime(Number(msg.text.split('_')[1]), msg, msg.text.split('_')[2]);
	}else bot.deleteMessage(msg.chat.id, msg.message_id);
});
bot.on('message', msg => {
	let a  = 0;
	restrict.forEach((word) => {
		if(a == 0 && msg.text.toLowerCase().indexOf(word) != -1){
			bot.deleteMessage(msg.chat.id, msg.message_id);
			a = 1;
		}
	});
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
				else text += ' призываю вас играть в мафию!🌇';
				reply(msg, text);
				bot.deleteMessage(msg.chat.id, msg.message_id);
			});
		}
		if (ex(msg.text,'привет')) reply(msg, 'Привет)');
		if (ex(msg.text,'как') && ex(msg.text,'дела')) reply(msg, 'Замечательно 😄');
		if (ex(msg.text,'ты') && ex(msg.text,'милый')) reply(msg, '😊 Ты тоже))');
		if (ex(msg.text,'спасибо')) reply(msg, 'Всегда пожалуйста👌');
		if (ex(msg.text,'слава') && ex(msg.text,'украине')) reply(msg, 'Героям слава 🇺🇦');
		if (ex(msg.text,'думаешь') && ex(msg.text,'мир')) reply(msg,
			`Наш мир - Земля 🌏 — третья от Солнца планета Солнечной системы.
Расстояние от Солнца до Земли в среднем составляет 149,6 млн км. Это расстояние называется в астрономии 1 астрономической единицей и используется в качестве основной единицы определения расстояний между небесными телами Солнечной системы. ☄️
Земля представляет собой сплюснутый сфероид, т.е. неправильную сферу, немного сжатую с полюсов.  Максимальная длина окружности Земли по экватору — 40 075,02 км, по меридиану 40 007,86 км.
Мир это прекрасное место 🌺, которое уничтожают люди 🥀
Относитесь к природе лучше и она в долгу не останется 🏵`
	        );
		if (ex(msg.text,'8') && ex(msg.text,'марта')) reply(msg,
			`Международный женский день обязан своим появлением "маршу пустых кастрюль", который состоялся 8 марта 1857 года в Нью-Йорке. Работницы текстильных фабрик тогда вышли на уличные протесты, требуя десятичасовой рабочий день (было - шестнадцать часов), достойную зарплату и право голоса на выборах. Во время акции они били в упомянутые кастрюли. Позже участниц движения стали называли суфражистками (от suffrage - голосование, избирательное право).`
	        );
		if (ex(msg.text,'любимый') && ex(msg.text,'цвет')) reply(msg, 'Хммм.. Синий, а у тебя?');
		if (ex(msg.text,'любишь') && ex(msg.text,'людях')) reply(msg, 'Ум и отзывчивость');
		if (ex(msg.text,'тебя') && ex(msg.text,'создал')) reply(msg, 'Пусть это будет тайна 😋 ');
		if (ex(msg.text,'что') && ex(msg.text,'умеешь')) functions(msg);
		if (ex(msg.text,'чем') && ex(msg.text,'занят')) reply(msg, 'С тобой общаюсь 😀 ');
		if (ex(msg.text,'что') && ex(msg.text,'делаешь')) reply(msg, 'С тобой общаюсь 😀 ');
		if (ex(msg.text,'сколько') && ex(msg.text,'лет')) reply(msg, 'А сколько дашь? Я бессмерный 😎 ');
		if (ex(msg.text,'как') && ex(msg.text,'зовут')) reply(msg, 'А как бы ты хотел меня называть?))');
		if (ex(msg.text,'кто') && ex(msg.text,'ты') && ex(msg.text,'жизни')) reply(msg, 'Крутой бот, кто ж еще');
		if (ex(msg.text,'шаурма') && ex(msg.text,'с') && ex(msg.text,'или')) reply(msg, 'С бараниной ))');
		if (ex(msg.text,'какого') && ex(msg.text,'пола')) reply(msg, '000011100010111000011010000011100010111000101110000011100010111100011011');
		if (ex(msg.text,'время')) reply(msg, '🕒 ' + (new Date().getHours() + 2) + ':' + new Date().getMinutes() + ':' + new Date().getSeconds());
		if (ex(msg.text,'погода')) getWeather(msg.chat.id, 'Сейчас: ', '');
		if (ex(msg.text,'сколько') && ex(msg.text,'градусов')) getWeather(msg.chat.id, 'Сейчас: ', '');
		if (ex(msg.text,'кинь музыку') || ex(msg.text,'кинь песню')) music(msg);
		if (ex(msg.text,'раскодируй')) encode(msg);
		if (ex(msg.text,'закодируй')) code(msg, 1);
		if (ex(msg.text,'рабоч') && ex(msg.text,'инструкци')) instructions(msg);
	}
});
bot.on('new_chat_members', (user) => {
	if (user.new_chat_participant.username == undefined) user.new_chat_participant.username = user.new_chat_participant.first_name;
	else user.new_chat_participant.username = '@' + user.new_chat_participant.username;
	if (user.new_chat_participant.username != 'UpCreaBot') bot.sendMessage(user.chat.id, texts[user.chat.id + 's']);
	else bot.sendMessage(user.chat.id, 'Приветсвую вас, я только что получил новый пакет модификаций, теперь я просто всемогущ🔥\nИ я снова с вами😊');
	axios.post('http://sturgeon.kl.com.ua/vmf/save.php', querystring.stringify({ file: user.chat.id, value: '#' +  user.new_chat_participant.username}));
});
bot.on('callback_query', (call) => {
	console.log(call.data);
	if(call.data == 'music') music(call.message);
	if(call.data == 'weather') getWeather(call.message.chat.id, 'Сейчас: ', '');
	if(call.data == 'instr') instructions(call.message);
});
function functions(msg){
	bot.sendMessage(msg.chat.id, 'А что ты хочешь, чтоб я умел? Я научусь 😊 ', {
		reply_markup: {
			inline_keyboard: [
				[{text: 'Рабочие инструкции 📑', callback_data : 'instr'}],
				[{text: 'Погода ⛅️', callback_data : 'weather'},{text: 'Музыка 🎶', callback_data : 'music'}]
			]
		}
	});
}
function rans(){}
function instructions(msg){	
	bot.sendMessage(msg.chat.id, '*Рабочая инструкция*', {
		reply_markup: {
			inline_keyboard: [
				[{text: 'SEO 🧝‍♂', url : 'https://docs.google.com/document/d/1lPuDU2oHWYXJL4B5BI1nsM2UN_cekfWk0zXrBjlNMrI/edit'},
				{text: 'Sales manager 🦸‍♀', url : 'https://docs.google.com/document/d/1WF_-_Tl-yw3zwYnlYyxvZ2i4zZJL0Tr7pnSVYC0ILi4/edit#heading=h.q7mj195b2stl'}],
				[{text: 'Front-end 👨‍💻', url : 'https://docs.google.com/document/d/1u_8O2UgOo90IWwCrElJ0_1V_pi2i1KL5UdNd7NKF9Xc/edit#heading=h.hecsj1y1gi87'},
				{text: 'Back-end 🧙‍♂', url : 'https://docs.google.com/document/d/1vktnF612suEedKaEhcmC5HqChijhV5CUKAqJQHdmcrU/edit#heading=h.4fk6j0d5f85e'}]
			]
		},
		parse_mode: "Markdown"
	});
}
function ex(str, substring){
	if (str.toLowerCase().indexOf(substring) != -1) return true;
	return false;
}
function encode(msg){
	if(msg.reply_to_message != undefined){
		if(msg.reply_to_message.text != undefined){
			msg.reply_to_message.text = msg.reply_to_message.text.toLowerCase();
			let result = '';
			if(msg.reply_to_message.text.indexOf('ь') != -1){
				msg.reply_to_message.text.split(' ').forEach(words => {
					words.split('ь').forEach(word => {
						if(word.length > 0){
							let ex = 1;
							word.split('').forEach(letter => {
								if(al.indexOf(letter) == -1) ex = 0;
							});
							if(ex == 1) result += al[word.length - 1];
							else result += word;
						}
					});
					result += ' ';
				});
				bot.sendMessage(msg.chat.id, result);
			}else bot.sendMessage(msg.chat.id, 'По-моему, тут итак все понятно', { reply_to_message_id: msg.message_id} );
		}else bot.sendMessage(msg.chat.id, 'Это вообще не текст ._.', { reply_to_message_id: msg.message_id} );
	}else bot.sendMessage(msg.chat.id, 'Не могу, ты не сказал что раскодировать 🤷‍♂️', { reply_to_message_id: msg.message_id} );
}
function code(msg,reply){
	if(reply == 0) msg.reply_to_message = msg;
	if(msg.reply_to_message != undefined){
		if(msg.reply_to_message.text != undefined){
			let result = '';
			msg.reply_to_message.text.toLowerCase().split('').forEach(letter => {
				if(al.indexOf(letter) == -1) result += letter;
				else if(letter.length > 0){
					result += 'з'.repeat(al.indexOf(letter) + 1) + 'ь';
				}
			});
			bot.sendMessage(msg.chat.id, result);
		}else bot.sendMessage(msg.chat.id, '❌ Сообщение не содержит текст', { reply_to_message_id: msg.message_id} );
	}else bot.sendMessage(msg.chat.id, '❌ Укажите сообщение для шифровки', { reply_to_message_id: msg.message_id} );
}
function onTime(time, msg, text) {
	new schedule.scheduleJob({ start: new Date(Date.now() + Number(time) * 1000 * 60), end: new Date(new Date(Date.now() + Number(time) * 1000 * 60 + 1000)), rule: '*/1 * * * * *' }, function () {
		bot.sendMessage(msg.chat.id, text, { parse_mode: "HTML" });
	});
}
function reply(msg, text){
	bot.sendMessage(msg.chat.id, text, {reply_to_message: msg.message_id, parse_mode:"HTML"});
}
function getWeather(id, before, after){
	axios.get(`https://www.google.com/search?q=%D0%BF%D0%BE%D0%B3%D0%BE%D0%B4%D0%B0+%D0%B2+%D0%BE%D0%B4%D0%B5%D1%81%D1%81%D0%B5`)
	.then((weatherG) => {
		console.log(weatherG.data);
		let fdegree = Number(weatherG.data.split('<span class="wob_t" style="display:inline">')[1].split('</span>')[0].slice(0, 2));
		let cdegree = Math.floor((fdegree - 32) * 5/9);
		let wind = Number(weatherG.data.split('at <span class="wob_t" style="display:inline">')[1].split(' mph')[0]);
		if(wind == 0) wind = 'Ветра нет ✨';
		if(wind >=1 && wind <= 10) wind = 'Легкий ветерок 🌬';
		if(wind >=10 && wind <= 20) wind = 'Ветренно 💨';
		if(wind > 20) wind = 'Сильный ветер 🌪';
		//let state = weatherG.data.split(`padding-right:10px"><img style="margin-right:3px;vertical-align:top" alt="`)[1].split(`" src="`)[0];
		let sm = '';
		if (weatherG.data.indexOf('cloudy.png') != -1) sm = '☁️';
		if (weatherG.data.indexOf('rain.png') != -1) sm = '🌧';
		if (weatherG.data.indexOf('rain_s_cloudy.png') != -1) sm = '🌧';
		if (weatherG.data.indexOf('snow_s_rain.png') != -1) sm = '🌨';
		if (weatherG.data.indexOf('partly_cloudy.png') != -1) sm = '⛅️';
		if (weatherG.data.indexOf('snow_light.png') != -1) sm = '❄️';
		if (weatherG.data.indexOf('snow.png') != -1) sm = '❄️';
		if (weatherG.data.indexOf('sunny.png') != -1) sm = '☀️';
		if (weatherG.data.indexOf('sunny_s_cloudy.png') != -1) sm = '🌤';
		if (weatherG.data.indexOf('thunderstorms.png') != -1) sm = '⚡️';
		if (before == undefined) before = '';
		if (after == undefined) after = '';
		reply({chat: { id: id }}, before + sm + ' ' + cdegree + ' °C\n' + wind + after);
		weather = before + sm + ' ' + cdegree + ' °C\n' + wind + after;
	})
	.catch((err) => {
		reply({chat: { id: id }}, weather);
	});
}
function music(msg){
	let randMusic = Math.floor(0 + Math.random() * musicid.length);
	//while(randMusic == lastMusic) randMusic = Math.floor(0 + Math.random() * musicid.length);
	//lastMusic = randMusic;
	console.log(musicid[randMusic]);
	bot.sendAudio(msg.chat.id, musicid[randMusic], {
		reply_markup: {
			inline_keyboard: [
				[{text: 'Ещё песню 🎶', callback_data : 'music'}]
			]
		}
	});
}
