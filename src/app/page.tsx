import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
	return(
		<div className="big-white">
			<section className="text-gray-600 body-font	">
				<div className="container mx-auto flex px-5 py24 items-center justify-center flex-col">

					<Image
						className="md:w-5/6 w-full mb-10 object-cover object-center rounded-2xl shadow-xl border border-gray-100"
						alt="sorevi blog hero"
						src="/hero.png"
						width={1200}
						height={500}
						priority
					/>


					<h1 className="title-font sm:text-5xl text-4xl mb-4 font-bold text-gray-900 leading-tight">
						公開エリアトップページ<br className="hidden lg:inline-block" />
						Ploigi project
					</h1>
					<p className="mb-8 leading-relaxed text-lg text-gray-500 max-w-2xl mx-auto">
						Ploigi projectは場所に固定されることなく環境を制御するためのシステムです。
						ここではPloigi projectの開発とその開発者の活動について記したSoreviブログを公開しています。
					</p>
					<div className="flex justify-center gap-4">
						<Link href="/blog" className="inline-flex text-white bg-indigo-500 border-0 py-3 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">ブログへ</Link>
						<Link href="/about" className="inline-flex text-gray-700 bg-gray-100 border-0 py-3 px-8 focus:outline-none hover:bg-gray-200 rounded text-lg">Ploigi projectについて</Link>
					</div>
				</div>
			</section>
		</div>
	);
}