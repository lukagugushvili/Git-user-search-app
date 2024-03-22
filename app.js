const moonBtn = document.getElementById("moon");
const sunBtn = document.getElementById("sun");
const inp = document.getElementById("inp");
const searchBtn = document.getElementById("searchBtn");
const headerText = document.getElementById("headerText");
const wrapper = document.querySelector(".wrapper");
const modeColorText = document.getElementById("mode-color-text");
const searchContent = document.querySelector(".search-content");
const modeBox = document.querySelector(".mode-box");
const h4Content = document.querySelectorAll("h4");
const userDataBox = document.querySelector(".user-data");
const userName = document.getElementById("name");
const login = document.getElementById("login");
const joinDate = document.getElementById("joinDate");
const userFollowersBox = document.querySelector(".user-followers-box");
const repos = document.getElementById("repos");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const address = document.getElementById("address");
const twitter = document.getElementById("twitter");
const url = document.getElementById("url");
const officeBuilding = document.getElementById("officeBuilding");
const bio = document.getElementById("bio");
const img = document.querySelectorAll("#img");
const locations = document.querySelectorAll("#locations");

// dark mode functions
moonBtn.addEventListener("click", changeMode);
sunBtn.addEventListener("click", changeMode);

let isDarkMode = false;

const arr = [repos, followers, following];

function changeMode() {
  isDarkMode = !isDarkMode;

  if (isDarkMode) {
    sunBtn.style.display = "block";
    moonBtn.style.display = "none";
    headerText.style.color = "#FFFFFF";
    wrapper.style.backgroundColor = "#141D2F";
    modeColorText.style.color = "#FFFFFF";
    modeColorText.textContent = "LIGHT";
    searchContent.style.backgroundColor = "#1E2A47";
    inp.style.backgroundColor = "rgb(30, 42, 71)";
    inp.style.color = "#FFFFFF";
    userDataBox.style.backgroundColor = "#1E2A47";
    userName.style.color = "#FFFFFF";
    userFollowersBox.style.backgroundColor = "#141D2F";
    h4Content.forEach((item) => {
      item.style.color = "#FFFFFF";
    });
    arr.forEach((color) => {
      color.style.color = "#FFFFFF";
    });
    locations.forEach((color) => {
      color.style.fill = "#FFFFFF";
    });
  } else {
    moonBtn.style.display = "block";
    sunBtn.style.display = "none";
    headerText.style.color = "";
    wrapper.style.backgroundColor = "";
    modeColorText.style.color = "";
    modeColorText.textContent = "DARK";
    searchContent.style.backgroundColor = "";
    inp.style.backgroundColor = "";
    inp.style.color = "";
    userDataBox.style.backgroundColor = "";
    userName.style.color = "#2B3442";
    userFollowersBox.style.backgroundColor = "";
    h4Content.forEach((item) => {
      item.style.color = "#4B6A9B";
    });
    arr.forEach((color) => {
      color.style.color = "#2B3442";
    });
    locations.forEach((color) => {
      color.style.fill = "";
    });
  }
}

// search click function

searchBtn.addEventListener("click", () => {
  getData();
});

// fetch system

const getData = async () => {
  const url = `https://api.github.com/users/${inp.value}`;
  try {
    // working for loader
    // loader(true);
    const res = await fetch(url);

    // if logic to response is not ok
    if (!res.ok) {
      throw new Error(`Failed to fetch car data. Status: ${res.status}`);
    }

    const data = await res.json();

    // get all info and display in innerHTML
    img.forEach((image) => {
      image.src = data.avatar_url;
    });
    userName.innerHTML = data.name;
    login.innerHTML = `@${data.login}`;
    joinDate.innerHTML = data.created_at;

    repos.innerHTML =
      data.public_repos === "" || data.public_repos === null
        ? "0"
        : data.public_repos;

    followers.innerHTML =
      data.followers === "" || data.followers === null ? "0" : data.followers;

    following.innerHTML =
      data.following === "" || data.following === null ? "0" : data.following;

    officeBuilding.innerHTML =
      data.company === "" || data.company === null
        ? "no company"
        : data.company;

    url.innerHTML =
      data.twitter_username === "" || data.twitter_username === null
        ? "This profile has no url "
        : data.twitter_username;

    twitter.innerHTML =
      data.twitter_username === "" || data.twitter_username === null
        ? "Not Available "
        : `@${data.twitter_username}`;

    bio.innerHTML =
      data.bio === "" || data.bio === null
        ? "This profile has no bio"
        : data.bio;

    address.innerHTML =
      data.location === "" || data.location === null
        ? "no location"
        : data.location;

    inp.value = "";

    //
  } catch (error) {
    // userDataBox.innerHTML = `<h1>${error}<h1/>`;
    searchBtn.textContent = "No Result";
    searchBtn.style.color = "red";
    searchContent.classList.add("inpRedLine");
  }
};

// loader

function loader(load) {
  if (load) {
    userDataBox.innerHTML = "<img src=https://i.gifer.com/ZKZg.gif />";
  }
}

// searchContent border color For more beauty

inp.addEventListener("input", (e) => {
  if (e.target.value === "" || e.target.value === null) {
    searchContent.classList.remove("inpGreenLine");
    searchContent.classList.add("inpRedLine");
  } else if (e.target.value !== "") {
    searchContent.classList.add("inpGreenLine");
    searchContent.classList.remove("inpRedLine");
    searchBtn.textContent = "Search";
    searchBtn.style.color = "#FFFFFF";
  }
});
