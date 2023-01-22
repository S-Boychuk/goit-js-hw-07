import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryEl = document.querySelector(".gallery");
const galleryContent = createGallery(galleryItems);

galleryEl.insertAdjacentHTML("beforeend", galleryContent);

galleryEl.addEventListener("click", onGalleryElClick);

function createGallery(galleryItems) {
	return galleryItems
		.map(({ preview, original, description }) => {
			return `
      <div class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
      </div>
      `;
	})
	.join("");
}

function onGalleryElClick(event) {
	event.preventDefault();

	if (!event.target.classList.contains("gallery__image")) {
		return;
	}

	const instance = basicLightbox.create(
		`<img src="${event.target.dataset.source}" width="1280" height="auto">`,
		{
			onShow: () => window.addEventListener("keydown", onEsc),
			onClose: () => window.removeEventListener("keydown", onEsc),
		}
	);

	function onEsc(event) {
		if (event.code === "Escape") {
			instance.close();
		}
	}

	instance.show();
}
