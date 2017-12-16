# generator-flaskapp [![NPM version][npm-image]][npm-url]
> Yeoman generator to scaffold a flask project

## Installation

First, install [Yeoman](http://yeoman.io) and generator-flaskapp using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-flaskapp
```

Then generate your new project:

```bash
yo flaskapp
```
This will ask app name and the files will be generated. Make sure you are in the directory where you want to generate the project. It wont create root directory on its own.

## Folder Structure

```
root
| -- app
    | -- home
    | -- static
        | -- styles.css
        | -- icon.png
    | -- templates
        | -- home
            | -- index.html
        | -- base.html
    | -- __init__.py
    | -- setup.py
| -- .gitignore
| -- Procfile
| -- run.py
| -- runtime.txt
| -- requirements.txt
```

Dependencies are

* Setuptools
* Flask

Each module in this folder structure is organised as a flask blueprint (eg. home)

## Future

* Addition of sub-generators
* More prompts (eg. Flask-WTF)
* Write tests

## License

MIT © [khushmeet](khushmeetsingh.com)


[npm-image]: https://badge.fury.io/js/generator-flaskapp.svg
[npm-url]: https://npmjs.org/package/generator-flaskapp
