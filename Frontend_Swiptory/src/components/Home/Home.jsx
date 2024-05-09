import {React,useState,useEffect} from 'react'
import style from './home.module.css'
import Bookmark from '../../images/Bookmark.png'
import User from '../../images/userdp.png'
import bar from '../../images/bar.png'
import Block from '../../Blocks/block'
import All from '../../images/All.png'
import Food from '../../images/Food.png'
import Health from '../../images/Health.png'
import Education from '../../images/Education.png'
import crossbar from '../../images/iconcross.png'
import wallpaper from '../../images/wallpaper.png'
import Slide from '../../slides/slide'
import {useNavigate } from 'react-router-dom'
import OpenPopupButton from '../../story/story'
import { loginUser} from '../../Apis/auth'
import { getStory } from '../../Apis/story';
import StoryPopup from '../../story/story'
export default function Home() {
    const [category,setCategory]=useState([]);
    const navigate=useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const [addStory,setAddStory]=useState(false)
    const [addSlide,setAddSlide]=useState(false)
    const [storySlide,setStorySlide]=useState([])
    const [currentStory,setCurrentStory]=useState({})
    const Username=localStorage.getItem('Username')
    const [showMore, setShowMore] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const [more,setMore]=useState(false)
    const [isOpenBar, setIsOpenBar] = useState(false);
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    const handlelogout=()=>{
        localStorage.clear()
        navigate('/')
    }
    const toggleShowMore = () => {
        setShowMore(!showMore);
        setMore(!more)
      };
    const handleStory=()=>{
       setAddStory(!addStory)
       setIsOpenBar(!isOpenBar)
    }
    const fetchStoryByCategory = async () => {
        console.log("00000",category)
        if (!category.length) return;
        try {
          const response = await getStory(category);
          console.log("000001",storySlide) // Assuming getStory is your API call function
          console.log("000002",response)
          setStorySlide(response)
            // .then(() => {
            //     console.log(storySlide);
            // })
            // .catch(error => {
            //     console.error(error);
            // });
        } catch (error) {
          console.error(error);
          // Handle error
        }
      };
      useEffect(() => {
        fetchStoryByCategory(); // Fetch stories by category when component mounts
      }, [category]); // Trigger the effect whenever the category changes
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
    const DEFAULT_CATEGORIES=[
        {
            id: "all",
            image:(Education)
        },
        {
            id: "Food",
            image:(Food)
        },
        {
            id: "Health & Fitness",
            image:(Health)
        },
        {
            id: "Travel",
            image:(Food)
        },
        {
            id: "Movie",
            image:(Education)
        },
        {
            id: "Education",
            image:(Education)
        }
    ]
  return (
    <>
        <div className={style.container}>
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
      
      {/* Content that appears in mobile view */}
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
            <div className={style.category}>
            {DEFAULT_CATEGORIES.map((categories)=>(
                <Block 
                    categoriesDetails={categories}
                    key={categories.id}
                    categoriesList={category}
                    setCategories={setCategory}
                />
               ))}
            </div>
            <div className={style.storyContent}>
                <div className={style.story}>
                {storySlide?.length ? (
                    <div><div>
                        <h2 className={style.head}>Top Stories About {category}</h2>
                    </div>
                    </div>):(<div>No data</div>)
                }
                <div className={style.storyslides} >
                {storySlide?.slice(0, 4).map((data,index)=>(
                    
                    <div className={style.storyImage} key={index} onClick={()=>handleslide(data)}
                     src={data["slides"][0].image_url}
                     style={{
                        backgroundImage : `url(${data["slides"][0].image_url})`,
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
                {showMore && (
                    <div className={style.storyslides}>
                    {storySlide.slice(4).map((data, index) => (
                        <div
                        key={index +4}
                        className={style.storyImage}
                        onClick={() => handleslide(data)}
                        style={{
                            backgroundImage: `url(${data.slides[0].image_url})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            color: 'white',
                            margin: '0px',
                            width: '290px',
                            height: '459px',
                            borderRadius: '18px',
                        }}
                        >
                        <div className={style.slidecontent}>
                            <h2>{data.slides[0].heading}</h2>
                            <p>{data.slides[0].description}</p>
                        </div>
                        </div>
                    ))}
                    </div>
                )}
                {storySlide.length > 4 && (
                    <button onClick={toggleShowMore} className={style.showmore}>See {more?("less"):("more")}</button>
                    )}
                </div>
            </div>
            {addSlide && (<StoryPopup story={currentStory}/>)}
            
            {addStory && (
                           <Slide/>
                        )}
                        {/* <ToastContainer
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
                    theme="dark" /> */}
            </div>
           
    </>
  )
}
