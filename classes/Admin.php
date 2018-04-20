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
    // add_action('admin_menu', array($this, 'create_hugopress_options_page'));
    // add_action('admin_init', array($this, 'create_hugopress_options'));
    // add_action('admin_head', array($this, 'api_css'));
    add_action('admin_menu', array($this, 'create_pressword_options_page'));
    add_action('admin_init', array($this, 'create_pressword_options'));
  }

  public function consumer_actions(){
      // api test
      add_action('wp_ajax_nopriv_test_pressword_api', array($this, 'test_pressword_api'));
      add_action('wp_ajax_test_pressword_api', array($this, 'test_pressword_api'));

      // api addition
      add_action('wp_ajax_nopriv_set_new_api', array($this, 'set_new_api'));
      add_action('wp_ajax_set_new_api', array($this, 'set_new_api'));

      // api removal
      add_action('wp_ajax_nopriv_remove_api', array($this, 'remove_api'));
      add_action('wp_ajax_remove_api', array($this, 'remove_api'));
  }

  public function set_defaults_option() {
    if(!is_array(get_option('pressword'))) {
      $apis = array(
        'hugo' => 'http://listener:3000/hugopress/endpoints'
      );
      update_option('pressword', $apis, true);
    }
  }

  public function test_pressword_api(){
    $alias = $_POST['alias'];
    $api = get_option('pressword')[$alias];
    $res = $this->checkAPI($api);

    if ($res) {
      $res = json_decode($res['body'], true);
      echo json_encode(
        array(
          'alias' => $alias,
          'data' => $res
        )
      );
    } else {
      echo 'No response';
    }
    die();
  }


  public function set_new_api(){
    $alias = $_POST['alias'];
    $endpoint = $_POST['endpoint'];

    if( $alias == '' || $endpoint == '' ) {
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
    $apis[$alias] = $endpoint;

    update_option('pressword', $apis, true);

    $json = json_encode(
      array(
        'alias' => $alias,
        'endpoint' => $endpoint
      )
    );

    echo $json;
    die();
  }

  public function remove_api(){
    $alias = $_POST['alias'];

    if( $alias == '') {
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
    unset($apis[$alias]);

    update_option('pressword', $apis, true);

    $json = json_encode(
      array(
        'alias' => $alias
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

  // submit_button();
  //     settings_fields( 'pressword' );
  //     do_settings_sections( 'pressword' );
  public function pressword_settings_page_content(){
    ?>
     <div class="wrap">
        <h2>PressWord Settings</h2>
        <form method="post" action="options.php">

            <div id="pressword-root"></div>
          <!-- <p class="submit">
            <input name="Submit" type="submit" class="button-primary" value="<?php esc_attr_e('Save Changes'); ?>" />
          </p> -->
        </form>
        </div>
    <?php
  }

  // this should trigger on add
  public function create_pressword_options(){
      // $this->pressword_begin_api();
    $this->pressword_add_endpoint();
    $this->pressword_remove_endpoint();
    $this->pressword_display_endpoints();
  }

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


  // public function create_hugopress_options(){
  //     $this->hugopress_endpoint_setting();
  //     $this->hugopress_api_test();
  // }

  // public function hugopress_endpoint_setting(){
  //     add_settings_section(
  //         'hugopress-rest-section',
  //         'HugoPress REST API Settings',
  //         array($this, 'display_hugopress_settings_section'),
  //         'wp-hugopress'
  //     );
  //     add_settings_field(
  //         'hugopress-rest-input',
  //         'HugoPress REST endpoint',
  //         array($this, 'display_hugopress_url_input'),
  //         'wp-hugopress',
  //         'hugopress-rest-section',
  //         array( 'label_for' => 'hugopress-rest-input' )
  //     );
  //     register_setting(
  //         'wp-hugopress',
  //         'hugopress-rest-input'
  //     );
  // }

  // public function hugopress_api_test(){
  //     add_settings_field(
  //         'hugopress-api-test',
  //         'HugoPress REST API test',
  //         array($this, 'display_hugopress_api_test'),
  //         'wp-hugopress',
  //         'hugopress-rest-section',
  //         array( 'label_for' => 'hugopress-api-test' )
  //     );
  //     register_setting(
  //         'wp-hugopress',
  //         'hugopress-api-test'
  //     );
  // }

  // public function pressword_begin_api(){
  //     add_settings_field(
  //         'pressword-add-api',
  //         'PressWord add API name',
  //         array($this, 'begin_pressword_api'),
  //         'wp-hugopress',
  //         'pressword-api-section',
  //         array( 'label_for' => 'pressword-add-api' )
  //     );
  //     register_setting(
  //         'wp-hugopress',
  //         'pressword-add-api'
  //     );
  // }


  /**
   * Sanitize each setting field as needed
   *
   * @param array $input Contains all settings fields as array keys
   */
  // public function sanitize($input){
  //     $newinput = array();
  //     // $newinput['text_string'] = $input['text_string'];
  //     $newinput['text_string'] = $input['text_string'] ? 'yah' : 'nah';
  //     return $newinput;
  // }

  // public function display_hugopress_settings_section($args){
  //   echo '<p>Configure HugoPress REST API specific settings</p>';
  // }
  //
  // public function display_hugopress_url_input($args){
  //   $label = $args["label_for"];
  //   echo '<input type="text" id="'.$label.'" name="'.$label.'" value="'.get_option($label).'"/> HugoPress REST API base url';
  // }
  //
  // public function display_hugopress_api_test($args){
  //   $label = $args["label_for"];
  //   echo '<div id="'.$label.'-form" class="form-inline">
  //     <input id="'.$label.'-input" class="form-inline" type="text" style="display: inline;" disabled></input>
  //     <button id="'.$label.'-submit" class="btn" style="display: inline-block;">Submit</button>
  //     </div>
  //     <div id ="hugopress-api-test-mssg" style="display: block;"></div>';
  // }

  // public function api_css() {
  //     <style type='text/css'>
  //       #pressword-api-display {
  //         display: flex;
  //         justify-content: center;
  //         flex-direction: column;
  //       }
  //       .pressword-test-btn {
  //         width: 20%;
  //         align-self: flex-end;
  //       }
  //       .pressword-api-item {
  //         width: 40%;
  //         display: flex;
  //         flex-direction: column;
  //       }
  //     </style>
  // }
}
