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
