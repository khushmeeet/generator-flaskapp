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
    }];

    return this.prompt(prompts).then(props => {
      this.props = props;
      this.log('Your title', props.title);
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
      this.templatePath('app/home/__init__.py'),
      this.destinationPath('app/home/__init__.py')
    );
    this.fs.copy(
      this.templatePath('app/home/views.py'),
      this.destinationPath('app/home/views.py')
    );
    this.fs.copy(
      this.templatePath('app/static/style.css'),
      this.destinationPath('app/static/style.css')
    );
    this.fs.copy(
      this.templatePath('app/static/icon.png'),
      this.destinationPath('app/static/icon.png')
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
      this.templatePath('app/__init__.py'),
      this.destinationPath('app/__init__.py')
    );
    this.fs.copy(
      this.templatePath('app/setup.py'),
      this.destinationPath('app/setup.py'),
      {title: this.props.title}
    );
  }

  install() {
    this.spawnCommand('pip', ['install', 'flask', 'gunicorn', 'pipreqs']);
    this.spawnCommand('pipreqs', ['.']);
  }
};
