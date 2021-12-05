import { useFetch } from './useFetch'
import Follower from './Follower'
import { useEffect, useState } from 'react'

export interface User {
  id: number,
  login: string,
  avatar_url: string,
  html_url: string,
}


function App() {

  const { loading, data } = useFetch<User>()
  const [page, setPage] = useState(0)
  const [followers, setFollowers] = useState<User[]>([])

  useEffect(() => {
    if (loading) {
      return
    }
    setFollowers(data[page])
  }, [loading, page])


  const prevPage = () => {
    setPage((old) => {
      let next = old - 1
      if (next < 0) {
        next = data.length - 1
      }
      return next
    })
  }

  const nextPage = () => {
    setPage((old) => {
      let next = old + 1
      if (next > data.length - 1) {
        next = 0
      }
      return next
    })
  }

  return (
    <main>
      <div className="section-title">
        <h1>{loading ? 'Loading...' : 'pagination'}</h1>
        <div className="underline"></div>
      </div>
      <section className="followers">
        <div className="container">
          {followers.map((follower) => {
            return <Follower key={follower.id} {...follower} />
          })}
        </div>

        {!loading && <div className="btn-container">
          <button className='prev-btn' onClick={prevPage}>prev</button>
          {data.map((_item, index) => {
            return <button key={index} className={`page-btn ${index === page ? 'active-btn' : null}`} onClick={() => setPage(index)}>{index + 1}</button>
          })}
          <button className='next-btn' onClick={nextPage}>next</button>
        </div>}
      </section>
    </main>
  )
}

export default App
