# article-clustering
연재기사 반자동 클러스터링



## Installation Guide

```
λ yarn install
λ yarn dev
```

만약 `yarn install` 명령이 koalanlp를 제대로 설치하지 못한다면 다음 섹션을 참고하도록 하자.

### Installation of koalanlp for Windows users

윈도우에서 koalanlp를 설치하는 것은 매우매우매우 어렵다. Koalanlp를 설치하기 위해서는 8버전 이상의 Java가, 그러니까 JDK 뿐만 아니라 node에서 Java를 쓸 수 있게 해주는 패키지 [Java](https://www.npmjs.com/package/java)가 설치돼있어야 한다. 그런데 이 친구의 설치를 위해서는 [node-gyp](https://www.npmjs.com/package/node-gyp)라는 빌드툴이 필요하다. node-gyp를 쓰기 위해서는 2버전의 파이썬이 필요하다. 이를 위해 2버전의 파이썬을 꼭 설치할 필요는 없다. [windows-build-tools](https://www.npmjs.com/package/windows-build-tools)라는 대안이 존재하기 때문이다.

1. windows-build-tools 설치

    * npm을 사용한다면 관리자권한의 powershell으로 설치해야 한다.

    * yarn을 사용한다면 powershell이 필요없다.

        ```
        yarn global add windows-build-tools
        ```

2. Java 설치

    * 우선 오라클 홈페이지에 들어가서 8버전 이상의 JDK를 설치하자.

    * yarn을 이용해 Java 패키지를 설치하자.

        ```
        yarn add java --save
        ```

3. koalanlp 설치

    * yarn을 이용해 설치한다.

        ```
        yarn add koalanlp --save
        ```

4. koalanlp 사용시도

    * Java가 잘 설치됐다면 node가 koalanlp.initialize를 찾을 수 있을 것이다.

        ```
        λ node
        > const k = require('koalanlp');
        > console.log(k.initialize);
        [Function: initialize]
        ```

        한 번에 위와 같이 잘 출력된다면, 당신이 지금까지 쌓아온 덕행에 하늘이 축복을 내린 것이다.

5. Java 패키지 문제 해결 2 - `postInstall.js`

    * 이런 문제를 만났다면 `postInstall.js`를 수동으로 실행시켜줘야 한다.

        ```
        Error: Cannot find module '../build/jvm_dll_path.json'
        ```

    * `node_modules/java`에 들어가보자. `build` 디렉토리가 없을 것이다. 아마 자동으로 경로생성을 할 수 없었나보다. 수동으로 만들어주자. 

        ```
        λ cd ./node_modules/java
        λ ls build
        ls: cannot access 'build': No such file or directory
        λ mkdir build
        ```

    * 이제 `postInstall.js`를 실행시키자.

        ```
        λ node postInstall.js
        ```

6. Java 패키지 문제 해결 2 - `nodejavabridge_bindings.node`

    * `nodejavabridge_bindings.node`이 없다고 한다. 에러 메시지가 가리키는 경로에 들어가보면 실제로 없다.

    * 이유는 모르겠으나 `node-java`와 `node-java-maven`을 설치했다가 삭제하니 자동으로 문제가 해결되었다.

        ```
        λ yarn install node-java --save
        λ yarn install node-java-maven --save
        λ yarn remove node-java node-java-maven
        ```


