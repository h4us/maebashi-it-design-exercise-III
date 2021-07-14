# WebRTC Broadcast User Screen

ごくシンプルなシグナリング処理のみを実装したWebRTC経由でユーザーのスクリーンをブロードキャストするサンプルです。

ページの内容は[codesanfbox.ioのこのサンプル](https://codesandbox.io/s/20210628-examples-52o8x?file=/4-input-and-delay.js)と同じp5.jsを使ったものです。

> Basic ideas and WebRTC signaling methods come from [this article](https://gabrieltanner.org/blog/webrtc-video-broadcast).

## セットアップと実行

シグナリング処理のためにNode.jsのサーバーを動かす必要があります。

このサンプルを試すには各自Node.jsをインストールしてください

macOSであればターミナル、WindowsであればPowershellなどのコマンドラインインターフェースから下記を実行します

```bash
# 依存モジュールのインストール
npm install

# サーバーの起動
npm run start

# もしくは下記でも実行可能です
node server.js
```

ウェブブラウザから

    http://0.0.0.0:4000/broadcast-screen.html

を開くと、画面共有するソースを聞かれるので、画面全体「以外」を選択してください（画面全体だとビューワー側で描画されない場合があります）

同じコンピューターの別のウェブブラウザ、同一ネットワークにいる別のコンピューターやスマートフォンのウェブブラウザから

    http://{broadcast-screenを開いているコンピューターのIPアドレス}:4000/

にアクセスすることで、同じ画面を見ることができます。

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details
