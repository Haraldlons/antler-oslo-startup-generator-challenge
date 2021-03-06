# Antler Oslo Startup Generator Challenge

During the application process of Antler Oslo Startup Generator, they served us with a technical challenge of replicating the functionality at [eiendomspriser.no](http://eiendomspriser.no/).
This website aims to do so.
(Unfortunately, I was not able to gather information about the selling date of houses and apartments)

Author: Harald Lønsethagen

# Live Demo

This repo is hosted at GitHub Pages at [https://haraldlons.github.io/antler-oslo-startup-generator-challenge/](https://haraldlons.github.io/antler-oslo-startup-generator-challenge/).

# Getting started

```bash
git clone https://github.com/Haraldlons/antler-oslo-startup-generator-challenge.git
cd antler-oslo-startup-generator-challenge
npm install
npm start
# Open browser at http://localhost:1234/
```

# Challenge Description

[eiendomspriser.no](http://eiendomspriser.no/) is a service that finds house prices in your area. We would like you to make a mini-version of this service. With the possibility of searching for a street address, get the five last sold apartments nearby. Preferably use vanilla javascript + HTML + CSS.

Fancy backend or frameworks are not needed. Services like Kartverket and SSB or similar services could give you access to the numbers you need to accomplish the task. The key to solving this task is to get access to API's.

Please also make sure that the web-app runs on Github pages.

# Style Guide

I use the [Google Javascript Style Guide](https://google.github.io/styleguide/jsguide.html).

# Docker

We all love Docker, so why not try it:
```bash
cd antler-oslo-startup-generator-challenge
docker build -t antler .
docker run -p 1234:1234 -d antler
# Open browser at http://localhost:1234/
# To stop container
docker ps
docker stop <id>
```

# Other Comments

As the challenge was about using vanilla html, js and css, it was a bit unfamiliar, since I have been using various libraries for web development for the last 3 years. Doing it plain would often mean more barebone design. 
