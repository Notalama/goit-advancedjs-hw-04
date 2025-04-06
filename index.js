import{a as y,S as g,i as a}from"./assets/vendor-BH9GyP-n.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const p="49351847-475dcb2d908ee06e87d68c158",b="https://pixabay.com/api/";async function L(i,r=1){var t;const o=new URLSearchParams({key:p,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:r});try{return(await y.get(`${b}?${o}`)).data}catch(e){throw new Error(`HTTP error! Status: ${((t=e.response)==null?void 0:t.status)||"Unknown"}`)}}function w(){document.querySelector(".loader").classList.remove("is-hidden")}function S(){document.querySelector(".loader").classList.add("is-hidden")}function v(){const i=document.querySelector(".gallery");i&&(i.innerHTML="")}function P(i){const r=document.querySelector(".gallery");if(!r)return;const o=i.map(({webformatURL:t,largeImageURL:e,tags:s,likes:n,views:f,comments:m,downloads:h})=>`
      <li class="gallery-item">
        <a href="${e}" class="gallery-link">
          <div class="photo-card">
            <img src="${t}" alt="${s}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                ${n}
              </p>
              <p class="info-item">
                <b>Views</b>
                ${f}
              </p>
              <p class="info-item">
                <b>Comments</b>
                ${m}
              </p>
              <p class="info-item">
                <b>Downloads</b>
                ${h}
              </p>
            </div>
          </div>
        </a>
      </li>
    `).join("");r.insertAdjacentHTML("beforeend",o)}const $=document.getElementById("search-form"),l=document.querySelector(".load-more-btn");let q=new g(".gallery .gallery-link",{captionsData:"alt",captionDelay:250}),c=1,d="";$.addEventListener("submit",E);l.addEventListener("click",R);async function u(i,r,o=!1){l.classList.add("is-hidden"),w();try{o||v();const t=await L(i,r);if(t.hits.length===0){a.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}if(P(t.hits),q.refresh(),o){const{height:e}=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}return t.totalHits>r*15?l.classList.remove("is-hidden"):o&&a.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),t}catch(t){a.error({title:"Error",message:`An error occurred: ${t.message}`,position:"topRight"})}finally{S()}}async function E(i){i.preventDefault();const r=i.currentTarget,o=r.elements.searchQuery.value.trim();if(!o){a.error({title:"Error",message:"Please enter a search query",position:"topRight"});return}c=1,d=o,await u(o,c),r.reset()}async function R(){c+=1,await u(d,c,!0)}
//# sourceMappingURL=index.js.map
