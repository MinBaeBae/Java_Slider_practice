function kSlider(target, option) {
  const toBeLoaded = document.querySelectorAll(`${target} img`);
  if (toBeLoaded.length === 0) {
    throw new Error(target + ' 라는 노드를 찾지 못했습니다.');
  }
  console.log(toBeLoaded);

  let loadedImages = 0;
  toBeLoaded.forEach((item) => {
    item.onload = () => {
      loadedImages += 1;
      if (loadedImages === toBeLoaded.length) {
        innerName(target, option);
      }
    }
  })




  

  // 이미지만 로드를 확인해서 innerName()실행해주기

  function innerName(target, option) {

    /* 노드 준비 */
    const slider = document.querySelector(target); // 주인공찾고
    console.dir(slider)
    const kindWrap = document.createElement('div'); // 만들고
    const kindSlider = document.createElement('div'); // 만들고
    slider.classList.add('k_list');// 셋팅하고
    kindWrap.className = 'kind_wrap';// 셋팅하고
    kindSlider.className = 'kind_slider';// 셋팅하고
    slider.parentNode.insertBefore(kindWrap, slider); // 붙이고
    kindWrap.appendChild(kindSlider);// 붙이고
    kindSlider.appendChild(slider);// 붙이고
    const slideItems = slider.children;
    for (let i=0; i < slideItems.length; i++) {
      slideItems[i].className = 'k_item';
    }
    const cloneA = slideItems[0].cloneNode(true);
    const cloneC = slideItems[slideItems.length-1].cloneNode(true);
    slider.insertBefore(cloneC, slideItems[0]);
    slider.appendChild(cloneA);
    const moveButton = document.createElement('div');
    const prevA = document.createElement('a');
    const nextA = document.createElement('a');
    moveButton.className = 'arrow';
    prevA.className = 'prev';
    nextA.className = 'next';
    prevA.href = '';
    nextA.href = '';
    prevA.textContent = '이전';
    nextA.textContent = '다음';
    moveButton.appendChild(prevA);
    moveButton.appendChild(nextA);
    kindWrap.appendChild(moveButton);

    /* 옵션셋팅 */
    const OPTION = (function(opt) { // 옵션셋팅
      const OPT = {...opt};
      if (OPT.speed < 0) { // 에러점검
        throw new Error('0이상 값을 넣으세요.');
      } else {
        return Object.freeze(OPT);
      }
    })(option);

    /* 주요 변수 초기화 */
    let moveDist = 0;
    let currentNum = 1;
    // const speedTime = OPTION.speed; 

    /* CSSOM 셋업 */
    const slideCloneItems = slider.querySelectorAll('.k_item');
    const liWidth = slideItems[0].clientWidth;
    const sliderWidth = liWidth * slideCloneItems.length;
    slider.style.width = `${sliderWidth}px` ;
    moveDist = -liWidth;
    slider.style.left = `${moveDist}px`;
    

    /* 리스너 설치하기 */
    moveButton.addEventListener('click', moveSlide);

    function moveSlide(ev) {
      ev.preventDefault();
      console.log(ev.target.className);
      if (ev.target.className === 'next') {// 다음이 눌렸을때
        move(-1);
        if (currentNum === slideCloneItems.length - 1) {// 마지막이면
          setTimeout(() => {
            slider.style.transition = 'none'; // 애니끄고
            moveDist = -liWidth; // 진짜A의 값으로 만들고
            slider.style.left = `${moveDist}px`; //진짜A의 위치로 보내고
            currentNum = 1; // 현재번호 업데이트
          }, OPTION.speed );
        }
      } else { // 이전이 눌렸을때
        move(1);
        if (currentNum === 0) {
          setTimeout(() => {
            slider.style.transition = 'none';
            moveDist = -liWidth * (slideCloneItems.length - 2);
            slider.style.left = `${moveDist}px`;
            currentNum = slideCloneItems.length - 2;
          }, OPTION.speed);
        }
      } 
      function move(direction) { // 이동 <-   ->
        currentNum += (-1 * direction);
        moveDist += liWidth * direction;
        slider.style.left = `${moveDist}px`;
        slider.style.transition = `all ${OPTION.speed}ms ease`;
      }
    }

  }
} // end


1. 로드준비()
2. innerName() - 로드를 제외한 모든 프로세스
    1. 노드준비
    2. 옵션처리
    3. 동작준비
    4. 동작()

1. 로드준비()
2. 옵션준비()
3. 노드준비()
4. 동작준비()
5. 동작()