export default {
  Attachment: {
    Trash: [
      'delete_attachment',
    ],
    Edit: [
      'add_attachment',
      'edit_attachment',
    ],
    Publish: [
    ]
  },

  Category: {
    Trash: [
      'delete_category',
    ],
    Edit: [
      'add_category',
      'edit_category',
    ],
    Publish: [
    ]
  },

  Comment: {
    Trash: [
      'trash_comment',
      'delete_comment',
    ],
    Edit: [
    ],
    Publish: [
      'comment_post',
      'wp_insert_comment',
    ]
  },

  Page: {
    Trash: [
    ],
    Edit: [
    ],
    Publish: [
      'publish_page'
    ]
  },

  Post: {
    Trash: [
      'delete_post',
      'trash_post',
      'wp_trash_post',
      'untrash_post'
    ],
    Edit: [
      'save_post',
      'edit_post',
      'updated_postmeta'
    ],
    Publish: [
      'publish_post'
    ]
  }
}
