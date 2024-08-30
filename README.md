- Установить pg admin (postgresql на пк)
- Создать БД через pg admin и запомнить ее название
- Получать username, password postgresql
- Обновить данные в env
  DATABASE_URL=postgresql://postgres:123456@localhost:5432/auth-mk?schema=public

<ul>
  <li>postgres - твой юзернейм postgresql</li>
  <li>123456 - твой пароль postgresql</li>
  <li>localhost - не меняется</li>
  <li>5432 - дефолтный порт, иногда может меняться
</li>
  <li>auth-mk - название твое базы</li>
</ul>

<h1>Не забыть сделать</h1>
<ul>
  <li>npm install</li>
  <li>npm prisma db push</li>
</ul>

<h1>OAuth</h1>

- Перейдите на Google Cloud Console.
  Создайте новый проект или выберите существующий.
- Перейдите в меню APIs & Services > Credentials (https://console.cloud.google.com/apis/dashboard).
- Нажмите Create Credentials и выберите OAuth Client ID.
- Настройте экран согласия OAuth (external), если вы еще этого не сделали.
- Заполните необходимые поля (auth domains пропускаем, как и вкладку scopes и optional info).
- Добавляем google аккаунт, который будем тестировать в поле "Test users"
- Мне потребовалось еще раз вернуться на страницу https://console.cloud.google.com/apis/credentials и нажать кнопку Create credentials -> OAuth client ID
- Выбираем тип веб-приложение
  И далее наполянем поля (или свой домен на production origins = http://localhost:4200
  redirects = http://localhost:4200/auth/google/callback
- После этого нажимаем кнопку создать и получаем Client ID и Client Secret.

<h2>GitHub</h2>

- Перейдите на GitHub Developer Settings (https://github.com/settings/developers).
- В разделе OAuth Apps нажмите New OAuth App.
- Заполните необходимые поля, такие как Application name, Homepage URL, и Authorization callback URL.
- Нажмите Register application и получите Client ID и Client Secret.

<h1>.env Format:</h2>
#DATABASE <br />
POSTGRES_USER="postgres"<br />
POSTGRES_PASSWORD="123456"<br />
POSTGRES_HOST="localhost"<br />
POSTGRES_PORT="5432"<br />
POSTGRES_DB=""<br />
DATABASE_URL="postgresql://${POSTGRES_USER}:$<br />{POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/$<br />{POSTGRES_DB}?schema=public"<br />

#System<br />
NODE_ENV=production<br />
JWT_SECRET=""<br />
PORT=4200<br />
PROTOCOL="http"<br />
DOMAIN="localhost"<br />
CLIENT_URL="${PROTOCOL}://${DOMAIN}:3000"<br />
SERVER_URL="${PROTOCOL}://${DOMAIN}:${PORT}"<br />

#Captcha<br />
RECAPTCHA_SECRET_KEY=""<br />

#Email<br />
SMTP_PASSWORD=""<br />
SMTP_SERVER=""<br />
SMTP_LOGIN=""<br />

#Social media auth<br />
GOOGLE_CLIENT_ID=""<br />
GOOGLE_CLIENT_SECRET=""<br />
GOOGLE_CALLBACK_URL="${SERVER_URL}/auth/google/redirect"<br />

GITHUB_CLIENT_ID=""<br />
GITHUB_CLIENT_SECRET=""<br />
GITHUB_CALLBACK_URL="${SERVER_URL}/auth/github/redirect"<br />
