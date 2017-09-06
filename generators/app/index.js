'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the breathtaking ' + chalk.red('generator-flaskapp') + ' generator!'
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
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
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
    // this.installDependencies();
  }
};
