import Image from "next/image";
import Link from "next/link";
import { getBlog } from '@/lib/microcms';
// @ts-ignore
import Parser from "rss-parser";

type NoteArticle = { title: string; link: string; pubDate: string; thumbnail: string };

async function getNoteArticles(): Promise<NoteArticle[]> {
    const parser = new Parser({
        customFields: { item: [['media:thumbnail', 'thumbnail']] },
    });
    try {
        const feed = await parser.parseURL("https://note.com/kaiawada/rss");
        return feed.items.slice(0, 3).map((item: any) => ({
            title: item.title || "non title",
            link: item.link || "#",
            pubDate: item.pubDate ? new Date(item.pubDate).toLocaleDateString('ja-JP') : "",
            thumbnail: item.thumbnail || "",
        }));
    } catch (error) {
        console.error("noteの取得に失敗しました:", error);
        return [];
    }
}

export default async function BlogTop() {

    const blogs = await getBlog();
    const noteArticles = await getNoteArticles();

    return(
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col text-center w-full mb-16">
                    <h1 className="sm:text-5xl text-4xl font-bold title-font mb-4 text-gray-900 tracking-tight">
                        Blogs
                    </h1>
                    <p className="max-w-2xl mx-auto leading-relaxed text-base text-gray-500">
                        Ploigi projectの開発プロセスやわからないところを調べた際の学習ノートなど、
                        日々のだらだらと積み重ねていったものがSoreviブログです。いつか誰かの役に立つことができたり、
                        そんなことになったらいいのになそんなエンジニアになれたらと思い公開していきます。
                    </p>
                </div>
                {/* グリッド*/}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="bg-white border border-gray-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between h-full">
                            {blog.headerImage && (
                                <Link href={`/blogs/sorevi/${blog.id}`} className="relative block h-48">
                                    <Image
                                        src={blog.headerImage.url}
                                        alt={blog.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                        <h2 className="text-white text-lg font-bold leading-snug line-clamp-2">
                                            {blog.title}
                                        </h2>
                                    </div>
                                </Link>
                            )}
                            <div className="p-6 flex-grow">
                                <p className="text-gray-400 text-xs font-medium mb-3">
                                    {new Date(blog.publishedAt).toLocaleDateString('ja-JP')}
                                </p>
                                {!blog.headerImage && (
                                    <h2 className="text-xl font-bold text-gray-900 mb-3 leading-snug hover:text-indigo-600 transition-colors">
                                        <Link href={`/blogs/sorevi/${blog.id}`}>
                                            {blog.title}
                                        </Link>
                                    </h2>
                                )}
                                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                                    {blog.body ? blog.body.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : '本文がありません'}
                                </p>
                            </div>
                            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                                <Link href={`/blogs/sorevi/${blog.id}`} className="text-sm font-semibold text-gray-900 hover:text-indigo-600 transition-colors inline-flex items-center gap-1 group">
                                    Read More
                                    <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"> 
                                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-24 border-t border-gray-100 pt-16">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                            Latest note Articles
                        </h2>
                        <p className="text-sm text-gray-400 mt-2">noteで発信中の最新ノート（外部サイト）</p>                        
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {noteArticles?.map((article, index) => (
                        <a
                                href={article.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={index}
                                className="block bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                        >
                            {article.thumbnail && (
                                <div className="relative h-48">
                                    <Image
                                        src={article.thumbnail}
                                        alt={article.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div className="p-6">
                                <span className="text-gray-400 text-xs font-medium block mb-2">
                                    {article.pubDate}
                                </span>
                                <h3 className="text-gray-900 font-bold text-lg leading-snug line-clamp-2 hover:text-indigo-600 transition-colors">
                                    {article.title}
                                </h3>
                            </div>
                            <div className="text-indigo-500 text-sm font-semibold inline-flex items-center gap-1 mt-6 group pt-4 border-t border-gray-50">
                                noteで読む
                                <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                            </div>
                        </a>
                    ))}
                </div>
                <div className="text-center mt-20">
                    <Link href="/" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">
                        トップページへ戻る
                    </Link>
                </div>
            </div>
        </div>
    );
}