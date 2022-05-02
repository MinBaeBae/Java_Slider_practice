function kSlider(target, option) {
  const toBeLoaded = document.querySelectorAll(`${target} img`);
  if (toBeLoaded.length === 0) {
    throw new Error(target + ' 라는 노드를 찾지 못했습니다.');
  }
  let loadedImages = 0;
  toBeLoaded.forEach((item) => {
    item.onload = () => {
      loadedImages += 1;
      if (loadedImages === toBeLoaded.length) {
        run(target, option);
      }
    }
  })
} // 로드준비
function run(target, option) {
  const OPTION = setOption(option);
  setNode(target);
  setSliding(target, OPTION);
} // 준비시키기
function setOption(option) {
  // 항목점검
  let OPTION = {
    speed : 1000,
    direction: 'horizontal'
  }
  for (prop in option) {
    if (prop in OPTION) {
      // 값점검
      exception(prop, option[prop]);
      // 값셋팅
      OPTION[prop] = option[prop];
    } else {
      throw new Error(`사용할 수 없는 옵션입니다.`);
    }
  }
  function exception(prop, value) {
    switch (prop) {
      case 'speed':
        if (value > 0) break;
      case 'direction':
        if (value === 'horizontal' ||
            value === 'vertical') break;
      default:
        throw new Error(`사용할 수 없는 값입니다.`);
    }
  }
  return Object.freeze(OPTION);

} // 옵션준비
function setNode(target) {
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
} // 노드준비

function setSliding(target, OPTION) {
  /* 주요 변수 초기화 */
  let moveDist = 0;
  let currentNum = 1;

  /* 클론포함 셋팅 */
  const slider = document.querySelector(target);
  const slideCloneItems = slider.querySelectorAll('.k_item');
  const moveButton = document.querySelector('.arrow');

  /* 클론포함 넓이 셋팅 */
  const liWidth = slideCloneItems[0].clientWidth;
  const sliderWidth = liWidth * slideCloneItems.length;
  slider.style.width = `${sliderWidth}px` ;

  /* 처음위치 잡기 */
  moveDist = -liWidth;
  slider.style.left = `${moveDist}px`;
  const POS = {moveDist, liWidth, currentNum};

  /* 이벤트 리스너 걸기 */
  moveButton.addEventListener('click', ev => {
    sliding(ev, OPTION, target, POS );
  });

} // 동작준비
function sliding(ev, OPTION, target, POS) {
  ev.preventDefault();
  const slider = document.querySelector(target);
  const slideCloneItems = slider.querySelectorAll('.k_item');
  if (ev.target.className === 'next') {// 다음이 눌렸을때
    move(-1);
    if (POS.currentNum === slideCloneItems.length - 1) {// 마지막이면
      setTimeout(() => {
        slider.style.transition = 'none'; // 애니끄고
        POS.moveDist = -POS.liWidth; // 진짜A의 값으로 만들고
        slider.style.left = `${POS.moveDist}px`; //진짜A의 위치로 보내고
        POS.currentNum = 1; // 현재번호 업데이트
      }, OPTION.speed );
    }
  } else { // 이전이 눌렸을때
    move(1);
    if (POS.currentNum === 0) {
      setTimeout(() => {
        slider.style.transition = 'none';
        POS.moveDist = -POS.liWidth * (slideCloneItems.length - 2);
        slider.style.left = `${POS.moveDist}px`;
        POS.currentNum = slideCloneItems.length - 2;
      }, OPTION.speed);
    }
  } 
  function move(direction) { // 이동 <-   ->
    POS.currentNum += (-1 * direction);
    POS.moveDist += POS.liWidth * direction;
    slider.style.left = `${POS.moveDist}px`;
    slider.style.transition = `all ${OPTION.speed}ms ease`;
  }
} // 동작
