import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
	return(
		<div className="big-white">
			<section className="text-gray-600 body-font	">
				<div className="container mx-auto flex px-5 pt-0 items-center justify-center flex-col">
					<div className="relative w-full mb-10">
						<Image
							className="w-full mb-10 object-cover object-center border border-gray-100"
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