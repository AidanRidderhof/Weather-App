import { createClient } from 'pexels';

const API_KEY = "gssZwdG9tp1gIZhGGTwxOiOgjc6PFRLMWXDSULwQdzb1xcQdblTjffsX"

const client = createClient(API_KEY);

export async function getBackground(icon) {
    const oldVid = document.querySelector("#myVideo")
    document.body.classList.add('loading-bg');
    if (oldVid) {
        oldVid.remove()
    }

    let videoModule;
    
    //day
    if (icon == "clear-day" || icon == "partly-cloudy-day") {
        const video = await client.videos.show({ id: 5027967 })
        videoModule = await video.video_files.find(file => file.quality === "sd")
    }
    
    //night
    else if (icon == "clear-night" || icon == "partly-cloudy-night" || icon == "rain-snow-showers-night" || icon == "showers-night" || icon == "snow-showers-night") {
        const video = await client.videos.show({ id: 3579494 })
        videoModule = await video.video_files.find(file => file.quality === "sd")
    }
    //cloudy
    else if (icon == "cloudy" || icon == "fog" || icon == "wind") {
        const video = await client.videos.show({ id: 6189204 })
        videoModule = await video.video_files.find(file => file.quality === "sd")
    }
    //snow
    else if (icon == "hail" || icon == 'sleet' || icon == "snow" || icon == "rain-snow" || icon == "snow-showers-day") {
        const video = await client.videos.show({ id: 854881 })
        videoModule = await video.video_files.find(file => file.quality === "sd")
    }
    //rain
    else if (icon == "rain" || icon == "showers-day" || icon == "rain-snow-showers-day") {
        const video = await client.videos.show({ id: 856186 })
        videoModule = await video.video_files.find(file => file.quality === "sd")
    }
    //thunder
    else if (icon == "thunder-rain" || icon == "thunder-showers-day" || icon == "thunder-showers-night" || icon == "thunder") {
        const video = await client.videos.show({ id: 6190836 })
        videoModule = await video.video_files.find(file => file.quality === "sd")
    }

    const videoElem = document.createElement("video");
    const src = document.createElement("source");
    src.src = videoModule.link; 
    src.type = "video/mp4";
        
    videoElem.id = "myVideo";
    videoElem.muted = true;
    videoElem.autoplay = true;
    videoElem.loop = true;
    videoElem.appendChild(src);
    
    videoElem.onloadeddata = () => {
        document.body.classList.remove('loading-bg');
    };

    return videoElem;
}