export const matchToPrint = () => window.matchMedia('print').matches

const match = mediaQuery => window.matchMedia(mediaQuery).matches

export default match
