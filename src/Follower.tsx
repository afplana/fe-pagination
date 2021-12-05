import React, { FC } from 'react'
import { User } from './App'

const Follower: FC<User> = ({ login, avatar_url, html_url }) => {

    return <article className="card">
        <img src={avatar_url} alt={login} />
        <h4>{login}</h4>
        <a href={html_url} className="btn">view profile</a>
    </article>
}

export default Follower