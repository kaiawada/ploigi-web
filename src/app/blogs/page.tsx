import Link from "next/link";
import { getBlog } from '@/app/lib/microcms';

export default async function BlogTop() {

    const blogs = await getBlog();

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
                            <div className="p-6 flex-grow">
                                <p className="text-gray-400 text-xs font-medium mb-3">
                                    {new Date(blog.publishedAt).toLocaleDateString('ja-JP')}
                                </p>
                                <h2 className="text-xl font-bold text-gray-900 mb-3 leading-snug hover:text-indigo-600 transition-colors">  
                                    <Link href={`/blogs/sorevi/${blog.id}`}>
                                        {blog.title}
                                    </Link>
                                </h2>
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
                <div className="text-center mt-20">
                    <Link href="/" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">
                        トップページへ戻る
                    </Link>
                </div>
            </div>
        </div>
    );
}