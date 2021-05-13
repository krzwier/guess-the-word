require('jest-fetch-mock').enableMocks();
// global.fetch = require('@testing-library/jest-dom/extend-expect');
// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
//   })
// );