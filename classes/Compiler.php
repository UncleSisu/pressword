<?php
/**
 * Compiler object manages tree retrieval, manipulation and publishing
 * @package Pressword
 */

/**
 * Class WPPW_Compiler
 */
class WPPW_Compiler {

  /**
   * Application container.
   *
   * @var Pressword
   */
  public $app;

  /**
   * Instantiates a new Compiler object
   *
   * @param Pressword $app Application container.
   */
  public function __construct(Pressword $app) {
    $this->app = $app;
    // add_action('admin_head', array($this, 'hugo_css'));
  }

  // This function used to do more...
  // public function mock_pressword()
  // {
  // }

  public function displayNotification($api, $action) {
    // $press = SITE_ROOT."/wp-content/plugins/pressword/hugo_log.txt";
    // $this->estLogger($press);
    // $this->logger->putLog($content);

    ?>
      <p id='hugoElement'>Subscriber <?php echo $api['name']?> has been notified of <?php $action ?></p>";
    <?php
  }

  public function estLogger($location) {
    $this->logger = new Logger($location);
    $this->logger->setTimestamp("D M d 'y h.i A");
  }

  // Check Hugo API status
  public function checkAPIStatus($url) {
    return wp_remote_get($url);
  }

  // Actually hit end point
  // TODO: url input
  public function postAPI($payload, $url) {
    // localhost test
    // $url = 'http://localhost:3000/wp-hugo';

    // localhost test (vagrant)
    // $url = 'http://10.0.2.2:3000/wp-hugo';

    $response = wp_remote_post(
      $url,
      array('body' => array(
        'payload' => json_encode($payload)
      ))
    );
    // $response = wp_remote_get( $url );

    if (is_wp_error($response)) {
      $frontRes = $response->get_error_message();
    } else {
      $frontRes = $response['body'];
    }

    // for logging
    // $press = SITE_ROOT."/wp-content/plugins/pressword/hugo_log.txt";
    // $this->estLogger($press);
    // $this->logger->putLog($frontRes);
    return $frontRes;
  }

  /**
   * Builds actions into commands for hugo build process, then
   * passes instructions to API post function
   *
   * Called on multitude of hooks.
   *
   * @param int $post_id Post ID.
   */
  public function triggerAPIs($id, $action, $content) {
    $apis = get_option('pressword');
    foreach ($apis as $api) {
      $url = $api['uri'];
      if ($this->checkAPIStatus($url)) {
        if (in_array($action, $api['hooks'])) {
          $this->postAPI(
            $this->createPayload(
              $action,
              $id,
              $content,
              $api),
            $url
          );
          // $this->displayNotification($api, $action);
          // $this->slackTest();
        }
      }

    }
  }

  public function payloadProto($action, $id, $content) {
    return array(
      'wp_action' => $action,
      'wp_id' => $id,
      'wp_content' => $content,
      'wp_testing' => true,
    );
  }

  // Determine what kind of build command to pass API
  public function createPayload($action, $id, $content, $api) {
    // $endpoint = strrpos($action, 'page') ? 'build-page' : 'build-generic';
    // 'text' => $command,

    $payload = $this->payloadProto(
      $action,
      $id,
      $content);

    foreach($api['properties'] as $prop) {
      $payload[$prop['name']] = $prop['value'];
    }
    return $payload;
  }

  public function slackTest() {
    $url = 'https://hooks.slack.com/services/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';

    $payload = array(
      'text' => 'testing testing slack test from wordpress',
      'channel' => '#yobo',
      'username' => 'Rhobot',
      'icon_emoji' => ':rhogiggles:',
    );

    $response = wp_remote_post(
      $url,
      array('body' => array(
        'payload' => json_encode($payload)
      ))
    );
  }
}
