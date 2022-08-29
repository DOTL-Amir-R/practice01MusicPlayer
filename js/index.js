
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
const nextMusicBtnContainer = document.getElementById('next-music-btn-container');
const prevMusicBtnContainer = document.getElementById('prev-music-btn-container');
const reapet = document.getElementById('reapet-btn');
let isReapet = true;
const shuffel = document.getElementById('shuffel-btn')
let isShuffel = true;
const volumeInput = document.getElementById('volume-input')
let   IsPlayed = false

function setTime(audioPlayed){

    const minutes = `0${Math.floor(audioPlayed.duration / 60)}`
    const seconds = `0${Math.floor(audioPlayed.duration % 60)}`
    durationTime.innerHTML = `${minutes.slice(-2)}:${seconds.slice(-2)}`

    setInterval(()=>{
        const minutesCurrent = `0${Math.floor(audioPlayed.currentTime / 60)}`
        const secondsCurrent = `0${Math.floor(audioPlayed.currentTime % 60)}`
        currentTime.innerHTML = `${minutesCurrent.slice(-2)}: ${secondsCurrent.slice(-2)}`
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

function changeMusicByIndex(musicByIndex) {
    let currentMusicByIndex = musicByIndex
    renderNewSong(currentMusicByIndex)
    audio.src = currentMusicByIndex.audio
    audio.play().then(()=>{
        progressOfMusic(audio)
        setTime(audio)
    })
}



function playMyMusic(){
    
    [...songSectionContainer.children].forEach((selectedSong)=>{
        selectedSong.addEventListener('click',()=>{
            let currentMusic = musicData().filter((item)=> item.id === parseInt(selectedSong.dataset.id))[0]

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
                let indexCurrentMusic = musicData().findIndex((item)=> item.id === Number(currentMusic.id))
                nextMusicBtnContainer.addEventListener('click',()=>{
                    if(indexCurrentMusic === musicData().length - 1){
                        indexCurrentMusic = 0
                        changeMusicByIndex(musicData()[indexCurrentMusic])
                    }else{
                        indexCurrentMusic++
                        changeMusicByIndex(musicData()[indexCurrentMusic])
                    }
                })
                prevMusicBtnContainer.addEventListener('click',()=>{
                    if(indexCurrentMusic === 0){
                        indexCurrentMusic = musicData().length - 1
                        changeMusicByIndex(musicData()[indexCurrentMusic])
                    }else{
                        indexCurrentMusic--
                        changeMusicByIndex(musicData()[indexCurrentMusic])
                    }


                })
                volumeInput.addEventListener('change',()=>{
                    const musicVolume = volumeInput.value / 10 
                    console.log(musicVolume)
                    audio.volume = musicVolume
                })
                shuffel.addEventListener('click',()=>{
                    if(isShuffel){
                        isShuffel = false
                        shuffel.innerHTML = `Shuffel:On`
                        audio.onended = function (){
                            const shuffelMusicIndex  = Math.floor(Math.random() * musicData().length)
                            const musicShuffeled = musicData()[shuffelMusicIndex]
                            changeMusicByIndex(musicShuffeled)
                            console.log(musicShuffeled)

                        }
                        // changeMusicByIndex(musicShuffeled)

                    }else{
                        isShuffel = true
                        shuffel.innerHTML = `Shuffel:Off`
                        audio.onended = function () {
                            if(indexCurrentMusic === musicData().length - 1){
                                indexCurrentMusic = 0
                                changeMusicByIndex(musicData()[indexCurrentMusic])
                            }else{
                                indexCurrentMusic++
                                changeMusicByIndex(musicData()[indexCurrentMusic])
                            }
                        }

                    }
                })
                reapet.addEventListener('click',()=>{
                    if(isReapet){
                        isReapet = false
                        reapet.innerHTML = `Reapet:On`
                        audio.onended = function (){
                            changeMusicByIndex(musicData()[indexCurrentMusic])

                        }
                    }else{
                        isReapet = true
                        reapet.innerHTML = `Reapet:Off`
                        audio.onended = function () {
                            if(indexCurrentMusic === musicData().length - 1){
                                indexCurrentMusic = 0
                                changeMusicByIndex(musicData()[indexCurrentMusic])
                            }else{
                                indexCurrentMusic++
                                changeMusicByIndex(musicData()[indexCurrentMusic])
                            }
                        }

                    }
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

    songSectionContainer.innerHTML += createElement;
    playMyMusic()

})


