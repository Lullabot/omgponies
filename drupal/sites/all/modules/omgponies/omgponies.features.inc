<?php
/**
 * @file
 * omgponies.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function omgponies_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "services" && $api == "services") {
    return array("version" => "3");
  }
}

/**
 * Implements hook_views_api().
 */
function omgponies_views_api() {
  return array("api" => "3.0");
}

/**
 * Implements hook_node_info().
 */
function omgponies_node_info() {
  $items = array(
    'pony' => array(
      'name' => t('Pony'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}
