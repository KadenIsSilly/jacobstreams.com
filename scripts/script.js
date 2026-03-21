function getPFP() {
    fetch('https://decapi.me/twitch/avatar/jacobstreams')
        .then(response => response.text())
        .then(data => {
            document.getElementById('profile-picture').src = data.trim();
        })
        .catch(() => {
            document.getElementById('profile-picture').src = '/assets/images/pfp-fallback.png';
        });
}

function getLatestVideo() {
    const playlists = [
        { playlist: '0qstDTXacYKzO-GBXitmu8OTwudY3nk', iframe: 'gg-iframe' },
        { playlist: '0qstDTXacam6lDHyxyGa3YuHtneu84p', iframe: 'awards-iframe' },
        { playlist: '0qstDTXacbS-3mZAIk1tywxcnaMMdmc', iframe: 'jackpots-iframe' }
    ];

    Promise.all(
        playlists.map((item) =>
            fetch(`https://decapi.me/youtube/latest_pl_video?id=PL_${item.playlist}`)
                .then((response) => response.text())
                .then((data) => {
                    const videoID = data.trim().split('https://youtu.be/')[1];
                    document.getElementById(item.iframe).src = `https://www.youtube.com/embed/${videoID}`;
                })
                .catch(() => {
                    document.getElementById(item.iframe).src = `https://youtu.be/sT-BYQf9Ge8`;
                })
        )
    );
}

getPFP();
getLatestVideo();