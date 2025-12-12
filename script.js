const mainPosts = document.getElementById("mainPosts");
const popularPosts = document.getElementById("popularPosts");
const tagsContainer = document.getElementById("tagsContainer");
const allPostsList = document.getElementById("allPostsList");
const overlay = document.getElementById("storyOverlay");
const overlayStory = document.getElementById("overlayStory");
const closeOverlay = document.getElementById("closeOverlay");
const nextBtn = document.getElementById("nextStory");
const prevBtn = document.getElementById("prevStory");

let currentIndex = 0;

// Render main posts
function renderMain() {
  mainPosts.innerHTML = "";
  postsData.slice(0, 3).forEach((post) => {
    const index = postsData.indexOf(post);
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${post.img}" alt="${post.title}">
      <div class="card-container">
        <h3>${post.title}</h3>
        <h5>${post.date}</h5>
        <p class="preview">${post.preview}</p>
        <div class="row">
          <button class="read-more" data-index="${index}">READ MORE »</button>
        </div>
      </div>
    `;
    mainPosts.appendChild(card);
  });
}

// Render popular posts
function renderPopular() {
  popularPosts.innerHTML = "";
  postsData
    .slice() // copy array
    .sort((a, b) => b.views - a.views)
    .slice(0, 3)
    .forEach((post) => {
      const index = postsData.indexOf(post);
      const li = document.createElement("li");
      li.innerHTML = `<img src="${post.img}" alt="${post.title}"><span>${post.title}</span>`;
      li.querySelector("span").addEventListener("click", () =>
        openOverlay(index)
      );
      popularPosts.appendChild(li);
    });
}

// Render tags
function renderTags() {
  tagsContainer.innerHTML = "";
  const allTag = document.createElement("span");
  allTag.textContent = "All";
  allTag.style.background = "#000";
  allTag.style.color = "#fff";
  allTag.addEventListener("click", () => renderMain());
  tagsContainer.appendChild(allTag);

  const tagSet = new Set();
  postsData.forEach((post) => post.tags.forEach((t) => tagSet.add(t)));
  tagSet.forEach((tag) => {
    const span = document.createElement("span");
    span.textContent = tag;
    span.addEventListener("click", () => {
      mainPosts.innerHTML = "";
      postsData.forEach((post) => {
        if (post.tags.includes(tag)) {
          const index = postsData.indexOf(post);
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
            <img src="${post.img}" alt="${post.title}">
            <div class="card-container">
              <h3>${post.title}</h3>
              <h5>${post.date}</h5>
              <p class="preview">${post.preview}</p>
              <div class="row">
                <button class="read-more" data-index="${index}">READ MORE »</button>
              </div>
            </div>
          `;
          mainPosts.appendChild(card);
        }
      });
    });
    tagsContainer.appendChild(span);
  });
}

// Overlay functions
function openOverlay(index) {
  currentIndex = index;
  const post = postsData[index];
  overlayStory.innerHTML = `<h2>${post.title}</h2><h5>${post.date}</h5><p>${post.content}</p>`;
  overlay.style.display = "block";
}
function closeOverlayFunc() {
  overlay.style.display = "none";
}
function nextStoryFunc() {
  currentIndex = (currentIndex + 1) % postsData.length;
  openOverlay(currentIndex);
}
function prevStoryFunc() {
  currentIndex = (currentIndex - 1 + postsData.length) % postsData.length;
  openOverlay(currentIndex);
}

// Event listeners
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("read-more")) {
    openOverlay(parseInt(e.target.dataset.index));
  }
});
closeOverlay.addEventListener("click", closeOverlayFunc);
nextBtn.addEventListener("click", nextStoryFunc);
prevBtn.addEventListener("click", prevStoryFunc);

// Back to Top
window.onscroll = () =>
  (document.getElementById("backToTop").style.display =
    window.scrollY > 300 ? "block" : "none");

// Hamburger
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("postSidebar");
const closeSidebar = document.getElementById("closeSidebar");
hamburger.addEventListener("click", () => {
  sidebar.style.width = "300px";
  hamburger.style.display = "none";
});
closeSidebar.addEventListener("click", () => {
  sidebar.style.width = "0";
  hamburger.style.display = "block";
});

// Populate all stories in hamburger
postsData.forEach((post, index) => {
  const a = document.createElement("a");
  a.textContent = post.title;
  a.addEventListener("click", () => {
    openOverlay(index);
    sidebar.style.width = "0";
    hamburger.style.display = "block";
  });
  allPostsList.appendChild(a);
});

renderMain();
renderPopular();
renderTags();
