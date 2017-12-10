import * as Template from './template'

interface Story {
  title: string
  link: string
  publishedAt: Date
  author: { name: string, avatarURL: string }
}

const template = (username: string, stories: Story[]) =>
  <message>
    :wave: Hi {username}, check out our recent stories.

    {stories.map(s =>
      <attachment color='#000000'>
        <author icon={s.author.avatarURL}>{s.author.name}</author>
        <title link={s.link}>{s.title}</title>

        Published at <i>{s.publishedAt}</i>.
      </attachment>
    )}
  </message>

const stories: Story[] = [
  {
    title: 'Story title',
    link: 'https://google.com',
    publishedAt: new Date(),
    author: {
      name: 'Ike Ku',
      avatarURL: 'https://avatars2.githubusercontent.com/u/4568573'
    }
  }
]

console.log(template('User', stories).toMessage())
