import React, { useState } from 'react';
import './slides.css'; 
import { ToastContainer, toast } from 'react-toastify';
import {DEFAULT_CATEGORIES} from '../utils/category'
import { addStory } from '../Apis/story';
import 'react-toastify/dist/ReactToastify.css';
import Bookmark from '../images/Bookmark.png'
import { FaSync, FaTrashAlt } from 'react-icons/fa'; // Import the trash icon from react-icons library
import remove from '../images/Vector.jpg'
const Slide = ({ onClose }) => {
  const [slides, setSlides] = useState([
    { heading: '', description: '', image_url: ''},
    { heading: '', description: '', image_url: ''},
    { heading: '', description: '', image_url: ''},
  ]);
  const [category,setCategory]=useState()
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [postButtonDisabled, setPostButtonDisabled] = useState(false);
  const [isOpen,setIsOpen]=useState(true)
  const handleInputChange = (index, event) => {
    const { name, value } = event.target; 
    const newSlides = [...slides];
    newSlides[index][name] = value;
    setSlides(newSlides);
  };
  const handleInputCategory = (index, event) => {
    const { name, value } = event.target;
   setCategory(value)
  };
  const handleAddSlide = () => {
    if (slides.length < 6) {
      setSlides([...slides, { heading: '', description: '', image_url: ''}]);
    }
  };
  const onCloses=()=>{
    setIsOpen(!isOpen);
  }
  const handleRemoveSlide = (index) => {
    if (index > 2 && index < slides.length) {
      const newSlides = slides.filter((slide, i) => i !== index);
      setSlides(newSlides);
      setActiveSlideIndex(Math.min(index, newSlides.length ));
      checkPostButton(newSlides);
    }
  };

  const handleTabClick = (index) => {
    setActiveSlideIndex(index);
  };
  const checkPostButton = (newSlides) => {
    const filledSlides = newSlides.filter(slide => slide.heading && slide.description && slide.image_url);
    console.log(filledSlides)
    if(filledSlides.length <3){
      setPostButtonDisabled(false)
    }
  };
  const handleSubmit =async (event,index) => {
    event.preventDefault();
    if(index<3){
        toast.error('Add atleast 3 slides')
        return
    }
      await addStory({"slides":slides,"category":category})
      setIsOpen(!isOpen);
      console.log(index)
  console.log(slides)
}
  return (
    <>
    {isOpen && (<div className="story-upload-popup">
      <div className="modal-content">
        <div className='modal'>
        <span className="close" onClick={onCloses}><img src={remove} /></span>
        <div className="tab-header">
          {slides.map((slide, index) => (
            <React.Fragment key={index}>
            <button
              key={index}
              className={index === activeSlideIndex ? 'active' : ''}
              onClick={() => handleTabClick(index)}
            >
              Slide {index + 1}
              {(index + 1) % 4 === 0 && index !== 0 && (
                <img src={remove} className='closebtn' onClick={() => handleRemoveSlide(index)} alt="Close"/>
              )}
              {(index + 1) % 5 === 0 && index !== 0 && (
                <img src={remove} className='closebtn' onClick={() => handleRemoveSlide(index)} alt="Close"/>
              )}
              {(index + 1) % 6 === 0 && index !== 0 && (
                <img src={remove} className='closebtn' onClick={() => handleRemoveSlide(index)} alt="Close"/>
              )}
            </button>
          </React.Fragment>
          ))}
          {slides.length < 6 && (
            <button type="button" onClick={handleAddSlide}>+</button>
          )}
        </div>
        <form >
          {slides.map((slide, index) => (
            <div key={index} className={`slide ${index === activeSlideIndex ? 'active' : ''}`}>
            <div className='detail'>
             <div>Heading: <input
                type="text"
                name="heading"
                placeholder="Your Heading"
                value={slide.heading}
                className='heading'
                onChange={(event) => handleInputChange(index, event)}
              /></div>
              <div className='describe'>Description:<textarea
                name="description"
                placeholder="Description"
                value={slide.description}
                className='description'
                onChange={(event) => handleInputChange(index, event)}
              /></div>
             <div>ImageUrl:<input
                type="text"
                name="image_url"
                placeholder="ImageURL"
                value={slide.image_url}
                className='image'
                onChange={(event) => handleInputChange(index, event)}
              /></div>
             <div> Category:<select
                name="category"
                value={category}
                className='category'
                onChange={(event) => handleInputCategory(index, event)}
              >
                <option value="">Select category</option>
                <option value="Food">Food</option>
                <option value="Health & Fitness">Health & Fitness</option>
                <option value="Travel">Travel</option>
                <option value="Movie">Movie</option>
                <option value="Education">Education</option>
              </select></div>
              </div>
              <div className="buttons">
            <button type="button" onClick={() => setActiveSlideIndex(Math.max(activeSlideIndex - 1, 0))} className='previous'>Previous</button>
            <button type="button" onClick={() => setActiveSlideIndex(Math.min(activeSlideIndex + 1, slides.length - 1))} className='next'>Next</button>
            <button type="submit" disabled={postButtonDisabled} onClick={(index)=>handleSubmit(index)} className='post'>Post</button>
          </div>
            </div>
            
          ))}
          
        </form>
        </div>
      </div>
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
    </div>)}
    
    </>
  );
};

export default Slide;