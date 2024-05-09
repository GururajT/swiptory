import React,{useState,useEffect} from 'react'
import background from '../images/Food.png'
import StoryPopup from '../story/story';
import wallpaper from '../images/wallpaper.png'
import style from './block.module.css'
export default function Block(props) {
  const [isSelected, setIsSelected] = useState(false);
  const [addSlide,setAddSlide]=useState(false)
  const [isMobileView, setIsMobileView] = useState(false);
  const handleCatogeries=(value)=>{
      props.setCategories(value)
      setIsSelected(true)
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
//   useEffect(() => {
//     const isExists =
//         props.categoriesList.include(props.genreDetails.id) === true;
//     setIsSelected(isExists);
// });
  return (
    <>
    {!isMobileView && (
        <div onClick={()=>{
      handleCatogeries(props.categoriesDetails.id)

      } 
      }

      style={{
        backgroundImage : `url(${props.categoriesDetails.image})`,
        backgroundSize:'contain',
        backgroundRepeat:'no-repeat',
        color:"white",
        margin:'0px',
        width: '228px',
        height: '228px',
        borderRadius: '12px',
        // border: '5px solid #00ACD2'
        // borderRadius:"12px",
        // border:`${isSelected ? "5px solid #00ACD2":"4px solid white"}`,
    }}
    key={props.key}
    >
        <p style={{fontSize:"21px",display:'flex',justifyContent:"center",alignContent:"center",alignItems:"center",padding:"95px 0px",textAlign:'center'}}>{props.categoriesDetails.id}</p>
    </div>
      )}
      
      {/* Content that appears in mobile view */}
      {isMobileView && (
        <div onClick={()=>{
      handleCatogeries(props.categoriesDetails.id)

      } 
      }

      style={{
        backgroundImage : `url(${props.categoriesDetails.image})`,
        backgroundSize:'contain',
        backgroundRepeat:'no-repeat',
        color:"white",
        margin:'0px',
        width: '80px',
        height: '80px',
        borderRadius: '12px',
        // border: '5px solid #00ACD2'
        // borderRadius:"12px",
        // border:`${isSelected ? "5px solid #00ACD2":"4px solid white"}`,
    }}
    key={props.key}
    >
        <p style={{fontSize:"12px",display:'flex',justifyContent:"center",alignContent:"center",alignItems:"center",padding:"15px 0px",textAlign:'center'}}>{props.categoriesDetails.id}</p>
    </div>
      )}
    
    </>
  )
}