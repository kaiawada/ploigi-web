import Link from "next/link";

export default function HomePage() {
	return(
		<div>
			<h1></h1>
			<h2>公開エリアトップページ</h2>
			<div>
        <ul>
          <li><a href="/about">Aboutページ aタグ使用</a></li>
          <li><Link href="/blogs">Blogs リンクコンポーネント使用</Link></li>
        </ul>								
			</div>
		</div>
	);
}