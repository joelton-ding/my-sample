const DownloadUtil = {}
DownloadUtil.get = url => {
  var element = document.createElement('a')
  element.setAttribute('href', url)
  // element.setAttribute('target', '_blank')
  element.setAttribute('download', '')
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}
export default DownloadUtil
