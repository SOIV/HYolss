require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, REST, Routes } = require('discord.js');

// 환경 변수에 따라 토큰과 clientId 선택
const token = process.env.NODE_ENV === 'development' 
    ? process.env.DEV_DISCORD_TOKEN 
    : process.env.DISCORD_TOKEN;

const clientId = process.env.NODE_ENV === 'development'
    ? process.env.DEV_DISCORD_CLIENT_ID
    : process.env.DISCORD_CLIENT_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

// 명령어 파일 로드 및 등록 함수
async function loadAndDeployCommands() {
    const commands = [];
    const foldersPath = path.join(__dirname, 'commands');
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                commands.push(command.data.toJSON());
                client.commands.set(command.data.name, command);
                console.log(`[INFO] Loaded command: ${command.data.name}`);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }

    // 명령어 등록
    const rest = new REST().setToken(token);
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands globally.`);
        console.log('Commands to be registered:', commands.map(cmd => cmd.name).join(', '));
        console.log(`Using ${process.env.NODE_ENV} environment`);

        const data = await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands globally.`);
        console.log('Registered commands:', data.map(cmd => cmd.name).join(', '));
    } catch (error) {
        console.error('Failed to deploy commands:');
        console.error(error);
        if (error.rawError) {
            console.error('API Error details:', error.rawError);
        }
    }
}

// 이벤트 핸들러 등록
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// 봇 시작
async function startBot() {
    try {
        // 먼저 명령어 등록
        await loadAndDeployCommands();
        // 그 다음 봇 로그인
        await client.login(token);
    } catch (error) {
        console.error('Error starting bot:', error);
    }
}

startBot();