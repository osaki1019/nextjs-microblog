import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// "posts"ディレクトリのパスを取得
const postsDirectory = path.join(process.cwd(), "posts");

// mdファイルのデータを取り出す
export function getPostsData() {
  // SSRでサーバーからデータを取得してくる場合は、ここでfetchしてあげる

  const fileNames = fs.readdirSync(postsDirectory); // "posts"ディレクトリのファイルネームをobject配列で取得する
  const allPoetsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, ""); // ファイル名をidとして取り出す

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName); // ファイルのパスを取得する
    const fileContent = fs.readFileSync(fullPath, "utf8"); // ファイルの中身をテキストデータとして読み取る
    const matterResult = matter(fileContent); // マークダウンを解析して取得する

    // idとデータを返す
    return {
      id,
      ...matterResult.data,
    };
  });

  //  読み込んだすべてのデータを返す
  return allPoetsData;
}

// getStaticPathでreturnで使うpathを取得する
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
  /*
  returnで返されるoject
  	[
		{
			params: {
				id: "ssg-ssr",
			}
		}
		{
			params: {
				id: "next-react",
			}
		}
		...
	]
  */
}

// idに基づいてブログ投稿データを返す
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContent);
  const blogContent = await remark().use(html).process(matterResult.content);
  const blogContentHTML = blogContent.toString();

  return {
    id,
    blogContentHTML,
    ...matterResult.data,
  };
}
