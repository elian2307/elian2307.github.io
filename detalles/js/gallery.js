const mainImg = document.getElementById('main-product-img');
const thumbs = document.querySelectorAll('.thumb');

thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    mainImg.src = thumb.src.replace('thumbs/', '');
    thumbs.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
  });
});