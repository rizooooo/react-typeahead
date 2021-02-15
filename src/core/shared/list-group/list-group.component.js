import React from 'react'

const ListGroup = ({ isLoading, items, noResultsMessage = 'No such user', onClickItem, ...props }) => {
    return (
        <React.Fragment>
            <div {...props} className='list-group'>
                {isLoading && <div className='list-item' data-testid='loading-text'>
                    Loading...
                    </div>}
                {!isLoading && items && items.map((a, index) => (
                    <div role={'list-item'} key={a.id} className='list-item' onClick={() => onClickItem(a)}>
                        <img src={a.avatar_url} style={{ marginRight: 5 }} width={30} />
                        <span key={index}>{a.login}</span>
                    </div>

                ))}
            </div>
            {items && items.length === 0 &&
                <h6 data-testid='empty-message'>{noResultsMessage}</h6>
            }
        </React.Fragment>
    )
}

export default ListGroup
