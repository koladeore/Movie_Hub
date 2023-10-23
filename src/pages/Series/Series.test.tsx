import { render, screen } from '@testing-library/react'
import { Series } from './Series'
import mockTest from './Series.mock'
import axios from 'axios'

// jest.mock('axios');
const SeriesMock = mockTest

describe('Series component', () => {
  window.scroll = jest.fn()
  it('should render Series text', async () => {
    render(<Series />)
    expect(screen.getByText('Discover Series')).toBeInTheDocument()
  })
  it('renders the loading spinner when isLoading is true', () => {
    render(<Series />)
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })
  it('renders the content when isLoading is false', async () => {
    const data = {
      results: [
        {
          id: 868751,
          poster_path: '/liLN69YgoovHVgmlHJ876PKi5Yi.jpg',
          title: 'Umbrella Academy',
          release_date: '2023-04-21',
          media_type: 'tv',
          vote_average: 7.5,
        },
      ],
      total_pages: 1000,
    }
    const resp = { data: data }
    ;(axios.get as jest.Mock).mockResolvedValueOnce(resp)
    render(<Series />)
    expect(data.results[0].title).toEqual('Umbrella Academy')
    expect(data.total_pages).toEqual(1000)
  })
})
