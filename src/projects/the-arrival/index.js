import arrival1 from './arrival-1.jpg'
import arrival2 from './arrival-2.jpg'
import arrival3 from './arrival-3.jpg'
import arrival4 from './arrival-4.jpg'

const content = `
I collaborated with Brisbane band [Caligula's Horse](http://caligulashorse.com/) as visual artist / projectionist for their film clip 'A Gift To Afterthought'. The visuals were created with After Effects & Cinema 4D.

![The Arrival – Shaun Tan](${arrival1})
![The Arrival – Shaun Tan](${arrival2})
![The Arrival – Shaun Tan](${arrival3})
![The Arrival – Shaun Tan](${arrival4})

<p>
  <div class='embed-container'>
    <iframe src="https://player.vimeo.com/video/36180836" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
  </div>
</p>
`

export default {
  id: 'the-arrival',
  title: `The Arrival`,
  image: arrival3,
  brightness: 0.6,
  external: 'https://vimeo.com/36180836',
  content: content.trim()
}
