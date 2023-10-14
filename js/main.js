import ipads from '../data/ipads.js'

// 장바구니
const basketStarterEl = document.querySelector('header .basket-starter')
const basketEl = basketStarterEl.querySelector('.basket')

basketStarterEl.addEventListener('click', (event) => {
  event.stopPropagation() // 이번트 버블링 정지 - 윈도우까지 버블링되어 닫히지 않게
  if(basketEl.classList.contains('show')) {
    hideBasket()
  } else {
    showBasket()
  }
})

// 이벤트 버블링 정지 - 드롭다운 영역 클릭 시 닫히지 않게 
basketEl.addEventListener('click', (e) => {
  e.stopPropagation()
})
// 화면 전체를 클릭했을 때 메뉴가 사라짐.
window.addEventListener('click', (e) => {
  hideBasket()
})

// 반복 로직을 직관적인 함수이름으로 묶어주기
function showBasket() {
  basketEl.classList.add('show')
}
function hideBasket() {
  basketEl.classList.remove('show')
}

// 헤더 검색창
const headerEl = document.querySelector('header')
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')]
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchShadowEl = searchWrapEl.querySelector('.shadow')
const searchInputEl = searchWrapEl.querySelector('input')
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]
const duration = .4 // 초(seconds) 단위, 시간을 변수에 저장해서 사용하면 쉽게 관리 용이

searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', event => {
  event.stopPropagation() // 데스크탑 레이아웃에서 클릭 이벤트가 버블링되어, 모바일 레이아웃에서 searchTextFieldEl가 클릭된 상태로 변하는 것을 방지
  hideSearch()
})
searchShadowEl.addEventListener('click', hideSearch)

function showSearch() {
  headerEl.classList.add('searching')
  stopScroll()
  headerMenuEls.reverse().forEach((el, index) => {
    el.style.transitionDelay = `${index * duration / headerMenuEls.length}s` // 순서 * 지연 시간 / 애니메이션할 요소 개수
  })
  // .reverse() 사용하지 않고 원래 순서대로 반복 처리.
  searchDelayEls.forEach((el, index) => {
    el.style.transitionDelay = `${index * duration / searchDelayEls.length}s`
  })
  // 검색 인풋 요소가 나타난 후 동작!
  setTimeout(() => {
    searchInputEl.focus()
  }, 600);
}
function hideSearch() {
  headerEl.classList.remove('searching')
  playScroll()
  headerMenuEls.reverse().forEach((el, index) => {
    el.style.transitionDelay = `${index * duration / headerMenuEls.length}s`
  })
  searchDelayEls.reverse().forEach((el, index) => {
    el.style.transitionDelay = `${index * duration / searchDelayEls.length}s`
  })
  searchDelayEls.reverse() // 나타날 때 원래의 순서대로 처리해야 하기 때문에 다시 뒤집어서 순서 돌려놓기!
  searchInputEl.value = '' // 입력값 초기화
}
function playScroll() {
    // documentElement is <html>
  document.documentElement.classList.remove('fixed')
}
function stopScroll() {
  document.documentElement.classList.add('fixed')
}

// 비디오 재생 
const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click', () => {
  video.play() //비디오 태그는 play, pause로 재생조절 가능
  playBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
})
pauseBtn.addEventListener('click', () => {
  video.play()
  playBtn.classList.remove('hide')
  pauseBtn.classList.add('hide')
})

// 요소의 가시성 관찰 로직(어떤 요소가 화면에 나오고 들어가는지)
//Intersection(교차)Observer(관찰): 화면 나가거나 들어올 때마다 콜백함수실행
// 관찰요소가 교차범위 변화가 있으면 안으로 들어오는 나가는지 확인해 show 클래스 붙여줌
//target은 관찰 대상이고, isIntersecting이 T면 화면 안, F면 화면 밖
const io = new IntersectionObserver(entries => {
  // entries는 `io.observe(el)`로 등록된 모든 관찰 대상 배열.
  entries.forEach(entry => {
    // 사라질 때.
    if (!entry.isIntersecting) {
      return
    }
    entry.target.classList.add('show')
  })
})
// 관찰할 요소들 검색
const infoEls = document.querySelectorAll('.info')
// 관찰 시작 IntersectionObserver.observe() 메서드는 주시대상 목록에 요소를 추가한다
infoEls.forEach(el => io.observe(el))

// '당신에게 맞는 iPad는?' 색상목록 추가
const itemsEl = document.querySelector('section.compare .items')
ipads.forEach(ipad => {
  // div 생성 및 class 추가
  const itemEl = document.createElement('div')
  itemEl.classList.add('item')

  // 색상 li 생성
  let colorList = ''
  ipad.colors.forEach(color => {
    colorList += `<li style="background-color: ${color};"></li>`
  })

  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p> 
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `
  // items의 자식으로 item추가
  itemsEl.append(itemEl)
})