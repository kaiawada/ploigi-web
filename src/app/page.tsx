import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
	return(
		<div className="bg-white">
			<section className="text-gray-600 body-font">
				<div className="relative w-full mb-10">
					<Image
						className="w-full object-cover object-center border border-gray-100"
						alt="sorevi blog hero"
						src="/TopImage.png"
						width={1200}
						height={500}
						priority
					/>
					<p className="absolute inset-0 flex items-center justify-center text-white text-9xl font-bold">
						Ploigi
					</p>
				</div>
				<div className="max-w-7xl mx-auto flex px-1 pt-0 items-center justify-center flex-col">
					<h1 className="title-font sm:text-5xl text-4xl mb-4 font-bold text-gray-900 leading-tight">

						Ploigi project
					</h1>
					<p className="mb-8 leading-relaxed text-lg text-gray-500 max-w-2xl mx-auto">
						Ploigi projectは場所に固定されることなく環境を制御するためのシステムです。
						ここではPloigi projectの開発とその開発者の活動について記したSoreviブログを公開しています。
					</p>
					<div className="flex justify-center gap-4">

					</div>
				</div>
			</section>
		</div>
	);
}
