# What is this?
This repo contains the current progress of a web-app built to facilitate easy cloud application deployment with the help of Kubernetes. 

It's functionality is currently sub-optimal but has a the basic premise demonstrated within. 

# Important Notes
Many small exceptions have been made to security and performance purely for the scope of this project and its current purpose of demonstration.

.env.local has been included in the git repo for easier use for testing.

The database is included in the repo along with its data.

# Installation
There are two options to install and use this application.
!: Port: 8090 and 4173 must be free

## 1 / Launch file
3 launch files are included based on operating system. Linux or MacOS is recommended. These files are to be be run from terminal.

If you'd prefer to run manually:
```bash
# For database
cd pocketbase
pocketbase[YOUR_OS] serve
# Will serve on port 8090

# For MCOGP web app
# npm or bun
npm install
npm run preview
# Will serve on port: 4173 
```

## 2 / Docker
A docker compose file is included to deploy this application. It isn't fully tested so proceed with caution. It may break.

# Usage
Feel free to register to the website. Or just login with:
**MCOGP Credentials**
Username: `tester@test.com`
Password: `isThisATest12`

You will not be automatically redirected to the console page due to an unknown problem with the redirect feature. It can work correctly at some other points in the web-app. 

The project switcher in the console page works perfectly. You can create new projects and delete without issue. It should feel snappy and instantaneus. 

The pages on the console navbar all lead to different resources on a Kubernetes cluster. There is a caveat. As of right now, the implementation to connect the API to any project causes issues due to the nature of how Svelte works with server-side and client-side logic. Therefore, a single server has been defined in the .env.local file which is included in the project for purposes of testing. 

The application and deployment pages are a WIP and may not function as expected.

I do believe the workings of the code are a little more demonstrative of my learning and achievement, but unfortunately the app itself is far from where I expected it to be. 

# Pocketbase 
This is the database in use for this project at this time. Its data and executables can be found in ./pocketbase/*

I've added a file inside called schema which shows in JSON format what the current structure of the project is. If interested, check out the database itself using the credentials provided:
**Credentials**
Username: `admin@mcogp.qadroid.com`
Password: `helloToUser8)`

# More info
This project is made of (not all-inclusive):
Javascript/Typescript
SvelteKit
Svelte
TailwindCSS
Shadcn-Svelte

## Typescript 
You'll notice when browsing the files that they might be overly verbose in their types. This is due to how typscript encourages types to be declared in advance. The overall style of coding it promotes leads to a better experience troubleshooting. Many problems can be ironed out before they become a bigger issue.

## Svelte
A very enjoyable and performant web-framework. Most of this project is coded in Svelve (as seen on GitLab). It provides incredible QoL features like great state handling, easy to manage server and client side code, and very lightweight and speedy to work with.

I must mention that when using `npm run dev` or alternatives, the reloading and initial site load will be very slow. `npm run preview` will have a long cold boot start time but will perform much better once it's up.

## TailwindCSS
Utility in-line styling as an alternative and/or companion to regular CSS. It makes coding components much easier and overall promotes a quicker, cleaner developer experience. It played a huge part in how I styled this web-app.

## Shadcn-Svelte
A UI library ported from Shadcn which is built for NextJS and others. This fork has some of it's own unique features that provide good integration with Svelte, such as its form components. 
