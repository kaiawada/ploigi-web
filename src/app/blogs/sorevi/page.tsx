import Link from "next/link";

export default function Sorevi() {
    return(
        <div>
            <h1>Sorevi Page</h1>
            <h2>この画面はSoreviページです</h2>
            <ul>
                <li><Link href = "/">Home</Link></li>
                <li><Link href = "/blogs">Blogs</Link></li>
            </ul>
        </div>
    );
}