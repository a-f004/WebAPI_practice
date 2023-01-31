'use strict';

const dogList = document.getElementById('container');
const btn = document.getElementById('addBtn');
const url = 'https://dog.ceo/api/breeds/image/random';
const options = {
  method: 'GET'
};

function fetchDog(url, options){
  return fetch(url, options)
  .then( response => response.json());
}

async function fetchDogImage(url, options){
  const DogImage = await fetchDog(url, options);
  return DogImage;
}

async function addDog(){
  for (var i = 0; i < 16; i++) {
    const newDog = await fetchDogImage(url, options);
    const dog = document.createElement('img');
    dog.src = newDog.message;
    dogList.appendChild(dog);
  }
}

// ページがロードされた時にaddDogを実行
window.addEventListener('load', addDog);
// <追加>ボタンがクリックされた時にaddDogを実行
btn.addEventListener('click', addDog);







// ここから下はアコーディオンUIのアニメーション


document.addEventListener("DOMContentLoaded", () => {
  setUpAccordion();
});


// ブラウザの標準機能(Web Animations API)を使ってアコーディオンのアニメーションを制御
const setUpAccordion = () => {
  const details = document.querySelectorAll(".js-details");
  const RUNNING_VALUE = "running"; 
  const IS_OPENED_CLASS = "is-opened";
  details.forEach((element) => {
    const summary = element.querySelector(".js-summary");
    const content = element.querySelector(".js-content");

    summary.addEventListener("click", (event) => {
      // デフォルトの挙動を無効化
      event.preventDefault();

      // 連打防止用。アニメーション中だったらクリックイベントを受け付けないでリターン
      if (element.dataset.animStatus === RUNNING_VALUE) {
        return;
      }

      // detailsのopen属性を判定
      if (element.open) {
        // アコーディオンを閉じるときの処理
        // アイコン操作用クラスを切り替える(クラスを取り除く)
        element.classList.toggle(IS_OPENED_CLASS);

        // アニメーションを実行
        const closingAnim = content.animate(closingAnimKeyframes(content), animTiming);
        // アニメーション実行中用の値を付与
        element.dataset.animStatus = RUNNING_VALUE;

        // アニメーションの完了後にopen属性を取り除く
        closingAnim.onfinish = () => {
          element.removeAttribute("open");
          // アニメーション実行中用の値を取り除く
          element.dataset.animStatus = "";
        };
      } else {
        // アコーディオンを開くときの処理
        // open属性を付与
        element.setAttribute("open", "true");

        // アイコン操作用クラスを切り替える(クラスを付与)
        element.classList.toggle(IS_OPENED_CLASS);

        // アニメーションを実行
        const openingAnim = content.animate(openingAnimKeyframes(content), animTiming);
        // アニメーション実行中用の値を入れる
        element.dataset.animStatus = RUNNING_VALUE;

        // アニメーション完了後にアニメーション実行中用の値を取り除く
        openingAnim.onfinish = () => {
          element.dataset.animStatus = "";
        };
      }
    });
  });
}


// アニメーションの時間設定
const animTiming = {
  duration: 400,
  easing: "ease-out"
};

// アコーディオンを閉じるときのキーフレーム
const closingAnimKeyframes = (content) => [
  {
    height: content.offsetHeight + 'px', 
    opacity: 1,
  }, {
    height: 0,
    opacity: 0,
  }
];

// アコーディオンを開くときのキーフレーム
const openingAnimKeyframes = (content) => [
  {
    height: 0,
    opacity: 0,
  }, {
    height: content.offsetHeight + 'px',
    opacity: 1,
  }
];










