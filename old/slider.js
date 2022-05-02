/* 노드 준비 */
window.onload = function () {
  const kindWrap = document.querySelector('.kind_wrap');
  const slider = kindWrap.querySelector('.slider');
  const slideLis = slider.querySelectorAll('li');
  // const moveButton = kindWrap.querySelector('.arrow');
  const cloneA = slideLis[0].cloneNode(true);
  const cloneC = slideLis[slideLis.length - 1].cloneNode(true);
  slider.insertBefore(cloneC, slideLis[0]);
  slider.appendChild(cloneA);

  const moveButton = document.createElement('div');
  const prevButton = document.createElement('a');
  const nextButton = document.createElement('a');
  moveButton.className = 'arrow';
  prevButton.className = 'prev';
  nextButton.className = 'next';
  prevButton.href = '';
  nextButton.href = '';
  prevButton.textContent = '이전';
  nextButton.textContent = '다음';
  moveButton.appendChild(prevButton);
  moveButton.appendChild(nextButton);
  kindWrap.appendChild(moveButton);

  //주요 변수 초기화
  let moveDist = 0;
  let currentNum = 1;
  const speedTime = 500;

  //ul 넓이  계산해주기 (CSSOM 셋업)
  const slideCloneLis = slider.querySelectorAll('li');
  const liWidth = slideLis[0].clientWidth;
  const sliderWidth = liWidth * slideCloneLis.length;
  slider.style.width = `${sliderWidth}px`;
  moveDist = -liWidth;
  slider.style.left = `${moveDist}px`;
  slider.style.transition = `all ${speedTime}ms ease`;

  //리스너 설치하기
  moveButton.addEventListener('click', moveSlide);

  function moveSlide(e) {
    e.preventDefault();
    if (e.target.className === 'next') {
      move(-1);
      if (currentNum === slideCloneLis.length - 1) {
        setTimeout(() => {
          slider.style.transition = 'none';
          moveDist = -liWidth;
          slider.style.left = `${moveDist}px`;
          currentNum = 1;
        }, speedTime);
      }
    } else {
      move(1);
      if (currentNum === 0) {
        setTimeout(() => {
          slider.style.transition = 'none';
          moveDist = -liWidth * (slideCloneLis.length - 2);
          slider.style.left = `${moveDist}px`;
          currentNum = slideCloneLis.length - 2;
        }, speedTime);
      }
    }

    function move(direction) {
      currentNum += (-1 * direction);
      moveDist += liWidth * direction;
      slider.style.left = `${moveDist}px`;
      slider.style.transition = `all ${speedTime}ms ease`;
    }
  }
};