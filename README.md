# MediterráneaJS

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

