export default function isMobile() {
	if (/Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent)) 
		return true
	return false
}
