import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Accordian from './components/accordian'
import RandomColor from './components/random-color'
import StarRating from './components/star-rating'
import ImageSlider from './components/image-slider'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
        {/* <Accordian /> */}
        {/* <RandomColor /> */}
        {/* <StarRating noOfStars={10} /> */}
        <ImageSlider url={'https://picsum.photos/v2/list'} limit={'4'} />

    </div>
  )
}

export default App
