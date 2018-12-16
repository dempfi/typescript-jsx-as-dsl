import { flatten } from 'lodash'

type Kinds = keyof JSX.IntrinsicElements // Tag names
type Attrubute<K extends Kinds> = JSX.IntrinsicElements[K] // Tag attributes

const isElement = (e: any): e is Element<any> =>
  e && e.kind

const is = <K extends Kinds>(k: K, e: string | Element<any>): e is Element<K> =>
  isElement(e) && e.kind === k

/* Concat all direct child nodes that aren't Elements (strings) */
const buildText = (e: Element<any>) =>
  e.children.filter(i => !isElement(i)).join('')

const buildTitle = (e: Element<'title'>) => ({
  title: buildText(e),
  title_link: e.attributes.link
})

const buildAuthor = (e: Element<'author'>) => ({
  author_name: buildText(e),
  author_icon: e.attributes.icon
})

const buildAttachment = (e: Element<'attachment'>) => {
  const authorNode = e.children.find(i => is('author', i))
  const author = authorNode ? buildAuthor(<Element<'author'>>authorNode) : {}

  const titleNode = e.children.find(i => is('title', i))
  const title = titleNode ? buildTitle(<Element<'title'>>titleNode) : {}

  return { text: buildText(e), ...title, ...author, ...e.attributes }
}

class Element<K extends Kinds> {
  children: Array<string | Element<any>>

  constructor(
    public kind: K,
    public attributes: Attrubute<K>,
    children: Array<string | Element<any>>
  ) {
    this.children = flatten(children)
  }

  /*
   * Convert this Element to actual Slack message
   * only if it is a higher level Element — <message/>.
   */
  toMessage() {
    if (!is('message', this)) return {}
    const attachments = this.children.filter(i => is('attachment', i)).map(buildAttachment)
    return { attachments, text: buildText(this) }
  }
}

export const create = <K extends Kinds>(kind: K, attributes: Attrubute<K>, ...children) => {
  switch (kind) {
    case 'i': return `_${children.join('')}_`
    default: return new Element(kind, attributes, children)
  }
}
