import React, { useState } from 'react';
import useSWR from 'swr';

// Todos
// Implement Debounce (e.g. lodash etc...)

const fetcher = async (...args) => {
    console.log(`token ${process.env.REACT_APP_GITHUB_SECRET}`)
    const res = await fetch(`https://api.github.com${args}`, {
        headers: {
            authorization: `${process.env.REACT_APP_GITHUB_SECRET}`,
        }
    });

    if (res.ok) {
        return await res.json();
    } else {
        const error = new Error('An error occurred while fetching the data.')
        error.info = await res.json()
        error.status = res.status
        throw error
    }
}


const App = () => {
    console.log(process.env.REACT_APP_GITHUB_SECRET)
    const [userName, setUsername] = useState('');
    const { data, error, isValidating } = useSWR(userName ? `/search/users?q=${userName}&per_page=10` : null, fetcher);

    if (error) {
        <h6>An error has occured!</h6>
    }

    const onOpenGithublink = (url) => {
        const win = window.open(url, '_blank');
        win.focus();
    }

    return (
        <div className='main-container'>
            <div className='listgroup-container'>
                <h1>React Typeahead Github Users</h1>
                <input onChange={e => setUsername(e.target.value)} className='form-control' type='text' placeholder='Enter a Github username' />
                <div className='list-group'>
                    {isValidating && <div className='list-item'>
                        Loading...
                    </div>}
                    {!isValidating && data && data.items && data.items.map((a, index) => (
                        <div key={a.id} className='list-item' onClick={() => onOpenGithublink(a.html_url)}>
                            <img src={a.avatar_url} style={{ marginRight: 5 }} width={30} />
                            <span key={index}>{a.login}</span>
                        </div>

                    ))}
                </div>
                {data && data.items && data.items.length === 0 &&
                    <h6>No such user</h6>
                }
            </div>
        </div>
    )
}

export default App;