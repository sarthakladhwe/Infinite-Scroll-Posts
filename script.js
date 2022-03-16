const postContainer = document.getElementById('post-container')
const loading = document.querySelector('.loader')
const filter = document.getElementById('filter')

let limit = 10;
let page = 1;

// Fetch posts ffrom API
async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
    const data = await res.json();

    return data;
}

// Show posts in DOM
async function showPosts() {
    const posts = await getPosts();

    posts.forEach(post => {
        const postEl = document.createElement('div')
        postEl.classList.add('post')
        postEl.innerHTML = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">
                    ${post.title}
                </h2>
                <p class="post-body">
                    ${post.body}
                </p>
            </div>
        `;
        postContainer.appendChild(postEl);
    })
}

// Filter Posts by input
function filterPosts(event) {
    const term = event.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post')

    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if(title.includes(term) || body.includes(term)) {
            post.style.display = 'flex'
        } else {
            post.style.display = 'none'
        }
    })
}

//Show initial posts
showPosts()

//Show Loader and fetch more posts
function showLoading() {
    loading.classList.add('show')

    setTimeout(() => {
        loading.classList.remove('show')

        setTimeout(() => {
            page++;
            showPosts();
        },300)

    }, 1000)
}

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if(scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    }
})

// Event Listeners

filter.addEventListener('input', filterPosts)

