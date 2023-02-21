import {  useState, useEffect,} from "react";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

import { ImageFinder } from "./App.styled";

import { getData } from "services/images-api";
import { Button, Loader, ImageGallery, Searchbar } from "components";

export const App = () => {

  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [showButton, setShowButton] = useState(false)
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => { 
    if (!searchQuery) return
    setIsLoading(true)

    getData(searchQuery, page).then((res) => {
      const { hits, totalHits } = res

      if(totalHits === 0) {
        setIsLoading(false)
        toast.info('🤷‍♂️ No matches found');
      }

      if(totalHits > 12 && hits.length >= 12) {
        setShowButton(true)
      }
            
      else {
        setShowButton(false)
      }
      
      setImages((images) => images = [...images, ...hits]);

      }).catch((error) => {
        console.log(error)
        toast.error('Something went wrong')
      }).finally(() => {
        setIsLoading(false)
      })

  }, [searchQuery, page])

  const onFormSubmit = (e, value) => {
    e.preventDefault()
    if(value.length === 0) {
      toast('Please enter something')
      return
    }
  
    setSearchQuery(value)
    setPage(1)
    setImages([])
  }

  const onNextPage = () => {
    setPage((prevPage) => prevPage += 1)
  }


    return (
      <ImageFinder>
        <Searchbar onSubmit={onFormSubmit}/>
        {images.length !== 0 && <ImageGallery  images={images}/>}
        {isLoading && <Loader/>}
        {showButton && !isLoading && <Button onClick={onNextPage}/>}
        <ToastContainer autoClose={3000}/>
      </ImageFinder>
  );
}
