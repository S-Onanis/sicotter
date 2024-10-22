// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpsTYSJ-yxWghFMoxCooDlG_-0P9xxa50",
  authDomain: "fir-twitter-768f1.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "fir-twitter-768f1",
  storageBucket: "fir-twitter-768f1.appspot.com",
  messagingSenderId: "445298622184",
  appId: "1:445298622184:web:3fe1e8a9d9b1d00a6fd35d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Function to send a tweet
function sendTweet() {
    const username = document.getElementById("username").value;
    const tweetContent = document.getElementById("tweetContent").value;

    if (username && tweetContent) {
        // Save tweet to Firebase
        database.ref("tweets").push({
            username: username,
            content: tweetContent,
            timestamp: Date.now()
        });

        // Clear tweet box
        document.getElementById("tweetContent").value = "";
    }
}

// Display tweets in real-time
const tweetContainer = document.getElementById("tweetContainer");

database.ref("tweets").orderByChild('timestamp').on("child_added", function(snapshot) {
    const tweet = snapshot.val();
    const tweetElement = document.createElement("div");
    tweetElement.classList.add("tweet");
    tweetElement.innerHTML = `<strong>${tweet.username}:</strong> ${tweet.content}`;
    tweetContainer.prepend(tweetElement); // New tweets appear at the top
});

