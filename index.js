require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, REST, Routes } = require('discord.js');
const { testConnection } = require('./database/database'); // DB 모듈에서 testConnection만 가져오기

// 환경 변수에 따라 토큰과 clientId 선택
const token = process.env.NODE_ENV === 'development' 
    ? process.env.DEV_DISCORD_TOKEN 
    : process.env.DISCORD_TOKEN;

const clientId = process.env.NODE_ENV === 'development'
    ? process.env.DEV_DISCORD_CLIENT_ID
    : process.env.DISCORD_CLIENT_ID;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});
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
        console.log(`[INFO] Started refreshing ${commands.length} application (/) commands globally.`);
        console.log('[INFO] Commands to be registered:', commands.map(cmd => cmd.name).join(', '));
        console.log(`[INFO] Using ${process.env.NODE_ENV} environment`);

        const data = await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        console.log(`[INFO] Successfully reloaded ${data.length} application (/) commands globally.`);
        console.log('[INFO] Registered commands:', data.map(cmd => cmd.name).join(', '));
    } catch (error) {
        console.error('[ERROR] Failed to deploy commands:');
        console.error(error);
        if (error.rawError) {
            console.error('[ERROR] API Error details:', error.rawError);
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
        // 데이터베이스 연결 테스트
        console.log('[INFO] 데이터베이스 연결 테스트 중...');
        const dbConnected = await testConnection();
        
        if (dbConnected) {
            // 데이터베이스 테이블 초기화
            const guildCreateEvent = require('./events/guildCreate');
            console.log('[INFO] 데이터베이스 테이블 초기화 중...');
            await guildCreateEvent.initializeBotServerTables();
            
            // 명령어 등록
            await loadAndDeployCommands();
            
            // 봇 로그인
            await client.login(token);
            console.log(`[INFO] 봇이 성공적으로 로그인되었습니다.`);
        } else {
            console.error('[ERROR] 데이터베이스 연결에 실패했습니다. 봇을 시작할 수 없습니다.');
            process.exit(1);
        }
    } catch (error) {
        console.error('[ERROR] Error starting bot:', error);
        process.exit(1);
    }
}

startBot();