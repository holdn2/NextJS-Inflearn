import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  // useRouter로 useLocation, useNavigate, useRouter의 기능을 쓸 수 있음
  const router = useRouter();

  const onClickButton = () => {
    router.push("/test");
    // router.back(); 뒤로가기
    // router.replace("/test"); 뒤로가기를 방지하며 페이지 이동
  };

  // Link 외의 프로그래매틱한 코드에도 prefetching을 적용하려면
  useEffect(() => {
    router.prefetch("/test");
  }, []);

  return (
    <>
      <header>
        <Link href={"/"}>index</Link>
        &nbsp;
        <Link href={"/search"} prefetch={false}>
          search
        </Link>
        &nbsp;
        <Link href={"/book/1"}>book/1</Link>
        <div>
          <button onClick={onClickButton}>/test 페이지로 이동</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
