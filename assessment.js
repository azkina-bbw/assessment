'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

assessmentButton.addEventListener(
  'click',
  () => {
    //console.log('ボタンが押されました');
    const userName = userNameInput.value;
    /*
    if(userName.length === 0){
      //名前が空の時は処理を終了する
      return;
    }
    */
    // 名前が空の時は処理を終了する
    if(!userName) return;

    // 診断結果表示エリアの作成
    resultDivision.innerText = '';

    /*
    const heading = document.createElement('h3');
    heading.innerText = '診断結果';
    resultDivision.appendChild(heading);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivision.appendChild(paragraph);
    */
    // headerDivisionの作成
    const headerDivision = document.createElement('div');
    headerDivision.setAttribute('class', 'card-header text-bg-primary');
    headerDivision.innerText = '診断結果';
    
    // bodyDivisionの作成
    const bodyDivision = document.createElement('div');
    bodyDivision.setAttribute('class', 'card-body');
    
    const paragraph = document.createElement('p');
    paragraph.setAttribute('class', 'card-text');
    const result = assessment(userName);
    paragraph.innerText = result;
    bodyDivision.appendChild(paragraph);

    // resultDivisionにBootstrapのスタイルを適用する
    resultDivision.setAttribute('class', 'card');

    // headerDivisionとbodyDivisionをresultDivisionに差し込む
    resultDivision.appendChild(headerDivision);
    resultDivision.appendChild(bodyDivision);

    // ツイートエリアの作成
    tweetDivision.innerText = '';
    const anchor = document.createElement('a');
    const hrefValue =
      'https://x.com/intent/tweet?button_hashtag=' +
      encodeURIComponent('あなたのいいところ') +
      '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result)
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivision.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivision.appendChild(script);
  }
);

// Enterキーで診断する処理
userNameInput.addEventListener(
  'keydown',
  (event) => {
    if(event.code === 'Enter'){
      assessmentButton.dispatchEvent(new Event('click'));
    }
  }
)

const answers=[
  '###userName###の運勢は「大吉」です。###userName###のラッキーワードは「情報共有」です。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
  '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
  '###userName###の運勢は「末吉」です。###userName###が人にやさしくすることで成功を引き寄せられるでしょう。',
  '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
  '###userName###の運勢は「中吉」です。###userName###がしっかり声を出すことでチームワークが高まるでしょう。',
  '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
  '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
  '###userName###のいいところはその全てです。ありのままの###userName###自身がいいところなのです。',
  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function assessment(userName){
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode=0;
  for(let i=0; i<userName.length; i++){
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replaceAll('###userName###', userName);

  return result;
}

// テストを行う関数
function test(){
  console.log('診断結果の文章のテスト開始');
  //太郎
  console.log('太郎');
  console.assert(assessment('太郎') === '太郎の運勢は「末吉」です。太郎が人にやさしくすることで成功を引き寄せられるでしょう。', '診断結果の文言の特定の部分を名前に書き換える処理が正しくありません。'); 
  //二郎
  console.log('二郎');
  console.assert(assessment('二郎') === '二郎の運勢は「中吉」です。二郎がしっかり声を出すことでチームワークが高まるでしょう。', '診断結果の文言の特定の部分を名前に書き換える処理が正しくありません。'); 
  console.log('診断結果の文章のテスト終了');

  console.log('同じ名前なら、同じ結果を出力することのテスト開始');
  //太郎
  console.log('太郎2回目');
  console.assert(assessment('太郎') === assessment('太郎'), '診断結果の文言の特定の部分を名前に書き換える処理が正しくありません。'); 
  //二郎
  console.log('二郎2回目');
  console.assert(assessment('二郎') === assessment('二郎'), '診断結果の文言の特定の部分を名前に書き換える処理が正しくありません。'); 
  console.log('同じ名前なら、同じ結果を出力することのテスト終了');
}
// test();