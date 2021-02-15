const utils = {
    debounce: (callback, delay = 250) => {
        let timeoutId
        return (...args) => {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                timeoutId = null;

          
                callback(...args)
            }, delay);

        }
    }
}

export default utils;