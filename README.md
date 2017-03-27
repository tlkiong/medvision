# MedVision Test Site #

Welcome to the development team for the **MedVision Test Site** (where all the magic happens!)

**Before we get started, we have some prerequisites:**

1. Have NodeJS installed in your system (run `node -v` on your terminal. If no error means A-ok!)
2. Have npm installed in your system (run `npm -v` on your terminal. If no error means A-ok!)
3. Have `gulp` installed globally on your system (run `gulp -v` on your system)

*Do the following steps if failure occur (based on the steps):*

1. [Install NodeJS](https://nodejs.org/en/download/)
2. If you install NodeJS (in step 1) correctly, npm should be already installed in your system
3. Run `npm install -g gulp`

## Getting Started ##

Ok! If you have reached here, I am going to assume you have everything minimally required to run the app. So, here we go!

1. cd into the project root
2. At the root of the project, do `npm install`
3. Once step 2 is done without any errors (ignore warnings), do `gulp setup`*
4. Once step 3 is done without any errors, do `npm start` 


**NOTE**
---
1. A potential error that might happen on step 2 in `Getting Started` section is failure to install `angular-translate`. To fix this, install xcode into your system (this happens only on mac) or go to `bower.json` file and remove the line `angular-translate` <= remove this 2nd option once the project starts to use `angular-translate`
2. `gulp setup` do the following:
    - run `bower install`
    - generate `index.html` from `/www/modules/main-view/pre-index.html` and put the file at `/www/index.html`
    - compile all `.scss` file into `.css` files
    - insert all CSS & JS file as import (eg: `<link...>` and `<script...`) into `/www/index.html`. This means all CSS & JS file under `/www/modules/**/*` and also all CSS & JS for `/www/lib` based on what is specified in their bower.json file
3. Whenever you do any development, run `gulp dev`. This will do:
    - generate `index.html` from `/www/modules/main-view/pre-index.html` and put the file at `/www/index.html`
    - compile all `.scss` file into `.css` files
    - insert all CSS & JS file as import (eg: `<link...>` and `<script...`) into `/www/index.html`. This means all CSS & JS file under `/www/modules/**/*` and also all CSS & JS for `/www/lib` based on what is specified in their bower.json file
4. `npm start` will run a simple HTTP server just to serve the `/www/index.html` file. It isn't a live reload server thus any changes that happen to the files, you would have to refresh the browser
5. `gulp watch` will watch all `.scss` files for changes then compile them to `.css` files
6. When you want to generate production ready files, do `gulp prod`. This will concat & minify all css & js under the `/www/modules` folder and all of bower files. The resulting prod files will be at `./dist`