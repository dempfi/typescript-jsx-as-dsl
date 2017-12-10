/* Picked up by compiler automatically */
declare namespace JSX {
  interface Element {
    toMessage(): {
      text?: string
      attachments?: {
        text?: string
        title?: string
        title_link?: string
        author_name?: string
        author_icon?: string
        color?: string
      }[]
    }
  }
  interface IntrinsicElements {
    i: {}
    message: {}
    author: { icon: string }
    title: { link?: string }
    attachment: {
      color?: string
    }
  }
}
