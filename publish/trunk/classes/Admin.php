<?php
/**
 * Admin object manages settings and administration
 * @package Pressword
 */

/**
 * Class WPPW_Admin
 */
class WPPW_Admin {

  /**
   * Application container.
   *
   * @var Pressword
   */
  public $app;

  /**
   * Instantiates a new Admin object
   *
   * @param Pressword $app Application container.
   */
  public function __construct( Pressword $app ) {
    $this->app = $app;
    $this->setup_admin_actions();
    $this->consumer_actions();
  }

  // TODO: allow actions to be hooked
  public function setup_admin_actions(){
    add_action('admin_menu', array($this, 'create_pressword_options_page'));
    add_action('admin_init', array($this, 'create_pressword_options'));
  }

  public function consumer_actions(){
      // api test
      add_action('wp_ajax_nopriv_test_pressword_api', array($this, 'test_pressword_api'));
      add_action('wp_ajax_test_pressword_api', array($this, 'test_pressword_api'));

      // api addition
      add_action('wp_ajax_nopriv_post_new_api', array($this, 'post_new_api'));
      add_action('wp_ajax_post_new_api', array($this, 'post_new_api'));

      // api removal
      add_action('wp_ajax_nopriv_delete_api', array($this, 'delete_api'));
      add_action('wp_ajax_delete_api', array($this, 'delete_api'));

      // server apis
      add_action('wp_ajax_nopriv_get_pressword_apis', array($this, 'get_pressword_apis'));
      add_action('wp_ajax_get_pressword_apis', array($this, 'get_pressword_apis'));

  }

  public function set_defaults_option() {
    if(!is_array(get_option('pressword'))) {
      $apis = array(
        'hugo' => array(
          'name' => 'hugo',
          'uri' => 'http://listener:3000/hugopress/endpoints',
          'hooks' => array(
            'publish_post',
            'untrash_post'
          ),
          'properties' => array(
            'name' => 'test',
            'value' => 'foobar'
          ),
          'active' => true
        ),
        'example-api' => array(
          'name' => 'example-api',
          'uri' => 'http://example.com/add/your/endpoint/here',
          'hooks' => array(
            'publish_post',
            'untrash_post'
          ),
          'properties' => array(
            'name' => 'foobar',
            'value' => 'fooit'
          ),
          'active' => false
        )
      );

      update_option('pressword', $apis, true);
    }
  }

  public function get_pressword_apis(){
    $apis = get_option('pressword');

    $json = json_encode(
      array(
        'apis' => $apis
      )
    );

    echo $json;
    die();
  }

  public function post_new_api(){
    $name = $_POST['name'];
    $uri = $_POST['uri'];
    $hooks = $_POST['hooks'];
    $properties = $_POST['properties'];
    $active = $_POST['active'];

    if( $name == '' || $uri == '' ) {
      die(
        json_encode(
          array(
            'success' => false,
            'message' => 'Missing required information.',
            'info' => $_POST
          )
        )
      );
    }

    $apis = get_option('pressword');
    $apis[$name] = array(
      'name' => $name,
      'uri' => $uri,
      'hooks' => $hooks,
      'properties' => $properties,
      'active' => $active
    );
    update_option('pressword', $apis, true);

    $updated_apis = get_option('pressword');
    $json = json_encode(
      array(
        'apis' => $updated_apis
      )
    );

    echo $json;
    die();
  }

  public function delete_api(){
    $name = $_POST['name'];

    if( $name == '') {
      die(
        json_encode(
          array(
            'success' => false,
            'message' => 'Missing required information.'
          )
        )
      );
    }

    $apis = get_option('pressword');
    unset($apis[$name]);

    update_option('pressword', $apis, true);
    $updated_apis = get_option('pressword');

    $json = json_encode(
      array(
        'apis' => $updated_apis
      )
    );

    echo $json;
    die();
  }

  public function create_pressword_options_page(){
      // Add the menu item and page
      $page_title = 'PressWord Settings Page';
      $menu_title = 'PressWord';
      $capability = 'manage_options';
      $slug = 'pressword';
      $callback = array( $this, 'pressword_settings_page_content' );
      $icon = 'dashicons-admin-plugins';
      $position = 100;

      add_menu_page( $page_title, $menu_title, $capability, $slug, $callback, $icon, $position );
      // add_submenu_page('options-general.php', $page_title, $menu_title, $capability, $slug, $callback);
      // add_options_page($page_title, $menu_title, $capability, $slug, $callback);
  }

  public function pressword_settings_page_content(){

    settings_fields( 'pressword' );
    do_settings_sections( 'pressword' );
    ?>
     <div class="wrap">
        <form method="post" action="options.php">
          <div id="pressword-root"></div>
        </form>
        </div>
    <?php
  }

  // this should trigger on add
  public function create_pressword_options(){
      register_setting(
          'pressword',
          'pressword'
      );
      $this->set_defaults_option();
  }

  public function checkAPI($url) {
      return wp_remote_get( $url );
  }
}
