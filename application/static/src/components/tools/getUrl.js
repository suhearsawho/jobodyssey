export default function getUrl(path) {
	let ipAddress = window.location.hostname;
  let url;
  if (ipAddress.trim() === '127.0.0.1')
		url = 'http://' + ipAddress + ':8000' + path;
	else
		url = 'https://' + ipAddress + path;
	return url
}
