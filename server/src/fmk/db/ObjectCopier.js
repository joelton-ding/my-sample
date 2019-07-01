export const copier = ({ logger }) => (dest, src, excludes) => {
  for (let key in src) {
    if (excludes && excludes.includes(key)) {
      continue
    }

    dest[key] = src[key]
  }
  return dest
}
