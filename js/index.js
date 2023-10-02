async function loadUsersAndTweets() {
  try {
    const usersResponse = await fetch(
      'https://jsonplaceholder.typicode.com/users/'
    );
    const postsResponse = await fetch(
      'https://jsonplaceholder.typicode.com/posts/'
    );

    const users = await usersResponse.json();
    const posts = await postsResponse.json();

    displayUsersWithFirstTweet(users, posts);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function getUserProfileImageNumber(userId) {
  return (userId % 9) + 1;
}
function displayUsersWithFirstTweet(users, posts) {
  const tweetsContainer = document.querySelector('.center-content');

  users.forEach((user) => {
    const userFirstPost = posts.find((post) => post.userId === user.id);

    const profileImageNumber = getUserProfileImageNumber(user.id);
    const imageUrl = `./assets/profile${profileImageNumber}.jpg`;

    if (userFirstPost) {
      const tweetHTML = `
                <div class="tweets">
                    <div class="user-pics" onclick="showUserProfile(${user.id})">
                        <img src="${imageUrl}" alt="${user.name}" />
                    </div>
                    <div class="container user-content-box">
                        <div class="row align-items-center">
                            <div class="col-auto user-names">
                            <p class="full-name" onclick="showUserProfile(${user.id})">${user.name}</p>
                            </div>
                            <div class="col-auto">
                            <p class="user-name" onclick="showUserProfile(${user.id})">@${user.username}</p>
                            </div>
                            <div class="col-auto">
                                <p class="time">· 1hr</p>
                            </div>
                            <div class="col d-flex justify-content-end">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                        <div class="row user-content">
                            <div class="col">
                                <p>${userFirstPost.title}</p>
                            </div>
                        </div>
                        <div class="row container-icons">
                            <div class="col content-icons">
                                <i class="far fa-comment blue"></i>
                                <i class="fas fa-retweet green"></i>
                                <i class="far fa-heart red"> </i>
                                <i class="fas fa-chart-bar blue"></i>
                                <i class="fa-solid fa-arrow-up-from-bracket blue"></i>
                            </div>
                        </div>
                    </div>
                </div>
            `;

      tweetsContainer.insertAdjacentHTML('beforeend', tweetHTML);
    }
  });
}

async function showUserProfile(userId) {
  try {
    const userResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const userPostsResponse = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );

    const user = await userResponse.json();
    const userPosts = await userPostsResponse.json();

    displayUserProfile(user, userPosts);
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }
}

function displayUserProfile(user, posts) {
  const centerContent = document.querySelector('.center-content');
  centerContent.innerHTML = '';

  const profileImageNumber = getUserProfileImageNumber(user.id);
  const imageUrl = `./assets/profile${profileImageNumber}.jpg`;

  let userProfileHTML = `
        <div class="user-profile-header">
            <img src="${imageUrl}" alt="${user.name}" />
            <h2>${user.name}</h2>
            <p>@${user.username}</p>
            <a href="index.html" class="btn btn-primary m-2">Ir al Inicio</a>
        </div>
    `;

  posts.forEach((post) => {
    userProfileHTML += `
            <div class="tweets">
                    <div class="user-pics">
                    <img src="${imageUrl}" alt="${user.name}" />
                    </div>
                    <div class="container user-content-box">
                        <div class="row align-items-center">
                            <div class="col-auto user-names">
                            <p class="full-name">${user.name}</p>
                            </div>
                            <div class="col-auto">
                            <p class="user-name">@${user.username}</p>
                            </div>
                            <div class="col-auto">
                                <p class="time">· 1hr</p>
                            </div>
                            <div class="col d-flex justify-content-end">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                        <div class="row user-content post-title-body">
                            <div class="col">
                                <p>${post.title}</p>
                            </div>
                            <div class="col">
                                <p>${post.body}</p>
                            </div>
                        </div>
                        <div class="row container-icons">
                            <div class="col content-icons">
                                <i class="far fa-comment blue"></i>
                                <i class="fas fa-retweet green"></i>
                                <i class="far fa-heart red"> </i>
                                <i class="fas fa-chart-bar blue"></i>
                                <i class="fa-solid fa-arrow-up-from-bracket blue"></i>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col mb-2">
                            <button class="btn btn-primary" onclick="showModal(${post.id}, '${user.email}', ${user.id})">Ver más</button>

                            </div>
                        </div>
                    </div>
                </div>
        `;
  });

  centerContent.innerHTML = userProfileHTML;
}

async function showModal(postId, userEmail, userId) {
  const post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  ).then((response) => response.json());

  const profileImageNumber = getUserProfileImageNumber(userId);
  const imageUrl = `./assets/profile${profileImageNumber}.jpg`;

  const modalHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="card">
                    <div class="card-image">
                        <img src="${imageUrl}" alt="${post.title}" />
                    </div>
                    <div class="card-info">
                        <h3 class="card-title"><span>${post.title}</span></h3>
                        <p class="card-description">
                            <span>${post.body}</span>
                        </p>
                        <p><strong>Email:</strong> ${userEmail}</p>
                    </div>
                </div>
                <div class="button-close">
                    <button class="btn btn-primary" onclick="closeModal()">Cerrar</button>
                </div>
            </div>
        </div>
    `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeModal() {
  const modalOverlay = document.querySelector('.modal-overlay');
  modalOverlay.remove();
}

document.addEventListener('DOMContentLoaded', loadUsersAndTweets);
