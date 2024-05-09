import {React,useEffect,useState} from 'react'
import { getMybookmarks } from '../../Apis/story'
import style from './bookmark.module.css'
import Bookmarkimg from '../../images/Bookmark.png'
import User from '../../images/userdp.png'
import crossbar from '../../images/iconcross.png'
import bar from '../../images/bar.png'
import Slide from '../../slides/slide'
import StoryPopup from '../../story/story'
import {useNavigate } from 'react-router-dom'
export default  function Bookmark() {

  const[bookmarkedStory,setBookmarkedStory]=useState([])
  const navigate=useNavigate()
  const [storySlide,setStorySlide]=useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [addStory,setAddStory]=useState(false)
  const [addSlide,setAddSlide]=useState(false)
  const [isMobileView, setIsMobileView] = useState(false);
  const [isOpenBar, setIsOpenBar] = useState(false);
  const Username=localStorage.getItem('Username')
    const [currentStory,setCurrentStory]=useState({})
    const togglePopup = () => {
      setIsOpen(!isOpen);
  }
  const handlelogout=()=>{
    localStorage.clear()
    navigate('/')
}
  const handleStory=()=>{
    setAddStory(!addStory)
 }
    useEffect(() => {
      const fetchStoryInBookmark = async () => {
        try {
          const response = await getMybookmarks();
          console.log("response",response)
          if(response?.bookmarks){
            setStorySlide(response?.bookmarks);
          console.log("storySlide",storySlide)
          }
          
        } catch (error) {
          console.error('Error fetching bookmarked stories:', error);
          // Handle error
        }
      };
  
      fetchStoryInBookmark();
    }, []); // Run only once on component mount
  
  useEffect(() => {
    console.log(storySlide);
  }, [storySlide]);
  const handleslide=(data)=>{
    console.log("data",data)
    setAddSlide(!addSlide)
    setCurrentStory(data)

}
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
const handleBar=(e)=>{
  e.preventDefault()
  setIsOpenBar(!isOpenBar)
}
  return (
    <>
    <div className={style.navbar}>
                <h1>SwipTory</h1>
                {!isMobileView && (
                    <div className={style.icon}>
                    <button className={style.bookmark} onClick={(e)=>{
                        e.preventDefault()
                        navigate('/bookmark')
                    }   
                    }><img src={Bookmark}/><span>Bookmark</span></button>
                    <button className={style.addStory} onClick={handleStory}> Add Story</button>
                    <div className={style.profile}>
                    <img src={User} className={style.user} onClick={togglePopup}></img>
                        {isOpen && (
                            <div className={style.popup}>
                                <h3 className={style.username}>{Username}</h3>
                                <button className={style.logout} onClick={handlelogout}>Log out</button>
                            </div>
                        )}
                    </div>
                    <img src={bar} className={style.bar}></img>
                </div>
      )}
      {isMobileView && (
        <div>
            <img src={bar} className={style.bar} onClick={handleBar}></img>
        {isOpenBar && (<div><div className={style.poptab}>
        <div className={style.users}>
            <img src={User} className={style.user} onClick={togglePopup}></img>
                        <h3 className={style.username}>{Username}</h3>
                        </div>
                    <button className={style.bookmark} onClick={(e)=>{
                        e.preventDefault()
                        navigate('/bookmark')
                    }   
                    }><img src={Bookmark}/><span>Bookmark</span></button>
                    <button className={style.addStory} onClick={handleStory}> Add Story</button>
                    <div className={style.profile}>
                                <button className={style.logout} onClick={handlelogout}>Log out</button>
                    </div>
                    <img src={crossbar} className={style.crossbars} onClick={handleBar}></img>
                    </div></div>)}
                </div>
      )}
            </div>
            <div className={style.storys}>
    <h1>Your Bookmarks</h1>
    <div className={style.storyslides} >
              {storySlide?.map((data,index)=>(
                  
                  <div className={style.storyImage} key={index} onClick={()=>handleslide(data)}
                    src={data["slides"].image_url}
                    style={{
                      backgroundImage : `url(${data.slides[0].image_url})`,
                      backgroundSize:'cover',
                      backgroundRepeat:'no-repeat',
                      color:"white",
                      margin:'0px',
                      width: "290px",
                      height: "459px",
                      borderRadius: '18px',
  }}
                    ><div className={style.slidecontent}>
                      <h2>{data["slides"][0].heading}</h2>
                      <p>{data["slides"][0].description}</p>
                    </div>
                    </div>
                  
              ))}
              </div>
              
              {addStory && (
                           <Slide/>
                        )}
              {addSlide && (<StoryPopup story={currentStory}/>)}
              </div>
  </>
)
}
