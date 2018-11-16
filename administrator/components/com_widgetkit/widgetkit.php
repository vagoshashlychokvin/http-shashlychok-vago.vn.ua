<?php

use YOOtheme\Widgetkit\Application;

global $widgetkit;

if ($widgetkit) {
    return $widgetkit;
}

$loader = require __DIR__ . '/vendor/autoload.php';
$config = require __DIR__ . '/config.php';

$app = new Application($config);
$app['autoloader']  = $loader;
$app['path.cache']  = rtrim(JPATH_ROOT, '/').'/cache/widgetkit';
$app['component']   = 'com_'.$app['name'];
$app['permissions'] = array('core.manage' => 'manage_widgetkit');
$app['templates']   = function () {
    return glob(rtrim(JPATH_ROOT, '/').'/templates/*/widgetkit') ?: array();
};

$app->on('init', function ($event, $app) {
    if ($app['admin'] && $app['component'] == JAdministratorHelper::findOption()) {
        $app->trigger('init.admin', array($app));
    }
});

$app->on('init.admin', function ($event, $app) {

    JHtmlBehavior::keepalive();
    JHtml::_('jquery.framework');

    // don't check for component when installing
    if ($app['request']->get('option') != 'com_installer') {
        $app['config']->add(JComponentHelper::getParams($app['component'])->toArray());
    }

    $app['angular']->addTemplate('media', 'views/media.php', true);
    $app['angular']->set('token', JSession::getFormToken());

    $app['scripts']->add('widgetkit-joomla', 'assets/js/joomla.js', array('widgetkit-application'));
    $app['scripts']->add('widgetkit-joomla-media', 'assets/js/joomla.media.js', array('widgetkit-joomla'));
    $app['scripts']->add('uikit-upload');

    $app['styles']->add('widgetkit-joomla', 'assets/css/joomla.css');
}, 10);

$app->on('view', function ($event, $app) {
    $app['config']->set('theme.support', $app['joomla.config']->get('widgetkit'));
});

$app->boot();

return $widgetkit = $app;
