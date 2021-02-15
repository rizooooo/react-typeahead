import { act, render, screen, waitFor, fireEvent, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Landing from './landing.component';


cleanup();
jest.setTimeout(5000)

describe('Landing Component', () => {
    it("Fetches the usernames with the query of 'rizo' from github api", async () => {
        const { getByTestId, debug, getByRole, queryAllByRole } = render(<Landing />);

        const input = getByTestId('username-input');
        userEvent.type(input, 'rizo');

        // Add a timeout because of out debounce func
        await waitFor(() => {
            expect(getByTestId('list-group')).toBeTruthy();
            expect(queryAllByRole('list-item')).toBeTruthy();
        }, { timeout: 5000 });
    })


})
