import './SingleContent.css'
import { singleContentProps } from '../../models/interface'
import { FC } from 'react'
import { img_300, unavailable } from '../../config/config'
import { Link } from 'react-router-dom'

const SingleContent: FC<singleContentProps> = ({
  id,
  poster,
  title,
  date,
  media_type,
}) => {
  return localStorage.getItem('dataKey') === null   ? (
    <Link to={'./signUp'}  state={{ from: `/details/${id}${media_type}` }} replace>
      <div className="posters">
        <div className="poster-content">
          <img src={poster ? `${img_300}${poster}` : unavailable} alt={title} />
          <h2>{title}</h2>
          <span>
            <h3>{media_type === 'tv' ? 'TV Series' : 'Movie'}</h3>
            <h3>{date}</h3>
          </span>
        </div>
      </div>
    </Link>
  ) : (
    <Link to={`/details/${id}${media_type}`} >
      <div className="posters">
        <div className="poster-content">
          <img src={poster ? `${img_300}${poster}` : unavailable} alt={title} />
          <h2>{title}</h2>
          <span>
            <h3>{media_type === 'tv' ? 'TV Series' : 'Movie'}</h3>
            <h3>{date}</h3>
          </span>
        </div>
      </div>
    </Link>
  )
}

export default SingleContent
