var channelName = 'yesalmchurch',
    api_key = '#####', //youtube api key
    maxResultNum = 10,
    vidWidth = 500,
    vidHeight = 400;


$(document).ready(function () {
    $.ajax({
        type: 'get',
        url: 'https://www.googleapis.com/youtube/v3/channels',
        data: {
            part: 'contentDetails',
            forUsername: channelName,
            key: api_key
        },
        success: function (data) {
            $.each(data.items, function (i, item) {
                console.log(item);
                var plid = item.contentDetails.relatedPlaylists.uploads;
                getVids(plid);
            })
        }
    });

    function getVids(plid) {
        $.ajax({
            type: 'get',
            url: 'https://www.googleapis.com/youtube/v3/playlistItems',
            data: {
                part: 'snippet',
                maxResults: maxResultNum,
                playlistId: plid,
                key: api_key
            },
            success: function (data) {
                var output;
                $.each(data.items, function (i, item) {
                    console.log(item);
                    var videoTitle = item.snippet.title;
                    var videoId = item.snippet.resourceId.videoId;

                    console.log("video ID: ");
                    console.log(videoId);

                    output = '<li><iframe height="' + vidHeight + '" width="' + vidWidth + '" src=\"//www.youtube.com/embed/' + videoId + '\ "></iframe></li>';

                    console.log(output);
                    //Append to result listStyleType
                    $('#results').append(output);
                })
            }
        });
    }
});