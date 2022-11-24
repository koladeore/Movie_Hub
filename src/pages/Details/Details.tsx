import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { PageProps } from '../../models/interface'

export const  Details = () =>  {
  const [content, setContent] = useState<PageProps[]>([]);
  const params = useParams()
  const {id} = params
  const getId = id?.substring(0, 6)
  const getMediaType = id?.substring(6)
  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${getMediaType}/${getId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
    setContent(data)
  }
  useEffect(() => {
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>Content</div>
  )
}
