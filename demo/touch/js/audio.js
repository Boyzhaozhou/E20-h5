$(document).ready(function() {
    setTimeout(function() {
        var bgAudio = new Audio();
        bgAudio.loadStatus = 'unload';
        bgAudio.loop = true;

        function loadAudio(audio, url, callback) {
            audio.src = url;
            audio.load();
            audio.addEventListener('canplay', function() {
                bgAudio.loadStatus = 'loaded';
                callback();
            });
            audio.addEventListener('loadstart', function() {
                bgAudio.loadStatus = 'loading';
            });
        }

        function playAudio() {
            if (bgAudio.loadStatus === 'unload') {
                loadAudio(bgAudio, 'media/bg.mp3', function() {
                    playAudio();
                });
                return 1;
            }

            bgAudio.play();
        }

        function stopAudio() {
            bgAudio.pause();
        }
        bgAudio.addEventListener('playing', function(e) {
            $('#music .music-btn').addClass('play');
        });
        bgAudio.addEventListener('pause', function(e) {
            $('#music .music-btn').removeClass('play');
        });
        $('#music').on('touchstart', function(e) {
            if (bgAudio.paused) {
                playAudio();
                return 0;
            }
            stopAudio();
            return 1;
        });
        window.onload = function() {
            if (bgAudio.loadStatus !== 'unload') {
                return;
            }
            playAudio();
        };
    }, 2000);
});
