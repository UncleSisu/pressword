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
          )
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

  // needs to be updated
  public function test_pressword_api(){
    $name = $_POST['name'];
    $api = get_option('pressword')[$name];
    $res = $this->checkAPI($api);

    if ($res) {
      $res = json_decode($res['body'], true);
      echo json_encode(
        array(
          'name' => $name,
          'data' => $res
        )
      );
    } else {
      echo 'No response';
    }
    die();
  }


  public function post_new_api(){
    $name = $_POST['name'];
    $uri = $_POST['uri'];
    $hooks = $_POST['hooks'];
    $properties = $_POST['properties'];

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
      'properties' => $properties
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

      // add_menu_page( $page_title, $menu_title, $capability, $slug, $callback, $icon, $position );

      // these two do the same
      // add_submenu_page('options-general.php', $page_title, $menu_title, $capability, $slug, $callback);
      add_options_page($page_title, $menu_title, $capability, $slug, $callback);
  }

  public function pressword_settings_page_content(){

    settings_fields( 'pressword' );
    do_settings_sections( 'pressword' );
    ?>
     <div class="wrap">
        <h2>PressWord</h2>
        <form method="post" action="options.php">
          <div id="pressword-root"></div>
        </form>
        </div>
    <?php
  }

  // this should trigger on add
  public function create_pressword_options(){
    // $this->pressword_begin_api();
    // $this->pressword_add_endpoint();
    // $this->pressword_remove_endpoint();
    // $this->pressword_display_endpoints();
      register_setting(
          'pressword',
          'pressword'
      );
      $this->set_defaults_option();
  }

  // Not being used
  public function pressword_add_endpoint(){
      add_settings_section(
          'pressword-new-api',
          'Add an API',
          array($this, 'display_pressword_addition_section'),
          'pressword'
      );
      add_settings_field(
          'pressword-api-input',
          'Enter API Name and URL',
          array($this, 'display_pressword_endpoint_addition'),
          'pressword',
          'pressword-new-api',
          array( 'label_for' => 'pressword' )
      );
      register_setting(
          'pressword',
          'pressword'
      );
  }

  public function pressword_remove_endpoint(){
      add_settings_section(
          'pressword-remove-api',
          'Remove an API',
          array($this, 'display_pressword_removal_section'),
          'pressword'
      );
      add_settings_field(
          'pressword-api-remove-input',
          'Remove a PressWord API endpoint',
          array($this, 'display_pressword_endpoint_removal'),
          'pressword',
          'pressword-remove-api',
          array( 'label_for' => 'pressword-remove' )
      );
  }


  public function pressword_display_endpoints(){
    add_settings_section( 'apis_display', 'APIs', array( $this, 'pressword_display_apis' ), 'pressword' );
  }


  // pressword logic
  public function display_pressword_addition_section($args){
      echo '<p>Configure a API Alias and Endpoint</p>';
  }
  public function display_pressword_removal_section($args){
      echo '<p>Remove an API Endpoint</p>';
  }


  public function display_pressword_endpoint_addition($args){
      $this->set_defaults_option();
      $label = $args["label_for"];

      echo '<div id="'.$label.'-alias-container" class="form-inline">
          <input id="'.$label.'-alias-input" value="" class="form-inline" type="text" style="display: inline;"></input> &nbsp; Add API name
        </div>
        <div id="'.$label.'-url-container" class="form-inline">
          <input type="text" id="'.$label.'-url-input" value=""/> &nbsp; Enter API url for PressWord broadcasting
        </div>
        </br>
        <button id="'.$label.'-api-submit" class="btn" style="display: inline-block;">Add API</button>';
  }

  public function display_pressword_endpoint_removal($args){
      $label = $args["label_for"];

      echo '
      <div id="'.$label.'-alias-container" class="form-inline">
        <input id="'.$label.'-alias-input" value="" class="form-inline" type="text" style="display: inline;"></input> &nbsp; Enter API name/alias
      </div>
      </br>
      <button id="'.$label.'-api-submit" class="btn" style="display: inline-block;">Remove API</button>';
  }


  public function pressword_display_apis(){
    ?>
      <div id="pressword-api-display">
        <?php
          $apis = get_option('pressword');
          $api_count = 1;
          foreach($apis as $api => $endpoint ) {
        ?>
          <div class="pressword-api-item">
            <p id="<?php echo $api ?>"><?php echo $api_count ?>. &nbsp; API alias: <?php echo $api ?>, &nbsp; API endpoint: <?php echo $endpoint ?></p>
            <button id="<?php echo $api ?>-submit" class="btn pressword-test-btn" style="display: inline-block;">Test</button>
            <div id ="<?php echo $api ?>-pressword-msgs" style="display: block;"></div>
          </div>
        <?php
          $api_count = $api_count + 1;
          }
        ?>
      </div>
    <?php
  }

  public function checkAPI($url) {
      return wp_remote_get( $url );
  }
}
