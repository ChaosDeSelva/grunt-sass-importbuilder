# grunt-sass-importbuilder

> Builds an import file for all the partials found.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-sass-importbuilder --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sass-importbuilder');
```

## The "sass_importbuilder" task

### Overview
In your project's Gruntfile, add a section named `sass_importbuilder` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  abc: {
    options: {
        styleLog: ['html','jsp'],
        ignoreSrc: ['web/abc/vendor']
    },
    cwd: '/home/project/web/abc/',
    dest: 'css/_import.scss',
    src: [
        '**/*'
    ]
  }
});
```

### Options

#### options.styleLog
Type: `Array`
Default value: `[]`
Example value: `['html','jsp']`

This array takes the file types you would like to search for inline or embedded styles.  This will log a simple message showing the file that has detected the injection.

#### options.ignoreSrc
Type: `Array`
Default value: `[]`
Example value: `['web/abc/vendor']`

If you want to ignore a certain directory while the import builder is searching for partials you can include those here.

### Usage Examples

#### Default Options
This test example allows you to see all partials in fixtures be found and then included into the imports partial inside of the tmp directory.  In theory you would then include this file in your main sass file.  The contents of the expected file is `@import "../fixtures/colors"; @import "../fixtures/demo/test"; @import "../fixtures/demo/blocks/nested"; `which are the 3 paritals inside of fixtures and they are relative to the location of the source file.

```js
grunt.initConfig({
  default_options: {
    cwd: 'test/',
    dest: 'tmp/_imports.scss',
    src: [
        'fixtures/**/*'
    ]
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
2015-01-28 v0.1.0 Initial functionalities
