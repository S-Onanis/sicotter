// Firebaseの設定
const firebaseConfig = {
    apiKey: "AIzaSyBpsTYSJ-yxWghFMoxCooDlG_-0P9xxa50",
    authDomain: "fir-twitter-768f1.firebaseapp.com",
    projectId: "fir-twitter-768f1",
    storageBucket: "fir-twitter-768f1.appspot.com",
    messagingSenderId: "445298622184",
    appId: "1:445298622184:web:3fe1e8a9d9b1d00a6fd35d"
};

// Firebaseの初期化
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 投稿をFirebaseに保存
function sendTweet() {
  const username = document.getElementById("username").value;
  const tweetContent = document.getElementById("tweetContent").value;

  if (username && tweetContent) {
    // Firebaseに保存
    database.ref("tweets").push({
      username: username,
      content: tweetContent,
      timestamp: Date.now()
    });

    // フォームをクリア
    document.getElementById("tweetContent").value = "";
  }
}

// Firebaseからリアルタイムにツイートを取得して表示
const tweetContainer = document.getElementById("tweetContainer");

database.ref("tweets").on("child_added", function(snapshot) {
  const tweet = snapshot.val();
  const tweetElement = document.createElement("div");
  tweetElement.innerHTML = `<strong>${tweet.username}:</strong> ${tweet.content}`;
  tweetContainer.prepend(tweetElement);  // 新しいツイートを上に追加
});


// ツイートを表示する関数
function displayTweets() {
    db.collection("tweets").orderBy("timestamp", "desc").get().then(snapshot => {
        const tweetsContainer = document.getElementById("tweets");
        tweetsContainer.innerHTML = ""; // 現在のツイートをクリア
        snapshot.forEach(doc => {
            const tweet = doc.data();
            const tweetElement = document.createElement("div");
            tweetElement.classList.add("tweet");
            tweetElement.innerHTML = `<strong>${tweet.username}</strong>: ${tweet.content}`;
            tweetsContainer.appendChild(tweetElement);
        });
    });
}

// ツイートを追加する関数
document.getElementById("tweet-btn").addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const tweetContent = document.getElementById("tweet").value;

    db.collection("tweets").add({
        username: username,
        content: tweetContent,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        document.getElementById("tweet").value = ""; // フォームをクリア
        displayTweets(); // ツイートを再表示
    });
});

// ページロード時にツイートを表示
window.onload = displayTweets;
