import Link from "next/link";

export default function BlogTop() {
    return(
        <div>
            <h1>Blog Top Page</h1>
            <h2>この画面はブログのトップページです</h2>
            <ul>
                <li><Link href = "/">Home</Link></li>
                <li><Link href="/blogs/sorevi">Sorevi</Link></li>
                <li><Link href="/blogs/note">Note</Link></li>
            </ul>
        </div>
    );
}