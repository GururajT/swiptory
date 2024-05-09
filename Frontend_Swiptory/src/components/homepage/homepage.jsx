import React, { useEffect,useState } from 'react'
import style from './homepage.module.css'
import { loginUser, registerUser } from '../../Apis/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import vector from '../../images/Vector.jpg'
import wallpaper from '../../images/wallpaper.png'
import All from '../../images/All.png'
import bar from '../../images/bar.png'
import crossbar from '../../images/iconcross.png'
import Food from '../../images/Food.png'
import Health from '../../images/Health.png'
import Education from '../../images/Education.png'
import {useParams,useNavigate } from 'react-router-dom'
import Block from '../../Blocks/block'
import StoryPopup from '../../story/story'
import { getStory } from '../../Apis/story';
export default function Homepage() {
    const navigate=useNavigate()
    const [formData,setFormData]=useState({Username:"", password:""})
    const [loginFormData,setLoginFormData]=useState({Username:"", password:""})
    const {categorys}=useParams
    const [category,setcategory]=useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenBar, setIsOpenBar] = useState(false);
    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const [addSlide,setAddSlide]=useState(false)
    const [storySlide,setStorySlide]=useState([])
    const [currentStory,setCurrentStory]=useState({})
    const [showMore, setShowMore] = useState(false);
    const [more,setMore]=useState(false)
    const [isMobileView, setIsMobileView] = useState(false);
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
            id: "Health & fitness",
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
    const handlechange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
        console.log(formData)
    }
    const loginChange=(e)=>{
        setLoginFormData({...loginFormData,[e.target.name]:e.target.value})
        console.log(loginFormData)
    }
    const toggleShowMore = () => {
        setShowMore(!showMore);
        setMore(!more)
      };
    const handleRegister=async(e)=>{
        e.preventDefault()
        if( !formData.Username || !formData.password){
            toast.error("fleids can't be empty")
        }
        const response=await registerUser({...formData})
        if(response){
            setIsOpen(!isOpen)
            setIsOpenLogin(!isOpenLogin)
            toast.success("Successfully registered")
        }
        console.log(response)
    }
    const handleLogin=async(e)=>{
        e.preventDefault()
        if( !formData.Username || !formData.password){
            toast.error("fleids can't be empty")
        }
        const response=await loginUser(loginFormData.Username,loginFormData.password)
        console.log(response)
        if(response?.token){
            localStorage.setItem("Username", loginFormData?.Username);
            localStorage.setItem("token", response?.token);
            toast.success("successfully Login")
            navigate("/home");
        }
        else{
            toast.error("invalid credentials")
        }
    }
    useEffect(() => {
        fetchStoryByCategory(); // Fetch stories by category when component mounts
      }, [category]); // Trigger the effect whenever the category changes
      useEffect(() => {
        console.log(storySlide);
      }, [storySlide]);
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
    const handleClose=(e)=>{
        e.preventDefault()
        setIsOpen(!isOpen)
    }
    const handleCloseLogin=(e)=>{
        e.preventDefault()
        setIsOpenLogin(!isOpenLogin)
    }
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
        <div className={style.container}>
            <div className={style.navbar}>
                <h1>SwipTory</h1>
                <div className={style.option}>
                    {!isMobileView && (
                <div className={style.desktopContent}>
                <div className={style.profile}>
                <button className={style.register} onClick={
                        (e)=>{
                            e.preventDefault()
                            setIsOpen(!isOpen);
                            if(isOpenLogin){
                                setIsOpenLogin(!isOpenLogin)
                            }
                        }
                    }>Register Now</button>
            {isOpen && (
                    <div className={style.regbox}>
                    <div className={style.box}>
                        <h3 className={style.heading} >Register to Swiptory</h3>
                        <img src={vector} className={style.close} onClick={handleClose}></img>
                        <div>
                        <div className={style.inp}>Username<input placeholder='enter Username' name='Username' onChange={handlechange}></input></div>
                        <div className={style.inp}>Password<input placeholder='enter Password' name='password' onChange={handlechange}></input></div>
                        </div>
                        <button className={style.btn} onClick={handleRegister}>Register</button>
                    </div>
                    </div>

            )}
        </div>
        <div className={style.profile}>
                    <button className={style.signin} onClick={
                        (e)=>{
                            e.preventDefault()
                            setIsOpenLogin(!isOpenLogin)
                            if(isOpen){
                                setIsOpen(!isOpen)
                            }
                        }}> Sign in</button>
                    {isOpenLogin &&(
                        <div className={style.logbox}>
                        <div className={style.box}>
                            <h3 className={style.heading}>Login to Swiptory</h3>
                            <img src={vector} className={style.close} onClick={handleCloseLogin}></img>
                            <div>
                                <div className={style.inp}>Username<input placeholder='enter Username' name='Username' onChange={loginChange}></input></div>
                                <div className={style.inp}>Password<input placeholder='enter Password' name='password' onChange={loginChange}></input></div>
                            </div>
                            <button className={style.btn} onClick={handleLogin}>Login</button>
                            </div>
                        </div>
                    )

                    }
                </div>
        </div>
        
      )}
      
      {/* Content that appears in mobile view */}
      {isMobileView && (
        <div className={style.mobileContent}>
        <div className={style.profile}>
        <img src={bar} className={style.bar} onClick={handleBar}></img>
        {isOpenBar &&(<div className={style.poptab}>
        
        <button className={style.registers} onClick={
                        (e)=>{
                            e.preventDefault()
                            setIsOpen(!isOpen);
                            if(isOpenLogin){
                                setIsOpenLogin(!isOpenLogin)
                            }
                            setIsOpenBar(!isOpenBar)
                        }
                    }>Register</button>
                    <button className={style.signin} onClick={
                        (e)=>{
                            e.preventDefault()
                            setIsOpenLogin(!isOpenLogin)

                            if(isOpen){
                                setIsOpen(!isOpen)
                            }
                            setIsOpenBar(!isOpenBar)
                        }}> Sign In</button>
                        <img src={crossbar} className={style.crossbars} onClick={handleBar}></img>
                </div>)}
                </div>
        </div>)}
      {isOpen && (
                    <div className={style.regbox}>
                    <div className={style.box}>
                        <h3 className={style.heading} >Register to Swiptory</h3>
                        <img src={vector} className={style.close} onClick={handleClose}></img>
                        <div>
                        <div className={style.inp}>Username<input placeholder='enter Username' name='Username' onChange={handlechange}></input></div>
                        <div className={style.inp}>Password<input placeholder='enter Password' name='password' onChange={handlechange}></input></div>
                        </div>
                        <button className={style.btn} onClick={handleRegister}>Register</button>
                    </div>
                    </div>

            )}        
            {isOpenLogin &&(
                        <div className={style.logbox}>
                        <div className={style.box}>
                            <h3 className={style.heading}>Login to Swiptory</h3>
                            <img src={vector} className={style.close} onClick={handleCloseLogin}></img>
                            <div>
                                <div className={style.inp}>Username<input placeholder='enter Username' name='Username' onChange={loginChange}></input></div>
                                <div className={style.inp}>Password<input placeholder='enter Password' name='password' onChange={loginChange}></input></div>
                            </div>
                            <button className={style.btn} onClick={handleLogin}>Login</button>
                            </div>
                        </div>
                    )

                    }
                
                </div>
            </div>
        </div>
           
            <div className={style.category}>
            {DEFAULT_CATEGORIES.map((categories)=>(
                <Block 
                    categoriesDetails={categories}
                    key={categories.id}
                    categoriesList={category}
                    setCategories={setcategory}
                    
                />
               ))}
            </div>
            {!isMobileView && (
                <div className={style.storyContent}>
                <div className={style.story}>
                {storySlide?.length ? (
                    <div><div>
                        <h2 className={style.head}>Top Stories About {category}</h2>
                    </div>
                    </div>):(<div>No data</div>)
                }
                <div className={style.storyslides} >
                {storySlide?.slice(0, 4).map((data)=>(
                    
                    <div className={style.storyImage} onClick={()=>handleslide(data)}
                     src={data["slides"][0].image_url}
                     style={{
                        backgroundImage : `url(${data["slides"][0].image_url})`,
                        backgroundSize:'cover',
                        backgroundRepeat:'no-repeat',
                        color:"white",
                        margin:'0px',
                        width: "398px",
                        height: "520.53px",
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
                {storySlide?.length > 4 && (
                    <button onClick={toggleShowMore} className={style.showmore}>See {more?("less"):("more")}</button>
                    )}
                </div>
            </div>
      )}
      
      {/* Content that appears in mobile view */}
      {isMobileView && (
        <div className={style.storyContent}>
                <div className={style.story}>
                {storySlide?.length ? (
                    <div><div>
                        <h2 className={style.head}>Top Stories About {storySlide[0]?.category}</h2>
                    </div>
                    </div>):(<div>No data</div>)
                }
                <div className={style.storyslides} >
                {storySlide?.slice(0, 4).map((data)=>(
                    
                    <div className={style.storyImage} onClick={()=>handleslide(data)}
                     src={data["slides"][0].image_url}
                     style={{
                        backgroundImage : `url(${data["slides"][0].image_url})`,
                        backgroundSize:'cover',
                        backgroundRepeat:'no-repeat',
                        color:"white",
                        margin:'0px',
                        width: "338px",
                        height: "520.53px",
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
      )}
             
            {addSlide && (<StoryPopup story={currentStory}/>)}

            <div>
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
            </div>
            
    </>
  )
}
