<?php
/**
 * @package Pressword
 *
 * Abstract class used in all the sensors.
 * @see Sensors/*.php
 */
abstract class WPPW_AbstractSensor {
  /**
   * @var WordPress_Hugopress
   */
  protected $app;

  public function __construct(Pressword $app)
  {
      $this->app = $app;
  }

  abstract function HookEvents();

  public function addHooks($actions) {
    foreach ($actions as $action) {
      add_action($action, function($id, $content) use ($action) {
        $this->app->action = $action;
        // $this->app->compiler->mockPresswordNotif();
        $this->app->compiler->instructPressword($id, $content);
      }, 10, 2);
    }
  }
}
