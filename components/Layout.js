// 共通して使うレイアウトコンポーネント

import Head from "next/head";
// 目的別にCSSファイルを分けた
// layout.module.cssはレイアウト(骨格)を定義 → Layout.jsに適用するため"components"フォルダに格納
// styles/utils.module.cssはデザイン(文字の大きさやマージンなど)を定義 → どのコンポーネントにも適用したいので"styles"フォルダに格納
import styles from "./layout.module.css"; // cssモジュールを使う場合は****.module.cssの名前にする
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

const name = "Code Aki";
export const siteTitle = "Next.js Blog";

function Layout({ children, home }) {
  return (
    // cssモジュールを使う
    <div className={styles.container}>
      {/* 共通部分 */}
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        {/* Layoutに""home"がある場合にはヘッダーを大きくする */}
        {home ? (
          <>
            <img
              src="/images/profile.png"
              className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <img
              src="/images/profile.png"
              className={`${utilStyles.borderCircle}`}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        )}
      </header>

      {/* ここの部分を変更して表示させる */}
      <main>{children}</main>
      {/* ホームへ戻るボタン */}
      {!home && (
        <div>
          <Link href="/">← ホームへ戻る</Link>
        </div>
      )}
    </div>
  );
}

export default Layout;
