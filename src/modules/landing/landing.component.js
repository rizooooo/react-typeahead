import React, { useState } from 'react'
import { useQuery } from '../../core/hooks';
import { CenterLayout } from '../../core/layouts'
import { Input, ListGroup } from '../../core/shared'
import { CoreUtils } from '../../core/utils';

// Todo: prevent '../../..' (long relative imports especially on nested componets file struc) use aliases instead: e.g. @shared/*

const fetcher = async (...args) => {
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

const Landing = () => {
    const [userName, setUsername] = useState('');
    const { isLoading, data } = useQuery(userName ? `/search/users?q=${userName}&per_page=10` : null, fetcher)

    const onOpenGithublink = (url) => {
        const win = window.open(url, '_blank');
        win.focus();
    }

    const onChangeUsername = value =>{
        debouncedText(value)
    }

    // Will setState the userName for every 1.5 seconds
    const debouncedText = CoreUtils.debounce((args) => setUsername(args), 1500)
    return (
        <CenterLayout>
            <div className='listgroup-container'>
                <h1>React Typeahead Github Users</h1>
                <Input
                    data-testid={'username-input'}
                    onChange={e => onChangeUsername(e.target.value)}
                    placeholder='Enter a Github username'
                />
                {data &&
                    <ListGroup
                        data-testid='list-group'
                        isLoading={isLoading}
                        items={data.items}
                        onClickItem={r => onOpenGithublink(r.html_url)}
                        noResultsMessage={'No users found. Please Try Again'}
                    />
                }
            </div>
        </CenterLayout>
    )
}

export default Landing;
