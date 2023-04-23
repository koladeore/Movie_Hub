import { render, screen } from '@testing-library/react'
import { Trending } from './Trending'
import axios from 'axios'

jest.mock('axios')

describe('Trending component', () => {
  window.scroll = jest.fn()
  it('should render Discover Trending text', async () => {
    render(<Trending />)
    expect(screen.getByText('Trending')).toBeInTheDocument()
  })
  it('renders the loading spinner when isLoading is true', () => {
    render(<Trending />)
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })
  it('renders the content when isLoading is false', async () => {
    const data = {
      results: [
        {
          id: 868759,
          poster_path: '/liLN69YgoovHVgmlHJ876PKi5Yi.jpg',
          title: 'Ghosted',
          release_date: '2023-04-21',
          media_type: 'movie',
          vote_average: 7.5,
        },
      ],
      total_pages: 1000,
    }
    const resp = { data: data }
    ;(axios.get as jest.Mock).mockResolvedValueOnce(resp)
    render(<Trending />)
    expect(data.results[0].title).toEqual('Ghosted')
    expect(data.total_pages).toEqual(1000)
  })
})
