import React, {useEffect, useState } from 'react';
import styles from './story.module.css';
import Bookmark from '../images/Bookmark.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import like from '../images/like.png'
import share from '../images/share.png'
import left from '../images/left.png'
import liked from '../images/liked.png'
import right from '../images/right.png'
import Bookmarked from '../images/bookmarked.png'
import { getStory } from '../Apis/story';
import { postLikes,getPostLike } from '../Apis/story';
import { postBookmark } from '../Apis/story';
import { checkPostLike } from '../Apis/story';
import { checkPostBookmarked } from '../Apis/story';
import ClipboardCopyImage from './clipborad';
import {useParams,useNavigate } from 'react-router-dom'
import './story.css'
const StoryPopup = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isOpen,setIsOpen]=useState(true)
  const [story,setStory]=useState([])
  const [isPostLike,setIsPostLike]=useState(false)
  const [isMobileView, setIsMobileView] = useState(false);
  const [isBookmarked,setIsBookmarked]=useState(false)
  const [likecounts,setLikeCounts]=useState(0)
  const slides = props["story"]["slides"]
    // { id: 1, content: 'https://tse3.mm.bing.net/th?id=OIP.o0-_5Yz2Vr32GtIPXUKTLQHaEo&pid=Api&P=0&h=220' },
    // { id: 2, content: 'https://tse3.explicit.bing.net/th?id=OIP.GPgOs_sd9nF8fsKDOJe9dQHaEo&pid=Api&P=0&h=220' },
    // { id: 3, content: 'Slide 3 content' },
    // { id: 4, content: 'Slide 4 content' },
    // { id: 5, content: 'Slide 5 content' },
    // { id: 6, content: 'Slide 6 content' },
  const nextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  useEffect(() => {
    async function isLiked() {
      const response = await checkPostLike(props["story"]["_id"]);
      console.log("response",response)
      setIsPostLike(response?.isLiked)
    }
    isLiked(); // Calling the async function directly
  }, []);
  useEffect(() => {
    async function isBookmark() {
      const response = await checkPostBookmarked(props["story"]["_id"]);
      console.log("responsebook",response)
      setIsBookmarked(response?.isBookmarked)
    }
    isBookmark(); // Calling the async function directly
  }, []);
  useEffect(() => {
    async function handlePostLikes() {
      const response = await getPostLike(props["story"]["_id"]);
      console.log("responselike",response?.postLike.likes)
      setLikeCounts(response?.postLike.likes)
    } // Calling the async function directly
    handlePostLikes()
  }, []);
  useEffect(() => {
    checkIsMobileView(); 
    window.addEventListener('resize', checkIsMobileView);
    return () => {
  window.removeEventListener('resize', checkIsMobileView);
    };// Fetch stories by category when component mounts
  }, [])
const checkIsMobileView = () => {
    if (window.innerWidth <= 568) {
        setIsMobileView(!isMobileView);
    } else {
      setIsMobileView(false);
    }
  }
  const handleShare=()=>{
    toast.success('Link copied to clipboard')
  }
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };
  const handleLike =async (id,type) => {
    console.log("clicked")
    const response = await postLikes(id,type);
    setIsPostLike(!isPostLike)
  };
  const onCloses=()=>{
    setIsOpen(!isOpen);

  }
  const handleBookmark = async(id,type) => {
    const response = await postBookmark(id,type);
    console.log("respnsebooks",response)
    setIsBookmarked(!isBookmarked)
  };
  console.log(slides[currentSlide].image_url)
   console.log(story)
  return (
  <>{isOpen && (<div className={styles.storypopup}>
    <div className={styles.storyContent} style={{backgroundImage: `url(${slides[currentSlide].image_url})`}}>
    <SlideBar slides={slides} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
      <button className={styles.closebtn}  onClick={onCloses} >✕</button>
      <div className={styles.sharebtn} onClick={handleShare} ><ClipboardCopyImage imageUrl={`http://localhost:3000/api/v1/story/get/${props["story"]["_id"]}`} />
</div>
      <div className={styles.slidecontent}>
      <div>
        <h3 className={styles.heading}>{slides[currentSlide].heading}</h3>
        <p className={styles.description}>{slides[currentSlide].description}</p>
      </div>
      <div className={styles.actions}>
      {isBookmarked ? (<img onClick={async ()=>await handleBookmark(props["story"]["_id"],"dislike") } src={Bookmarked}></img>):(<img onClick={async ()=>await handleBookmark(props["story"]["_id"],"like")} src={Bookmark}></img>)}
        {isPostLike ? (<div className={styles.likess}><img onClick={async ()=>await handleLike(props["story"]["_id"],"dislike") } src={liked}></img><span className={styles.count}>{likecounts}</span></div>):(<div><img onClick={async ()=>await handleLike(props["story"]["_id"],"like")} src={like}></img><span className={styles.count}>{likecounts}</span></div>)}
        
      </div>
      </div>
      {!isMobileView && (
        <div className={styles.navigation}>
          <img onClick={prevSlide} src={left} className={styles.left}></img>
          <img onClick={nextSlide} src={right} className={styles.right}></img>
        </div>
      )}
      
      {/* Content that appears in mobile view */}
      {isMobileView && (
        <div className={styles.navigation}>
          <img onClick={nextSlide} src={right} className={styles.left}></img>
          <img onClick={prevSlide} src={left} className={styles.right}></img>
        </div>
      )}
      
    </div>
  </div>)}
  <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    closeButton={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark" />
  </>
    
  );
};
const SlideBar = ({ slides, currentSlide, setCurrentSlide }) => {
  return (
    <div className="slide-bar">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide-bar-item ${currentSlide === index ? 'active' : ''}`}
          onClick={() => setCurrentSlide(index)}
        />
      ))}
    </div>
  );
};
export default  StoryPopup;