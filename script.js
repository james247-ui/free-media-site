const API_KEY = "563492ad6f91700001000001xxxxxxxxxxxxxxxx";
const gallery = document.getElementById("gallery");

// Images
fetch("https://api.pexels.com/v1/curated?per_page=10", {
  headers: { Authorization: API_KEY }
})
.then(res => res.json())
.then(data => {
  data.photos.forEach(photo => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <img src="${photo.src.medium}">
      <a class="download" href="${photo.src.original}" download>Download</a>
    `;
    gallery.appendChild(div);
  });
});

// Videos
fetch("https://api.pexels.com/videos/popular?per_page=4", {
  headers: { Authorization: API_KEY }
})
.then(res => res.json())
.then(data => {
  data.videos.forEach(video => {
    const file = video.video_files[0];
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <video src="${file.link}" controls muted></video>
      <a class="download" href="${file.link}" download>Download</a>
    `;
    gallery.appendChild(div);
  });
});
