import Link from "next/link";

export default function note() {
    return(
        <div>
            <h1>Note Page</h1>
            <h2>この画面はNoteページです</h2>
            <ul>
                <li><Link href = "/">Home</Link></li>
                <li><Link href = "/blogs">Blogs</Link></li>
            </ul>
        </div>
    );
}