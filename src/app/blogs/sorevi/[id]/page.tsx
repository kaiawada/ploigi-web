import Image from "next/image";
import Link from "next/link";
import { getBlogDetail } from "@/app/lib/microcms";

export default async function Sorevi({ params }:{ params: Promise<{ id: string }> }) {
    const { id } = await params;
    const blog = await getBlogDetail(id);

    return(
        <div>
            {blog.headerImage && (
                <div className="relative w-full h-72 md:h-96">
                    <Image
                        src={blog.headerImage.url}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                        <h1 className="text-white text-3xl md:text-5xl font-bold p-8 leading-tight">
                            {blog.title}
                        </h1>
                    </div>
                </div>
            )}

            <div className="max-w-3xl mx-auto px-6 py-10">
                {!blog.headerImage && (
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>
                )}
                <p className="text-gray-400 text-sm mb-8">
                    {new Date(blog.publishedAt).toLocaleDateString('ja-JP')}
                </p>
                <div className="prose" dangerouslySetInnerHTML={{ __html: blog.body }}/>
                <div className="mt-12 pt-6 border-t border-gray-100">
                    <Link href="/blogs" className="text-sm text-gray-400 hover:text-gray-900 hover:underline transition-colors">
                        ← ブログ一覧へ戻る
                    </Link>
                </div>
            </div>
        </div>
    );
}
