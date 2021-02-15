import { waitFor } from '@testing-library/react';
import Util from './core.utils';

const { debounce } = Util;

jest.useFakeTimers();

describe('Core Util', () => {
    it('Debounce Function will execute once', () => {
        jest.useFakeTimers();
        const func = jest.fn();
        const funcDebounce = debounce(func, 1000);

        funcDebounce();
        funcDebounce();
        funcDebounce();

        jest.advanceTimersByTime(500);
        funcDebounce();
        jest.runAllTimers();

        expect(func).toBeCalledTimes(1);
    });
})