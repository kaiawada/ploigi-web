import Link from "next/link";
import { getBlogDetail } from "@/app/lib/microcms";

export default async function Sorevi({ params }:{ params: Promise<{ id: string }> }) {
    const { id } = await params;
    const blog = await getBlogDetail(id);

    return(
        <div style = {{ padding: "20px" }}>
            <h1>Sorevi Page</h1>
            <h2>この画面はSoreviページです</h2>
            <ul>
                <li><Link href = "/">Home</Link></li>
                <li><Link href = "/blogs">Blogs</Link></li>
            </ul>

            <hr style = {{ margin: "20px 0" }} />

            <h3 style={{ fontSize: '24px', fontWeight: 'bold' }}>{blog.title}
                {blog.title}
            </h3>
            
            <div style={{ marginTop: '20px', lineHeight: '1.8' }} dangerouslySetInnerHTML={{ __html: blog.body }}/>
        </div>
    );
}
