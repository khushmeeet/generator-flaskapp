'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the breathtaking ' + chalk.red('generator-flaskapp') + ' generator!\n' +
      'Run this generator in the folder where your app will be created.'
    ));

    const prompts = [{
      type: 'input',
      name: 'title',
      message: 'Title of your Flask application',
      default: 'app'
    }, {
      type: 'confirm',
      name: 'enable_wtf',
      message: 'Install Flask WTForms',
      default: false
    }, {
      type: 'confirm',
      name: 'enable_login',
      message: 'Install Flask Login',
      default: false
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.log('Your title', props.title);
      this.log('wtf', props.enable_wtf);
    });
  }

  writing() {
    // Config files
    this.fs.copy(
      this.templatePath('runtime.txt'),
      this.destinationPath('runtime.txt')
    );
    this.fs.copy(
      this.templatePath('run.py'),
      this.destinationPath('run.py')
    );
    this.fs.copy(
      this.templatePath('Procfile'),
      this.destinationPath('Procfile')
    );
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );

    // App files
    this.fs.copy(
      this.templatePath('app/home/*.py'),
      this.destinationPath('app/home/*.py')
    );
    this.fs.copy(
      this.templatePath('app/static/style.css'),
      this.destinationPath('app/static/style.css')
    );
    this.fs.copy(
      this.templatePath('app/templates/home/'),
      this.destinationPath('app/templates/home/')
    );
    this.fs.copyTpl(
      this.templatePath('app/templates/base.html'),
      this.destinationPath('app/templates/base.html'),
      {title: this.props.title}
    );
    this.fs.copyTpl(
      this.templatePath('app/*.py'),
      this.destinationPath('app/*.py'),
      {title: this.props.title}
    );
  }

  install() {
    this.spawnCommand('virtualenv', [this.props.title]);
    this.spawnCommand('source', [this.props.title + '/bin/activate']);
    this.spawnCommand('pip', ['install', 'flask', 'gunicorn']);
    if (this.props.enable_wtf) {
      this.spawnCommand('pip', ['install', 'flask-WTF']);
    }
    if (this.props.enable_login) {
      this.spawnCommand('pip', ['install', 'flask-login']);
    }
    this.spawnCommand('pip', ['freeze', '>', 'requirements.txt']);
  }
};
