import './Trending.css'
import SingleContent from '../../components/SingleContent.jsx/SingleContent'
import { useState, useEffect } from 'react'
import { TrendingProps } from '../../models/interface'
import axios from 'axios'

export const Trending = () => {
  const [content, setContent] = useState<TrendingProps[]>([])
  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`
    )
    setContent(data.results)
    console.log('dataResult', data.results)
  }
  useEffect(() => {
    window.scroll(0, 0)
    fetchTrending()
  }, [])

  return (
    <div className="trending">
      {content &&
        content.map((c) => (
          <SingleContent
            key={c.id}
            id={c.id}
            poster={c.poster_path}
            title={c.title}
            date={c.first_air_date || c.release_date}
            media_type={c.media_type}
            vote_average={c.vote_average}
          />
        ))}
    </div>
  )
}
