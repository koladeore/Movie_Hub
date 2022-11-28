import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { PageProps } from '../../models/interface'
import './Details.css'
import { img_500, unavailable } from '../../config/config'

export const Details = () => {
  const navigate = useNavigate()
  // const user = JSON.parse(localStorage.getItem('dataKey') as string) || null;
  // if(!user){
  //   window.location.replace('http://localhost:3000/signUp')
  // }
  const [content, setContent] = useState<PageProps>()
  const [video, setVideo] = useState()
  const params = useParams()
  const { id } = params
  const getId = id?.substring(0, 6)
  const getMediaType = id?.substring(6)
  const navigateToExternalUrl = (
    url: string,
    shouldOpenNewTab: boolean = true
  ) =>
    shouldOpenNewTab ? window.open(url, '_blank') : (window.location.href = url)
  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${getMediaType}/${getId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
    setContent(data)
  }
  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${getMediaType}/${getId}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
    setVideo(data.results[0]?.key)
  }
  useEffect(() => {
    fetchData()
    fetchVideo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      {content && (
        <div className="detail-container">
          <div className="detail-img">
            <img
              src={
                content.poster_path
                  ? `${img_500}/${content.poster_path}`
                  : unavailable
              }
              alt={content.name || content.title}
            />
          </div>
          <div className="detail-content">
            <div className="detail-title">
              <h1>
                {content.name || content.title} (
                {(
                  content.first_air_date ||
                  content.release_date ||
                  '____'
                ).substring(0, 4)}
                )
              </h1>
            </div>
            <div className="detail-overview">
              <h3>Overview</h3>
              <p>{content.overview}</p>
            </div>
            <div className="watch-trailer">
              <button
                onClick={() =>
                  navigateToExternalUrl(
                    `https://www.youtube.com/watch?v=${video}`
                  )
                }
              >
                Watch Trailer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
