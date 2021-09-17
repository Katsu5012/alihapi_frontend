<template>
  <div>
    <header>
      <router-view />
      <ul>
        <li>
          <router-link :to="{ name: 'home' }" class="headerItem"
            ><v-icon
              name="home"
              class="icon"
            />ホーム&nbsp;&nbsp;&nbsp;</router-link
          >
        </li>
        <li>
          <router-link :to="{ name: 'login' }" class="headerItem"
            ><v-icon name="sign-in-alt" class="icon" />ログイン</router-link
          >
        </li>
        <li>
          <router-link :to="{ name: 'register' }" class="headerItem"
            ><v-icon name="user" class="icon" />初回登録</router-link
          >
        </li>
      </ul>
    </header>

    <body>
      <h1 class="title">ALiHaPi</h1>
      <p>今日のちょっと楽しかったことを共有するサイト</p>
<p>a</p>
      <h2>機能一覧</h2>
      <div class="Items">
        <div class="Item"></div>
        <div class="Item">
          <p>ユーザーの新規登録</p>
          <p>アカウント削除</p>
          <p>アイコンを画像で設定</p>
          <p>ログイン、ログアウト</p>
        </div>
        <div class="Item2">
          <p>ユーザー検索</p>
          <p>投稿、返信、投稿の削除</p>
          <p>いいね、いいね解除</p>
          <p>フォロー、フォロー解除</p>
        </div>
        <div class="Item"></div>
      </div>
      
    </body>
  </div>
</template>

<style scoped>
header {
  padding: 30px  10px;
  top: 0;
  width: 100%;
  background-color: #fff;
  display: flex;
  align-items: right;

  background-color: #50b7f5;
}
body{
  text-align: center;
margin:40px 0
}
ul {
  list-style: none;
  margin: 0;
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right:20px

}
li {
  margin: 0 0 0 15px;
  font-size: 14px;
  display: inline;
  border-left: #ddd 1px solid;
  color: white
}
header a{
  text-decoration: none;
}

.main {
  min-height: 100vh;
  display: flex;
  margin-top: 10px;
}

.headerItem {
  flex: 1;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  color:white
}

.headerItem:active {
  color: #e6ecf0;
  background: color #50b7f5;
}

.icon {
  padding-right: 20px;
  color:white
}
.message {
  text-align: center;
}
.Items {
  display: flex;
}
.Item {
  flex: 1;
}
.Item2 {
  flex: 1;
}
.title {
  color: #50b7f5;
  font-size: 60px;
  margin:40px 0 40px 0
}
</style>


