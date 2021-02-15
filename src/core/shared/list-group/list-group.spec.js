import { render } from '@testing-library/react';
import ListGroup from './list-group.component';

const mockData = [
    {
        id: 1,
        name: 'Darrell'
    },
    {
        id: 2,
        name: 'Arthur'
    }
]

describe('List group', () => {
    it('Show loading when prop is true', () => {
        const { getByTestId } = render(<ListGroup isLoading={true} />);
        expect(getByTestId('loading-text')).toBeInTheDocument();
    })

    it('Render Items correctly', () => {
        const { queryAllByRole } = render(<ListGroup items={mockData} isLoading={false} />);
        expect(queryAllByRole('list-item')).toHaveLength(mockData.length);
    })

    it('Show empty message when result are []', () => {
        const { getByTestId } = render(<ListGroup items={[]} isLoading={false} />);
        expect(getByTestId('empty-message')).toBeInTheDocument();
    })

    it('Show correct empty message based on the prop noResultsMessage', () => {
        const { getByTestId, rerender } = render(<ListGroup items={[]} isLoading={false} />);
        expect(getByTestId('empty-message')).toHaveTextContent('No such user')

        rerender(<ListGroup noResultsMessage={'Is empty'} items={[]} isLoading={false} />);
        expect(getByTestId('empty-message')).toHaveTextContent('Is empty');
    })
})