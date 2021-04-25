export const getProducts = () => {
    return fetch('https://run.mocky.io/v3/7af6f34b-b206-4bed-b447-559fda148ca5').then(res => res.json())
}
