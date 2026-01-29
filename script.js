const API_KEY = "wSFPwR3u0poElOYJJsyJYMvot6JxSrqiU0fKMzDHD1aiJp7bwq7tQEUawSFPwR3u0poElOYJJsyJYMvot6JxSrqiU0fKMzDHD1aiJp7bwq7tQEUawSFPwR3u0poElOYJJsyJYMvot6JxSrqiU0fKMzDHD1aiJp7bwq7tQEUa";
const gallery = document.getElementById("gallery");

async function loadImages() {
  const response = await fetch(
    "https://api.pexels.com/v1/curated?per_page=12",
    {
      headers: {
        Authorization: API_KEY
      }
    }
  );

  const data = await response.json();

  data.photos.forEach(photo => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <img src="${photo.src.medium}">
      <a class="download" href="${photo.src.original}" download>Download</a>
    `;
    gallery.appendChild(div);
  });
}

loadImages();
