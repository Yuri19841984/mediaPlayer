//jshint esversion:6
import { addZero } from './sup.js';
export const videoPlayerInit = () => {
    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoTimePassed = document.querySelector('.video-time__passed');    
    const videoProgress = document.querySelector('.video-progress');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const videoVolume = document.querySelector('.video-volume');
    const playerBtn = document.querySelectorAll('.player-btn');

    const toggleIcon = () => { 
        if(videoPlayer.paused){
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    };
    const togglePlay = () => {
        if(videoPlayer.paused){
            videoPlayer.play();
        } else{
            videoPlayer.pause();
        }
    };
    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;

    };

    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);

    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);

    videoButtonStop.addEventListener('click', stopPlay);

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        videoProgress.value = (currentTime / duration) * 100;

        let minutPassed = Math.floor(currentTime/60);
        let secondsPassed = Math.floor(currentTime%60);

        let minutTotal = Math.floor(duration/60);
        let secondsTotal = Math.floor(duration%60);

        videoTimePassed.textContent = `${addZero(minutPassed)}:${addZero(secondsPassed)}`;
        videoTimeTotal.textContent = `${addZero(minutTotal)}:${addZero(secondsTotal)}`;
    });

    videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    });

    videoVolume.addEventListener('input', () => {
        videoPlayer.volume = videoVolume.value/100;
    });

    playerBtn.forEach((btn, i) => btn.addEventListener('click', () => {
        if(!videoPlayer.paused){
            videoPlayer.pause();
        }
    }));
};