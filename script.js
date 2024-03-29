const videoEl = document.querySelector('video');
const videoWrapperEl = document.querySelector('main');
const bodyEl = document.querySelector('body');

const prompt = document.getElementById('prompt');
const promptWrapper = document.getElementById('promptWrapper');

let PLAYBACK_CONST = 2000;
let showPrompt = true
let pageReady = false
let maxHeight;

window.onscroll = () => {
    videoEl.pause();
	
	// fade prompt away when scrolling for a bit
	if (pageReady && showPrompt && window.scrollY > 500) {
		promptWrapper.style.opacity = (1 - (window.scrollY/900)).toFixed(1)
		if (window.scrollY > 1500) {
			showPrompt = false
			promptWrapper.style.opacity = 0
		}
	}

	// figure out actual height needed
	if (maxHeight == null && window.scrollY > videoEl.duration * PLAYBACK_CONST) {
		maxHeight = window.scrollY + 500
	}

	// restrict scrolling past
	if (window.scrollY > maxHeight) {
		bodyEl.style.maxHeight = `${maxHeight * 1.5}px`
		window.scrollTo(0, maxHeight)
	}
};
		
// message prompt animation logic
prompt.addEventListener('animationiteration', function() {
	if (bodyEl.classList.contains('video-loaded')) {
		prompt.classList.remove('loading')
		prompt.classList.add('fade-out')

		setTimeout(() => {
			prompt.classList.remove('fade-out')
			prompt.textContent = 'Scroll to read'
			setTimeout(() => {
				pageReady = true
				bodyEl.style.overflowY = 'scroll'
			}, 1000)
			prompt.classList.add('fade-in')
		}, 500)
	}
})

// trigger once
videoEl.addEventListener("canplaythrough", () => {
	bodyEl.classList.add('video-loaded')
	bodyEl.style.height = `${videoEl.duration * PLAYBACK_CONST * 1.5}px`;
	bodyHeight = videoEl.duration * PLAYBACK_CONST * 1.5
}, {once: true});

// back to top on refresh
window.onbeforeunload = () => {
	window.scrollTo(0, 0);
}

// pause immediately onload
videoEl.pause();

// scrolling => video playing logic
setInterval(() => {
	videoEl.currentTime = window.scrollY/PLAYBACK_CONST;
}, 40);