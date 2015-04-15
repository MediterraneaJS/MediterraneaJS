# MediterráneaJS

[![Join the chat at https://gitter.im/MediterraneaJS/MediterraneaJS](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/MediterraneaJS/MediterraneaJS?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## How to setup

Clone the project. 

```bash
$ git clone https://github.com/MediterraneaJS/MediterraneaJS.git
```

Enter in the project and clone it inside `dist/` checking out the `gh-pages` branch.

```bash
$ cd MediterraneaJS
$ mkdir dist
$ cd dist
$ git init
$ git checkout -b gh-pages
$ git remote add origin https://github.com/MediterraneaJS/MediterraneaJS.git
$ git pull origin gh-pages
$ cd .. 
```

Install required libraries.

```bash
$ sudo npm install -g gulp
$ npm install
```

Be sure that you have sass installed.

- http://sass-lang.com/


## How to run

Gulpize the project.

```bash
$ gulp
```

Open your browser at http://localhost:8888 

