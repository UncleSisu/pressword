<?php
/**
 * Compiler object manages tree retrieval, manipulation and publishing
 * @package Pressword
 */

/**
 * Class WPPW_RestAPI
 */
class WPPW_RestAPI {

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
  public function __construct( Pressword $app ) {
    $this->app = $app;
    add_action( 'rest_api_init', array($this, 'setup_rest_api') );
  }

  public function setup_rest_api() {
    register_rest_route('wp/v2', '/posts/', array(
      'methods' => 'GET',
      'callback' => 'micCheck'
    ));
  }

  public function micCheck($data) {
    $this->notify('derp');
    $posts = get_posts( array(
      'author' => $data['id'],
    ) );

    if ( empty( $posts ) ) {
      return null;
    }

    return $posts[0]->post_title;
  }

  public function notify($info) {
    // $press = SITE_ROOT."/wp-content/plugins/pressword/pressword_log.txt";
    $this->estLogger(WPHB_LOGGER);
    $this->logger->putLog($info);
    echo "<p id='hugo'>$info</p>";
  }

  public function estLogger ($location) {
    $this->logger = new Logger($location);
    $this->logger->setTimestamp("D M d 'y h.i A");
  }

  // Determine what kind of build command to pass API
  public function parseAction($action) {
    $command = $action === 'post_updated_messages' ? 'build-page' : 'build-generic';
    return array(
      'text' => $command,
      'action' => $action,
    );
  }
}

function micCheck($data) {
  $this->notify('derp');
  $posts = get_posts( array(
    'author' => $data['id'],
  ) );

  if ( empty( $posts ) ) {
    return null;
  }

  return $posts[0]->post_title;
}
