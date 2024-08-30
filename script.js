let getFetchData = []; //関数で環境変数の代わりをしてもよいが、このように環境変数を設定して行う方法もある。
let msgData = "";

fetch("https://jsonplaceholder.typicode.com/posts").then((res)=> res.json()).then((data)=> {
  getFetchData = data;
  msgData = "data ok";
}).catch((error)=> {
  console.error(error);
  msgData = "data ng";
});

window.addEventListener("DOMContentLoaded", function() {
  const msg = document.getElementById("msg");
  const disp = document.getElementById("disp");
  const inputEle = document.getElementById("query");
  msg.innerHTML = "";
  disp.innerHTML = "ロード中・・・";
  function handlePostDisp() {
    disp.innerHTML = "";
    if (getFetchData) {
      msgData = "data found!!";
      const filterData = getFetchData.filter((item)=>item.body.includes(inputEle.value));
      let isFirst = true;
      let result = [];
      if (filterData.length > 0) {
        isFirst = false;
        result = filterData;
      } else {
        const postData = isFirst ? filterData : getFetchData;
        if (postData.length > 0) {
          result = postData;
        } else {
          result = [];
          disp.innerHTML = '<p style="background: #fff; padding: 10px;">no post.</p>';
          msgData = "post not found.";
        }
      } // filterDataの値で真偽を判定したなら内容の長さで判断するのが良い、今回の場合だと、[]の配列があり事実上真が帰ってくるため期待した動作にならないということです。
      if (result) {
        result.map(function(postInfo) {
          console.log(
            /* 今日の学び　\n は文字列として追加する必要がある、あの一言言わせてください、独学じゃそういうものです。お金はらって専門学校言ってる方にはわからないかもしれませんが独学はそういうものです。 */
            postInfo.userId + "\n" +
            postInfo.title + "\n" +
            postInfo.body
          );
          disp.innerHTML += 
            "<div>" + 
              "ユーザーID：" + postInfo.userId + "<br />" +
              "タイトル：" + postInfo.title + "<br />" +
              "投稿：" + postInfo.body +
            "</div>"
          ; // なんとなくわかるがメモ、innerHTMLとtextContentは、HTMLを書くならinerHTMLで書かないとHTMLにならない。
        });
      }
    } else {
      msgData = "data not found.";
    }
  }
  setTimeout(()=> {
    handlePostDisp();
  }, 1100);
  inputEle.addEventListener("input", function() {
    handlePostDisp();
  });
  setInterval(()=> {
    console.log("system msg：" + msgData);
    msg.innerHTML = "system msg：" + msgData;
  }, 1000);
});
