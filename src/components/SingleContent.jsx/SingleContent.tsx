import './SingleContent.css'
import { singleContentProps } from '../../models/interface'
import { FC } from 'react'
import { img_300, unavailable } from '../../config/config'
const SingleContent: FC<singleContentProps> = ({
  poster,
  title,
  date,
  media_type,
}) => {
  return (
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
  )
}

export default SingleContent
