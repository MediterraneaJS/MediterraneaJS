MediterraneaJS by BarcelonaJS.
=============================

This is the website source of the MediterraneaJS.


How to setup
------------

Clone the repo and then execute npm install and grunt install.

```bash
$ npm install
$ bower install
```



How to build
------------

Verify with grunt that minimized version is working:

```bash
$ grunt serve-dist
```

Use grunt and git to build the final version:

```bash
$ grunt build minimize
$ cd dist
$ git init
$ git checkout -b gh-pages
$ git add -f $(find .)
$ git commit -m initial commit
$ git remote add github https://github.com/you/your-repo.git
$ git push -u github gh-pages
```



How to develop
--------------

Use grunt to start developing with livereload.

```bash
$ grunt serve
```


### App structure

The app structure is divided in packages. 
Each package is a part of the application.
Ex:

```
   src/
      + hb.helpers/    # handlebars helpers for assemble
      + me/            # main application package
      + me.layouts/    # application layouts
      + me.pages.*/    # application pages
      ...
      - scripts.json   # register of all used scripts for all pages
      - styles.less    # styles definition for all pages
```


### Pages

Pages are located in `src/*.pages.*/index.hbs`. It will create a directory for each page so `.html` can be hidden to the user. It is important to use `{{ assets }}` in the use of resources to ensure that they are always well defined. An special page is `src/*.pages.root/index.hbs` which is the main entry point of the application (root page).

Layouts are located in `src/*.pages.layouts/*.hbs`. It can be configured for each 
page by [YFM](http://assemble.io/docs/YAML-front-matter.html) `layout` attribute.
Note: for future uses and combination with angular, better to use one single layout.

Partials are located in `src/*/partials/*.hbs`. It automatically makes public all partials for all pages by the name of the file, so be careful and do not repeat names. 
Ex: `src/me.pages.call-for-papers/partials/typeform-cfp.hbs` can be used from any
page, partial or layout with `{{> typeform-cfp }}`.


### Styles

Styles are based in less, go to `src/styles.less` in order to improve it. Use `@import "me.{{where}}/{{style}}.less";` to add your new stylesheets.


### Scripts

Scripts are statically added to `src/scripts.json`. Its compilation is divided in two steps, one for `bower_components`, and another for app scripts (ones inside `src`).

