import Head from "next/head";
import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/post";
import utilStyles from "../../styles/utils.module.css";

// 各postの静的パスを作成する
export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false, // pathsに含まれていないパスを入力すると"404エラーを表示する"
  };
}

// getStaticPathsで取得したパスからデータを取得する
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}

// 投稿内容を表示する
export default function post({ postData }) {
  return (
    <Layout>
      {/* タグにタイトルを表示させる */}
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingX1}>{postData.title}</h1>
        <div className={utilStyles.ligthText}>{postData.date}</div>
        {/* 本来dangerouslySetInnerHTMLを使うばあはサニタイズする必要がある */}
        <div dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }} />
      </article>
    </Layout>
  );
}
