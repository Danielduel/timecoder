## Contents

This repository contains turborepo with t3 stack (a stack based on nextjs).

To run this project locally you will need:

- Twitch developer's app integration (see (Registering a twitch integration for local purposes)[#Registering a twitch integration for local purposes])
- Locally running postgres database - see `@acme/start-db.sh` if you want a quickstart using docker
- Installed node 18: (see nvm)[https://github.com/nvm-sh/nvm]
- `pnpm` installed on node 18

The default connection string for the database from included script is `postgresql://postgres:local@localhost:5432`.

## Registering a twitch integration for local purposes

Go to (Twitch Developers Portal)[https://dev.twitch.tv/console] and sign in.

Register a new application, name it `Timecoder local - <yourname>`, OAuth Redirect URLs set to `http://localhost:3000/api/auth/callback/twitch` **and click Add**, set `Website integration` as the category and solve "I am not a robot" captcha.

Click create.

On the list of your apps there should be a new entry with a name that you've set in previous step. Click Manage.

Click "New secret".

Open your (favorite password manager)[https://keepassxc.org/] and in your `Timecoder local` group note a new entry with username of your `Client ID` and password of your `Client Secret`.

### Credits

Thanks to create-t3-turbo and t3 for providing a great starting point <3
