> [!WARNING]
> 중요: 이 경고 블록은 올바른 마크다운 문법입니다.

## 세팅

- tanstack start 를 통해 생성했습니다.
- ***

## 고민

### 파일 구조 분리

현재 파일 구조는 rourter파일 안에 페이지들이 작성돼있는 상태입니다.
허나 점점 페이지가 늘어날 수록, 컴포넌트가 늘어날 수록 라우터 파일과 페이지들이 섞여서 분간이 어려울 거라고 생각됩니다.
추후 유지보수성을 생각한다면 해당 파일들을 분리해서 router파일 따로, 페이지 파일들 따로 폴더를 분리해 해당 폴더 안에 관련 컴포넌트들을 넣는 것이 적합해보입니다.
+) 자주 사용되는 컴포넌트들은 별도로 분리한 폴더에 넣는 것이 좋아보입니다.

### husky 도입

husky로 git hook을 적용하여 특정 규칙을 강제할 수 있다.
이는 나중에 협업 시 충돌을 피할 수 있는 방법이므로 추후 팀원을 뽑는다는 것을 가정해 도입하는 것도 좋아보입니다.

## 패키지 고민 & 추가이유

### tailwind-merge

clsx, cva를 사용할 때 저절로 같이 따라오는 친구다.
classname 충돌을 막아줘 겹치는 classname의 경우 마지막에 선언된 className 기준 오버라이드 처리된다.

```js
import { twMerge } from "tailwind-merge";

twMerge("px-2 py-1 bg-red-600 p-3 bg-grey-800");
// => p-3 bg-grey-800
```

### clsx

clsx는 조건에 따라 문자열을 구성하는 아주 작은 유틸리티이다.
특정 조건에 따라 여러 클래스 이름을 하나의 문자열로 결합할 수 있다.
ex)

```js
import clsx from "classnames";

const btnType = "primary";

// using strings
clsx("btn", "btn--large"); // => "btn btn--large"

// using objects
clsx("btn", { [`btn--${btnType}`]: true }); // => "btn btn--primary"

// using arrays
clsx(["btn", { [`btn--${btnType}`]: true }]); // => "btn btn--primary"

// using functions
clsx("btn", () => ({ [`btn--${btnType}`]: true })); // => "btn btn--primary"
```

그래서 이걸 왜 이용하는데? 할 것이다...
cva를 사용해보면 알겠지만, 클래스 조건부에 따라서 스타일을 지정해줄 수 있다.
여기서 clsx를 사용하는 이유는 그렇게 나뉘어진 클래스들을 하나로 합쳐주기 위해서,,, 라고 생각할 수 있다.
class props, state 또는 로직에 따라 요소에 서로 다른 클래스 이름을 적용할 수 있다.
+) 가독성, 유연성, 조합 등... 템플릿 리터럴이 길어지면 코드가 지저분해지는데, 이를 깔끔한 객체나 배열 형태로 정리해준다.

정리 : cva로 정의한 다양한 스타일 옵션(Variants)들을 현재 상황(props, state)에 맞게 추출하고, 거기에 추가적인 커스텀 클래스까지 안전하고 깔끔하게 합치기 위해 clsx를 사용한다.

### cva

컴포넌트의 핵심...! 라이브러리이다.
cva는 조건부 렌더링을 간편하게 해준다.
컴포넌트를 추가하다 보면 같은 버튼인데 어떤 건 길게 해야하고, 어떤 건 짧게해야하고... 어떤 건 붉은 색, 어떤 건 푸른 색이어야 할 때가 있다.
컴포넌트들은 대게 동일한 크기 & 색코드를 가져간다. 허나 해당 부분을 매번 변수로 받아와서 안에 넣어주면 해당 컴포넌트를 호출할 때마다 계속계속 값을 넣어야 할 것이다.
그건 매우 비효율적이기 때문에 해당 라이브러리로 그런 부분들을 관리해주는 것이다. 또한 variants로 선언한 스타일만 적용이 가능하기 때문에 스타일이 어긋나는 부분을 방지할 수 있다.
예시를 들자면 variants로 아래처럼 클래스를 선언 후 props로 size={sm} variant={default} 이런 식으로 넣어줄 수 있다.
즉 cva는 props에 따른 className 처리를 위해 사용된다.

```js
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  // 공통 스타일 defaultVariants 꿀기능이다. 모든 경우의 수에 대해 일일이 props를 넘기지 않아도 되니 코드가 훨씬 깨끗해진다.
  {
    variants: {
      variant: {
        default: "bg-blue-500 text-white hover:bg-blue-600",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-input bg-background hover:bg-accent",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-10 px-4 py-2",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);
```

나는 인풋과 버튼이 많은데 각각의 스타일이 달라서 해당 라이브러리를 사용하게 되었다.

+) cva는 컴포넌트 속성을 클래스에 매핑하는 용도이고, cn은 클래스를 병합하는 용도

> [!참고]
> https://www.reddit.com/r/nextjs/comments/1izyx39/cva_vs_cn_in_shadcnui_do_we_really_need_both_in/?tl=ko
> https://velog.io/@qwzx16/tailwind%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%ED%9A%A8%EC%9C%A8%EC%A0%81%EC%9D%B8-React-Component-%EA%B4%80%EB%A6%ACtailwind-merge-cva-clsx-%ED%8C%8C%ED%97%A4%EC%B9%98%EA%B8%B0
> https://dev-102.tistory.com/entry/Tailwind-CSS-%EC%9E%98-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0-with-Clxs-CVA-twMerge
> https://jforj.tistory.com/462#google_vignette

### redux vs zustand vs recoil vs jotai

우선 내가 상태를 관리할 부분은 로그인이다. 로그인을 했을 시 들어오는 값은 토큰, userId, 닉네임으로, 로그인, 로그아웃 함수와 로그인 유무, 사용자 정보가 있어야 한다.
즉 단순하게 하나의 상태만이 돌아다니는 것이 아니라 상태와 동작이 세트로 움직여야 하기 때문에 Flux패턴인 redux vs zustand 중에 선택하기로 했다. (jotai는 추후 컴포넌트 단위로 상태를 관리해야 하는 부분이 있으면 추가할 예정이다.)
recoil vs jotai는 아토믹 단위, 즉 피그마에서의 도형 하나하나의 단위로 컴포넌트를 관리하기 때문에 상태와 동작을 여러 개로 들고 다니는 로그인에는 맞지 않는다 판단했다.

### redux vs zustand

만약 해당 프로젝트의 규모가 컸다면 redux(툴킷과 확장 프로그램 존재)를 사용하는 게 맞지만, 그러한 부분이 아니며, 보일러 플레이트가 많은 redux보다 쉽고 간단한 zustand를 선택했다.
그 외에도 zustand는 미들웨어를 제공하며 최소한의 보일러플레이트였기에 zustand를 사용하게 되었다...
더불어 zustand는 1kb로 사용하기에도 그리 부담스럽지 않다. 간단한 작업 시에는 코드량의 차이도 있다.. .허나 복잡하게 상태를 관리하게 된다면 redux도 고려는 해봐야한다.

## 트러블 슈팅

## 해결!ㅡ

### zustand의 persist,,,, ㅜ

우선 알다시피 zustand는 상태 관리 라이브러리이다,,,! 허나 해당 페이지에서만 말이다,,, zustand는 기본적으로 브라우저의 휘발성 메모리에 저장된다. 미들웨어가 없다면 해당 상태를 다른 주소로 가져갈 수는 없다.
즉 내가 http://localhost:3000/ 해당 주소에서 로그인을 하면 새로고침 전에만 해당 값을 가지고 있고, 새로고침 하는 순간 날라간다는 것이다... 새로고침 이외에도 페이지 이동이 있다.
그래서 로그인 후 바로 home 페이지로 이동 했기에 isLoggin 이라는 상태값을 false로 가지고 있었기에 튕긴 것... 이다.
이러한 현상을 해결하기 위해 필요한 게 **persist**, zustand의 middleware에 있는 바로 그것이다! persist는 새로고침이 되어도 해당 상태값을 가지고 있을 수 있게 하는 메서드? 툴? 이다.

요약: Zustand의 상태는 기본적으로 브라우저의 **RAM(휘발성 메모리)**에 저장 -> 새로고침/주소창 이동을 하면 데이터가 날아감(SPA 즉 Link, useNavigate 는 예외).
-> Persist에서 지정한 저장소에 데이터를 저장 -> 페이지가 새로고침 될 대 저장소에 저장된 데이터를 읽어와 Zustand 상태 값으로 채워넣음.

+) sessionStorage는 탭을 닫으면 삭제, localStorage는 브라우저를 닫아도 유지 이다.
+) 선택적으로 필요한 정보만 저장할 수 있다.

### 그 외

#### tailwind 세팅 관련 오류

https://sweeb.tistory.com/90
