# Node, React 기초
### 기능
- 회원가입시 mongoDB에 저장 및 암호화
- 로그인 후 Auth 인증 완료

`React`,`Node.js`,`MongoDB`

**npm init**
-> package.json 설치 및 npm 환경 세팅

**npm express --save**
-> spring boot처럼 쓰이는 node 프레임워크

**npm install mongoose --save**
-> MongoDB 편하게 쓰는 툴

**npm install body-parser --save**
-> clien에서 보내준 데이터를 처리하기 위한 도구

**npm install nodemon --save-dev**
-> 서버 껐다 키지 않아도 코드 변화 감지해서 자동으로 업데이트해주는 친구

**npm install bcrypt --save**
-> 데이터베이스 암호화

**npm install jsonwebtoken --save**
-> 이메일과 비밀번호가 일치할 시 생성할 토큰 라이브러리

**Body-parser 기능**

- 클라이언트에서 보내주는 데이터를 받음

**Auth 기능**

- 페이지 이동 때마다 로그인 되었는지 안되어있는지, 관리자 유저인지 등을 체크
- 글을 쓸대나 지울 때 권한이 있는지 등 체크

**npm install http-proxy-middleware --save**

> proxy 사용 <br>
> proxy란 IP를 proxy server에서 임의로 변경하여 보안을 향상 시킨다, 어떤 사이트를 들어가지 못하게 막는 기능도 있음 <br>
> 방화벽 기능, 웹 필터 기능, 캐쉬 데이터 공유 데이터 제공 기능

**npm install concurrently --save**
-> 서버와 클라이언트를 동시에 켜줌

## Redux

다운 받아야 할 Dependency들

- redux
- react-redux
- redux-promis
- redux-thunk

**Props**<br>

> - shorthand for properties 프로퍼티의 줄임말로 컴포넌트 간에 정보를 전달할때 사용
> - 컴포넌트가 부모 자식 관계일때만 사용
> - 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하면 그 데이터는 바뀔 수 없다.

<br>

**State**<br>

> - 부모 자식 컴포넌트 사이에서 데이터를 보내는 것이 아닌 한 컴포넌트 안에서 데이터를 전달할때 사용
> - 안에서 값이 바뀔 수 있음
> - State이 변하면 re-render 된다.

<br>

**Redux**는 State를 관리해주는 툴 <br>

상위 컴포넌트에서 Comments에 대한 관리를 하고 있고 그 컴포넌트의 자식 컴포넌트들도 Comments에 대한 관리를 하고 있을때 자식 컴포넌트에서 어떤 Action을 취했을때 하나 하나 거슬러 올라가면서 부모 컴포넌트에 알려야한다. 마찬가지로 부모 컴포넌트에서 하나 변경되면 하나하나 내려가면서 모든 컴포넌트에 알려야한다.<br>

**Redex**는 그런 작업들을 쉽게 해준다. Redux Store라는 것을 컴포넌트들 밖에 놓고 컴포넌트들 중 하나가 변경이 되면 바로 Store에 알려주면서 일을 쉽고 빠르게 해준다 <br>
일 진행 방향은 Component -> Action -> Reducer -> Store -> Component 이며 한방향이다.

<br>

**HOC**

> 인증이 이뤄져야 들어갈수 있는 페이지들이 있는데 이런 인증을 통제하는 Component
