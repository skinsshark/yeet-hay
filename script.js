const videoEl = document.querySelector('video');
const videoWrapperEl = document.querySelector('main');
const bodyEl = document.querySelector('body');

const PLAYBACK_CONST = 500;

window.onscroll = () => {
    videoEl.pause();
};

setInterval(() => {
    videoEl.currentTime = window.scrollY/PLAYBACK_CONST;
}, 40);

videoEl.addEventListener("canplaythrough", () => {
	setTimeout(() => (
		bodyEl.classList.add('video-loaded')
	), 3000); // match with progress bar animation delay value
	bodyEl.style.height = `${videoEl.duration * PLAYBACK_CONST * 1.4}px`;
});

// back to top on refresh
window.onbeforeunload = () => {
	window.scrollTo(0, 0);
}

// pause immediately onload
videoEl.pause();
