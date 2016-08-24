<?php

return [
      'source' => [
            'root'            => 'angular',
            'page'            => 'app/pages',
            'components'      => 'app/components',
            'config'          => 'config',
            'dialogs'         => 'dialogs',
            'filters'         => 'filters',
            'services'        => 'services',
      ],
      'suffix' => [
            'component'       => '.component.js',
            'componentView'   => '.component.html',
            'dialog'          => '.dialog.js',
            'dialogView'      => '.dialog.html',
            'service'         => '.service.js',
            'config'          => '.config.js',
            'filter'          => '.filter.js',
            'pageView'        => '.page.html',
            'stylesheet'      => 'scss',
      ],
      'tests' => [
            'enable' => [
                'components'      => true,
                'services'        => true,
            ],
            'source' => [
                'root'            => 'tests/angular/',
                'components'      => 'app/components',
                'services'        => 'services',
            ],
      ],
      'misc' => [
            'auto_import' => true,
      ],
];
