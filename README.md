# WantsProject
(仮称)WantsProject / AngularとSpringBootの復習がてらSPAのポートフォリオ作成

家庭内で経費申請を行うアプリ。  
楽〇清算の承認者が嫁になるイメージ。  
ほしいものを申請すると、許可、拒否ができる。  
欲しいものリストは、Amazonや楽天などから取得することができる。  

## 各ファイルの在処
wants-project-api => SpringBootファイル  
wants-project-web => Angularファイル

## 概要等
open-jdk: 11  
angular-cli: 11

## 環境構築
wants-project-web => Angularのため、
```
$ ng serve
```
で`http://localhost:4200`が立ち上がります 

wants-project-api => 
* IDEがIntelliJの場合
`build.gradle`をrun  
* IDEがEclipseの場合
`build.gradle`をリフレッシュ  
その後、SpringBootアプリケーションを起動で、`http://localhost8080`が立ち上がります
 
**覚えたいもの** 
 - JWT認証(JSON Web Token)
 - SpringDataJDBC
 - Angularのライフサイクル
 - rxJSライブラリの利用方法
 - Dockerを用いたコンテナ管理
 - AWSでの運用
 
## 想定する機能
 - ログイン / ログアウト / 新規登録 
 - ほしいものリストの作成
 - 口座情報のアクセス
 etc...順次更新
