import Link from "next/link";

export default function About() {
    return(
        <div>
            <h1>About Page</h1>
            <h2>この画面はアバウトページです</h2>

            <ul>
                <li><Link href = "/">Home</Link></li>
            </ul>
        </div>
    );
}