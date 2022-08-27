import musicData from '../data/musics-data.js'

const audio = document.getElementById('audio');
const stopMusicBtn = document.getElementById('stop-music-btn');
const closeArrowPopUp = document.getElementById('close-arrow-pop-up');
const popUpSectionPlayedMusicContainer = document.getElementById('pop-up-section-played-music-container');
const songSectionContainer = document.getElementById('song-section-container');
const musicNameTitlePopUp = document.getElementById('music-name-title-pop-up');
const playingMusicIcon = document.getElementById('playing-music-icon');
const playingMusicName = document.getElementById('playing-music-name')
const playingMusicSinger = document.getElementById('playing-music-singer')
const openPopUp = document.getElementById('open-pop-up');
const currentTime = document.getElementById('current-time');
const durationTime = document.getElementById('duration-time');
const inputProgressPlayingMusic = document.getElementById('input-progress-playing-music');
const nextTenSecBtn = document.getElementById('next-ten-sec-btn');
const prevTenSecBtn = document.getElementById('prev-ten-sec-btn');
let   IsPlayed = false

function setTime(audioPlayed){

    const minutes = `0${Math.floor(audioPlayed.duration / 60)}`
    const seconds = `0${Math.floor(audioPlayed.duration % 60)}`
    durationTime.innerHTML = `${minutes.slice(-2)}:${seconds.slice(-2)}`

    setInterval(()=>{
        const minutesCurrent = `0${Math.floor(audioPlayed.currentTime / 60)}`
        const secondsCurrent = `0${Math.floor(audioPlayed.currentTime % 60)}`
        currentTime.innerHTML = `${minutesCurrent.slice(-2)}: ${secondsCurrent.slice(-2)}`
        // console.log(secondsCurrent)
    },1000)
}

function popUpContainerMovement() {
    popUpSectionPlayedMusicContainer.style.display = 'flex'
    setTimeout(()=>{
        popUpSectionPlayedMusicContainer.style.top = '0%'
    },3)

}

function renderNewSong(newSong){
    musicNameTitlePopUp.innerHTML = newSong.name;
    playingMusicIcon.src = newSong.cover;
    playingMusicName.innerHTML = newSong.name;
    playingMusicSinger.innerHTML = newSong.artist;
}

function stopAndPLay(){
    if(IsPlayed){
        stopMusicBtn.src = '../img/stop-icon.svg'
        audio.play()
        IsPlayed = false
    }else{
        stopMusicBtn.src = '../img/play.svg'
        audio.pause()
        IsPlayed = true
    }
}

function progressOfMusic(song){
    inputProgressPlayingMusic.max = song.duration
    setInterval(()=>{

        inputProgressPlayingMusic.value = song.currentTime


         
    },1000)
}

function playMyMusic(){
    
    [...songSectionContainer.children].forEach((selectedSong)=>{
        selectedSong.addEventListener('click',()=>{
            const currentMusic = musicData().filter((item)=> item.id === parseInt(selectedSong.dataset.id))[0]

            audio.src = currentMusic.audio
            renderNewSong(currentMusic)
            audio.play().then(()=>{
                popUpContainerMovement()

                closeArrowPopUp.addEventListener('click',()=>{
                    popUpSectionPlayedMusicContainer.style.top = '1000%'
                    setTimeout(()=>{
                        popUpSectionPlayedMusicContainer.style.display = 'none'
                    },3)
                })
                openPopUp.addEventListener('click',()=>{
                    popUpSectionPlayedMusicContainer.style.display = 'flex'
                    setTimeout(()=>{
                        popUpSectionPlayedMusicContainer.style.top = '0%'
                    },3)
                })
                stopMusicBtn.addEventListener('click',stopAndPLay)
                setTime(audio)
                progressOfMusic(audio)
                inputProgressPlayingMusic.addEventListener('change',()=>{
                    audio.currentTime = inputProgressPlayingMusic.value
                })
                nextTenSecBtn.addEventListener('click',()=>{
                    const nextTenSecBtn = Math.floor(audio.currentTime) + 10
                    audio.currentTime = nextTenSecBtn
                    inputProgressPlayingMusic.value = nextTenSecBtn
                })
                prevTenSecBtn.addEventListener('click',()=>{
                    const prevTenSecBtn = Math.floor(audio.currentTime) - 10
                    audio.currentTime = prevTenSecBtn
                    inputProgressPlayingMusic.value = prevTenSecBtn
                })
            })


 

        });

    }); 
    

}

musicData().forEach((item)=>{
    const createElement = `
    <figure data-id="${item.id}" class="music-card-song-section d-flex  space-between">
        <div class="song-contents-container d-flex gap-18">
            <img class="width-15" src="${item.cover}"/>
            <div class="details-song-container">
                <div class="music-name f-weight-500 f-size-20">
                    ${item.name}
                </div>
                <div class="music-singer f-weight-500 f-size-15 gray-F9F9FA" >
                    ${item.artist}
                </div>
            </div>
        </div>
        <img class="like-btn " src="../img/empty-like-button.svg"/>
    </figure>
    `
    console.log('hi')
    songSectionContainer.innerHTML += createElement;
    playMyMusic()

})


