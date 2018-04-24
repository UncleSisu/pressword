const attachment = {
  trash: [
    'delete_attachment',
  ],
  edit: [
    'add_attachment',
    'edit_attachment',
  ],
  publish: [
  ]
}

const category = {
  trash: [
    'delete_category',
  ],
  edit: [
    'add_category',
    'edit_category',
  ],
  publish: [
  ]
}

const comment = {
  trash: [
    'trash_comment',
    'delete_comment',
  ],
  edit: [
  ],
  publish: [
    'comment_post',
    'wp_insert_comment',
  ]
}

const page = {
  trash: [
  ],
  edit: [
  ],
  publish: [
    'publish_page'
  ]
}

const post = {
  trash: [
    'delete_post',
    'trash_post',
    'wp_trash_post'
    'untrash_post'
  ],
  edit: [
    'save_post',
    'edit_post',
    'updated_postmeta'
  ],
  publish: [
    'publish_post'
  ]
}

export default (type, action) => {
  console.log('converter in action')
  return {
    type,
    action
  }
}
