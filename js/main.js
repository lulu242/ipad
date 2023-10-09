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