let quantity = document.getElementById('quantity');
document.getElementById('increase').addEventListener('click', () => {
    if (parseInt(quantity.value) < 15)
    quantity.value = parseInt(quantity.value) + 1;
});
document.getElementById('decrease').addEventListener('click', () => {
    if (parseInt(quantity.value) > 1) {
        quantity.value = parseInt(quantity.value) - 1;
    }
});

let mainImg = document.getElementById('main-product-img');
let thumbs = document.querySelectorAll('.thumb');
for (let i = 0; i < thumbs.length; i++) {
    thumbs[i].addEventListener('click', () => {
        tempSrc = thumbs[i].src;
        tempSrc = tempSrc.replace('thumbs', '');
        mainImg.src = tempSrc;
        thumbs[i].classList.add('active');
        for (let j = 0; j < thumbs.length; j++) {
            if (j !== i) {
                thumbs[j].classList.remove('active');
            }}
    });
}

const sizeBtn = document.querySelectorAll('.size-btn');
sizeBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        sizeBtn.forEach((button) => button.classList.remove('active'));
        btn.classList.add('active');
        if (btn.id === 'small-size'){
            document.querySelector('.price .old').style.display = 'none';
            document.querySelector('.price .discount').style.display = 'none';
            document.querySelector('.price .current').textContent = '$15.00';

        }
        if (btn.id === 'large-size'){
            document.querySelector('.price .old').style.display = 'inline';
            document.querySelector('.price .discount').style.display = 'inline';
            document.querySelector('.price .current').textContent = '$16.00';
        }
        
    })});