module.exports = function(grunt) {
    grunt.initConfig({
        banner: '/* Author: Maxim Kolesnikov, http://about.me/kolesnikov.maxim/, <%= grunt.template.today("yyyy") %> */\n',
        clean: ["build/", "dist/"],
        bower_concat: {
            all: {
                dest: 'build/_bower.js',  // Склеенный файл
                exclude: [  // Пакеты, которые нужно исключить из сборки
                    'jquery',  // Если jQuery подключается с CDN Гугла
                    'modernizr'  // Если подключаем скрипты в конце страницы; Modernizr нужно подключать в <head>
                ]
            },
            css: {
                cssDest: 'build/_bower.css',
                exclude: [  // Пакеты, которые нужно исключить из сборки
                    'social-likes'
                ]
            }
        },
        // Склеиваем
        concat: {
            main: {
                src: [
                    'build/_bower.js',
                    'bower_components/bootstrap-star-rating/js/star-rating.js',
                    'app/js/**/*.js'  // Скрипты вашего сайта
                ],
                dest: 'build/scripts.js'
            },
            css: {
                src: [
                    'build/_bower.css',
                    'bower_components/social-likes/social-likes_flat.css',
                    'bower_components/bootstrap-star-rating/css/star-rating.css',
                    'app/css/**/*.css'
                ],
                dest: 'build/styles.css'
            }
        },
        // Сжимаем
        uglify: {
            main: {
                files: {
                    // Результат задачи concat
                    'build/scripts.min.<%= grunt.template.today("m-d-yyyy") %>.js': '<%= concat.main.dest %>'
                }
            }
        },
        copy: {
          all: {
            files: [
                {
                    // This copies all the html and css into the dist/ folder
                    expand: true,
                    cwd: 'app/',
                    src: '**/*.html',
                    dest: 'dist/'
                },
                { expand: true, cwd: 'build/', src: 'scripts.js', dest: 'dist/js/' },
                { expand: true, cwd: 'build/', src: 'styles.css', dest: 'dist/styles/' },
                { expand: true, cwd: 'bower_components/bootstrap/', src: 'fonts/**', dest: 'dist/' }
            ]
          },
        },
        // Выполняем команду при любом изменении файлов
        watch: {
            concat: {
                files: ['<%= concat.main.src %>', '<%= concat.css.src %>', 'app/**/*.html'],
                tasks: ['concat', 'copy']
            }
        },
        // Поднимаем локальный сервер для статитки
        connect: {
            test: {
                options: {
                    port: 8000,
                    base: './dist',
                    keepalive: true
                }
            }
        },
        // Проверяем качество кода (прогоняем метрики)
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: 'js/**/*.js'
        }
    });

    // Подключение плагина load-grunt-tasks
    // Это заклинание вызовет loadNpmTasks для всех плагинов установленных с ключом --save-dev
    require('load-grunt-tasks')(grunt);

    // Задача по умолчанию
    grunt.registerTask('default', ['bower_concat', 'concat', 'copy']);
    grunt.registerTask('debug', ['bower_concat', 'concat']);
};