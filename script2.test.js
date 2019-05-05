const fetch = require('node-fetch');
const swapi = require('./script2')

// Waits until done() is called before test is finished
// Or use return
it('calls swapi to get people', (/*done*/) => {

    // Always check assertions work
    expect.assertions(1)
    return swapi.getPeoplePromise(fetch).then(data => {
        expect(data.count).toEqual(87);
        // done();
    })
})

// Use jest cheat sheet on Github!
it('Test number of results', (/*done*/) => {

    // Always check assertions work
    expect.assertions(2)
    return swapi.getPeoplePromise(fetch).then(data => {
        expect(data.count).toEqual(87);
        expect(data.results.length).toBeGreaterThan(5)
    })
})

// Sample mock
// Use mocks to avoid long running async code such as API calls
// Mock functions also known as spies
it('getPeople returns count and results', () => {
    const mockFetch = jest.fn().mockReturnValue(Promise.resolve({
        json: () => Promise.resolve({
            count: 87,
            results: [0, 1, 2, 3, 4, 5]
        })
    }))

    expect.assertions(4)

    return swapi.getPeoplePromise(mockFetch).then(data => {
        expect(mockFetch.mock.calls.length).toBe(1);

        // Tests the URL that is being called
        expect(mockFetch).toBeCalledWith('https://swapi.co/api/people');

        expect(data.count).toEqual(87);
        expect(data.results.length).toBeGreaterThan(5)
    })
})