import Link from "next/link";
import { getBlog } from '@/app/lib/microcms';

export default async function BlogTop() {

    const blogs = await getBlog();

    return(
        <div>
            <h1>Blog Top Page</h1>
            <h2>この画面はブログのトップページです</h2>
            <ul>
                <li><Link href = "/">Home</Link></li>
                <li><Link href="/blogs/sorevi">Sorevi</Link></li>
                <li><Link href="/blogs/note">Note</Link></li>
            </ul>
            {blogs.map((article)=> (
                <div key={article.id}>
                    <Link href = {`/blogs/sorevi/${article.id}`}>
                    {article.title}
                    </Link>
                </div>
            ))}
        </div>
    );
}