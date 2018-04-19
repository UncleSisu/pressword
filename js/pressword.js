jQuery(function ($) {
  /* You can safely use $ in this code block to reference jQuery */
  $(document).ready(function(){
    $('.pressword-test-btn').click(function(e){
      e.preventDefault();
      let btnId = $(this).attr('id');
      let alias = btnId.split('-')[0];
      console.log(`api clicked check btnId:${btnId}, alias:${alias}`);

      $(`#${alias}-pressword-msgs`).empty();

      $.ajax({
        url: pressword_post.ajax_url,
        type: 'post',
        data: {
          action: 'test_pressword_api',
          alias: alias
        },
        dataType: 'json'
      })
        .done(function(res) {
          // console.log('res', response);
          let msgs = $(`#${res.alias}-pressword-msgs`);
          msgs.append(`<h2>data:</h2>`);
          if (res.alias === 'hugo') {
            res.data.routes.split(' ').forEach((point, idx) => {
              if (point.length) {
                msgs.append(`<p> ${idx}: ${point}</p>`);
              }
            })
          } else {
            msgs.append(`<p>${res.data}</p>`);
          }
        })
      .fail(function(err) {
        console.log('fail', err);
        // $('#pressword-api-test-mssg').append(`<h2>HugoPress API Endpoints:</h2>`);
        // $('#pressword-api-test-mssg').append(`<p>Error in ajax request. Check base url.</p>`);
      });
    });

    $('#pressword-api-submit').click(function(e){
      e.preventDefault();
      let alias = $('#pressword-alias-input').val();
      let endpoint = $('#pressword-url-input').val();
      $('#pressword-alias-input').val('');
      $('#pressword-url-input').val('');
      
      console.log(`clicked?, alias: ${alias}, url: ${endpoint}, ajaxUrl: ${pressword_post.ajax_url}`);

      $.ajax({
        url: pressword_post.ajax_url,
        type: 'POST',
        data: {
          action: 'set_new_api',
          alias: alias, // your new value variable
          endpoint: endpoint
        },
        dataType: 'json'
      })
        .done(function(res) {
          console.log('res add api', res);

          // $('#pressword-api-display').append(`<h2>PressWord API Endpoints:</h2>`);
          $('#pressword-api-display').append(`<p id=${res.alias}>Newly added - API alias: ${res.alias}, &nbsp; API endpoint: ${res.endpoint}</p>`);
        })
        .fail(function(err) {
          alert( "The Ajax call itself failed.", err );
        })
    });

    $('#pressword-remove-api-submit').click(function(e){
      e.preventDefault();
      let alias = $('#pressword-remove-alias-input').val();
      $('#pressword-remove-alias-input').val('');

      console.log(`clicked?, alias: ${alias}, ajaxUrl: ${pressword_post.ajax_url}`);

      $.ajax({
        url: pressword_post.ajax_url,
        type: 'POST',
        data: {
          action: 'remove_api',
          alias: alias // your new value variable
        },
        dataType: 'json'
      })
        .done(function(res) {
          console.log('res remove api', res);

          $('#pressword-api-display').find(`#${res.alias}`).remove();
        })
        .fail(function(err) {
        alert( "The Ajax call itself failed.", err );
      })
    });
  });
});
