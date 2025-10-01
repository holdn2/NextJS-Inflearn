import { ReactNode } from "react";
import SearchableLayout from "@/components/searchable-layout";
import styles from "./index.module.css";
import BookItem from "@/components/book-item";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

export const getStaticProps = async () => {
  // 페이지 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터(백엔드 데이터 등)를 불러오는 함수
  // 사전 렌더링 과정에서 딱 한번만 실행됨
  // 서버측에서만 실행되는 함수
  // 서버 환경에서만 실행되기 때문에 브라우저를 읽을 수 없음

  // console.log("asdfasdf"); => 이런 것은 브라우저 콘솔에 출력되지 않음. 터미널에서는 출력됨

  console.log("인덱스 페이지");

  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      recoBooks,
    },
  };
};

// 페이지 컴포넌트 또한 서버에서 먼저 한 번 실행되고 hydration 뒤 브라우저에서 한 번 더 실행되는 것임
export default function Home({
  allBooks,
  recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={styles.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recoBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
