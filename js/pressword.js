jQuery(function ($) {
  /* You can safely use $ in this code block to reference jQuery */
  $(document).ready(function(){
    $('#pressword-api-test-submit').click(function(e){
      e.preventDefault();
      // var formInput = $('#pressword-api-test-input').val();
      // console.log('clicked?', formInput);

      $('#pressword-api-test-mssg').empty();

      $.ajax({
        url: pressword_post.ajax_url,
        type: 'post',
        data: {
          action: 'test_pressword_api',
          input: '/endpoints'
        },
      })
        .done(function(response) {
          // console.log('res', response);
          $('#pressword-api-test-mssg').append(`<h2>PressWord API Endpoints:</h2>`);
          response.split(' ').forEach((point, idx) => {
            if (point.length) {
              $('#pressword-api-test-mssg').append(`<p> ${idx}: ${point}</p>`);
            }
          })
        })
      .fail(function(err) {
        console.log('fail', err);
        $('#pressword-api-test-mssg').append(`<h2>HugoPress API Endpoints:</h2>`);
        $('#pressword-api-test-mssg').append(`<p>Error in ajax request. Check base url.</p>`);
      });
    });

    $('#pressword-api-submit').click(function(e){
      e.preventDefault();
      let alias = $('#pressword-alias-input').val();
      let endpoint = $('#pressword-url-input').val();
      console.log(`clicked?, alias: ${alias}, url: ${endpoint}, ajaxUrl: ${pressword_post.ajax_url}`);

      $.ajax({
        url: pressword_post.ajax_url,
        type: 'POST',
        data: {
          action: 'set_new_api',
          alias: alias, // your new value variable
          endpoint: endpoint
        },
        // dataType: 'json'
      }).done(function( res ) {
        console.log( "Ajax call succeeded, let's see what the response was.", res);
        // if( json.success ) {
        //   console.log( "Function executed successfully and returned: " + json.message );
        // } else if( !json.success ) {
        //   console.log( "Function failed and returned: " + json.message );
        // }
      }).fail(function(err) {
        alert( "The Ajax call itself failed.", err );
      })
    });
  });
});
