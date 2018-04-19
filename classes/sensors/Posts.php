<?php
/**
 * @package WPPW
 * @subpackage Sensors
 * Wordpress Posts.
 *
 */
// Attachments
class WPPW_Sensors_Posts extends WPPW_AbstractSensor {
  /**
   * @var Pressword
   */
  public $app;
  // protected $app;

  public function __construct(Pressword $app) {
    $this->app = $app;
  }

  /**
   * Listening to events using WP hooks.
   */
  public function HookEvents() {
    // $this->addHooks(
    //   array (
    //   )
    // );
  }
}
