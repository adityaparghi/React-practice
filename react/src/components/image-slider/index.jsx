// import { useState, useEffect } from 'react';
// import {BsArrowLeftCircleFill,BsArrowRightCircleFill} from 'react-icons/bs'
// import './style.css';


// export default function ImageSlider({url, limit}){
//     const [images, setImages] = useState([]);
//     const [currentSLide, setCurrentSlide] = useState(0);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);



//     async function fetchImages() {
//         try {
//             setLoading(true);
//             const response = await fetch(url);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             setImages(data.slice(0, limit));
//             setLoading(false);

//         } catch (error) {
//             console.error('Error fetching images:', error);
//             // setError(error.message);
//             setLoading(false);
//         }
//     }



//     useEffect(() => {
//         if (url !== '') { 
//             fetchImages();
//         }
//     }, [url]);

//     const handlePrev = () => {
//         setCurrentSlide(currentSLide === 0 ? images.length - 1 : currentSLide - 1);
//     }

//     const handleNext = () => {
//         setCurrentSlide(currentSLide === images.length - 1 ? 0 : currentSLide + 1);
//     }

    
//     console.log(images);

//     if (loading) {
//         return <div className='loading' >Loading...</div>;
//     }
//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return( 
//         <div className='body'>
//     <div className='container'>
//         <BsArrowLeftCircleFill onClick={handlePrev} className='arrows arrow-left' />
//         {
//             images && images.length > 0 ? 
//             images.map((imageItem,index) => (
//                 <img 
//                 key={imageItem.id}
//                 src={imageItem.download_url}
//                 alt={imageItem.author}
//                 className={currentSLide === index ? 'current-image' : 'current-image-hidden'} 
//                 />
//             )) : null
//         }
//         <BsArrowRightCircleFill onClick={handleNext} className='arrows arrow-right' />
//         <span className='circle-indicators'>
//             {
//                 images && images.length > 0 ? 
//                 images.map((_,index) => 
//                 <button key={index} className={currentSLide === index ? 'current-indicator'
//                  : 'current-indicator inactive-indicator'} onClick={() => setCurrentSlide(index)}>
                    
//                 </button>) : null
//             }
//         </span>
//     </div>
//     </div>
//     );
// }



import { useState, useEffect, useCallback } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import './style.css';

export default function ImageSlider({ url, limit }) {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  async function fetchImages() {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setImages(data.slice(0, limit));
    } catch (error) {
      console.error('Error fetching images:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (url) fetchImages();
  }, [url]);

  const changeSlide = useCallback(
    (direction) => {
      if (isAnimating || images.length === 0) return;
      setIsAnimating(true);

      setCurrentSlide((prev) => {
        if (direction === 'next') {
          return prev === images.length - 1 ? 0 : prev + 1;
        } else {
          return prev === 0 ? images.length - 1 : prev - 1;
        }
      });

      setTimeout(() => setIsAnimating(false), 500); // match CSS animation
    },
    [images, isAnimating]
  );

  const handlePrev = () => changeSlide('prev');
  const handleNext = () => changeSlide('next');

  useEffect(() => {
    let lastScrollTime = 0;
    function onScroll(e) {
      const now = Date.now();
      if (now - lastScrollTime < 800) return;
      lastScrollTime = now;

      if (e.deltaY > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    window.addEventListener('wheel', onScroll, { passive: true });
    return () => window.removeEventListener('wheel', onScroll);
  }, [handleNext, handlePrev]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="body">
      <div className="container">
        <BsArrowLeftCircleFill onClick={handlePrev} className="arrows arrow-left" />

        {images.length > 0 &&
          images.map((imageItem, index) => (
            <img
              key={imageItem.id}
              src={imageItem.download_url}
              alt={imageItem.author}
              className={
                currentSlide === index
                  ? 'current-image fade'
                  : 'current-image-hidden'
              }
            />
          ))}

        <BsArrowRightCircleFill onClick={handleNext} className="arrows arrow-right" />

        <span className="circle-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              className={
                currentSlide === index
                  ? 'current-indicator'
                  : 'current-indicator inactive-indicator'
              }
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </span>
      </div>
    </div>
  );
}



// async function fetchImages(getUrl){
//     try {
//         const response = await fetch(getUrl);
//         const data = await response.json();

//         if(data){
//             setImages(data);
//             setLoading(false);
//         }

//     } catch (error) {
//         setError(error.message);
//         setLoading(false);
//     }
// }  

// useEffect(() => {
// if(url !== '') {
//     fetchImages(url);
//   }
// }, [url]);

// if (loading) {
//     return <div>Loading...</div>;
// }
// if (error) {
//     return <div>Error: {error}</div>;
// }