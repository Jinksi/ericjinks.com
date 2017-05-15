import gift from './gift-to-afterthought.jpg'
import gift2 from './gift2.jpg'
import gift3 from './gift3.jpg'
import gift4 from './gift4.jpg'

const content = `
I collaborated with Brisbane band [Caligula's Horse](http://caligulashorse.com/) as visual artist / projectionist for their film clip 'A Gift To Afterthought'. The visuals were created with After Effects & Cinema 4D.

![Caligula's Horse - A Gift To Afterthought](${gift3})
![Caligula's Horse - A Gift To Afterthought](${gift2})
![Caligula's Horse - A Gift To Afterthought](${gift4})

<p>
  <div class='embed-container'>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/bVvOPSupIsg" frameborder="0" allowfullscreen></iframe>
  </div>
</p>
`
export default {
  id: 'caligulas-horse-gift-to-afterthought-clip',
  title: `Caligula's Horse Film Clip`,
  image: gift,
  external: 'https://www.youtube.com/watch?v=bVvOPSupIsg',
  content: content.trim()
}
