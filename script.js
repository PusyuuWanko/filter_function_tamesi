let getFetchData = [];
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
      let result = filterData.length > 0 ? filterData : getFetchData;
      if (result) {
        result.map(function(postInfo) {
          console.log(
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
          ;           
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
    console.log(msgData);
    msg.innerHTML = msgData;
  }, 1000);
});
