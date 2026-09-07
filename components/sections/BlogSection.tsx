"use client";

import { useState } from "react";
import { blogContent, blogPosts, type BlogPost } from "@/lib/content";

// A post title links out to Substack when the entry carries a url.
function PostTitle({ post }: { post: BlogPost }) {
  if (!post.url) return <h3>{post.title}</h3>;
  return (
    <h3>
      <a href={post.url} target="_blank" rel="noopener noreferrer" className="link-sweep">
        {post.title}
      </a>
    </h3>
  );
}

export default function BlogSection() {
  const [selected, setSelected] = useState(blogContent.allLabel);

  const categories = [blogContent.allLabel, ...blogContent.categories];
  const filtered =
    selected === blogContent.allLabel
      ? blogPosts
      : blogPosts.filter((post) => post.category === selected);

  return (
    <section id="blog" aria-labelledby="blog-heading" className="section px-xs md:px-md">
      <div data-reveal className="grid gap-md md:grid-cols-4">
        <h2 id="blog-heading">{blogContent.title}</h2>
        <p className="md:col-span-2">{blogContent.intro}</p>
      </div>

      <ul aria-label={blogContent.filterLabel} className="mt-lg flex flex-wrap gap-md">
        {categories.map((category) => (
          <li key={category}>
            <button
              type="button"
              aria-pressed={selected === category}
              onClick={() => setSelected(category)}
              className="link-sweep"
            >
              {category}
            </button>
          </li>
        ))}
      </ul>

      {/* An index, not cards: date, category, title, excerpt. */}
      <ul className="mt-md space-y-md">
        {filtered.map((post) => (
          <li key={post.slug} data-reveal className="grid gap-xs md:grid-cols-4 md:gap-md">
            <span className="text-caption">{post.date}</span>
            <span className="text-caption">{post.category}</span>
            <div className="md:col-span-2">
              <PostTitle post={post} />
              <p>{post.excerpt}</p>
              {post.author && <p className="mt-xs text-caption">{post.author}</p>}
            </div>
          </li>
        ))}
      </ul>

      <p data-reveal className="mt-lg">
        <a
          href={blogContent.archiveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cta"
        >
          {blogContent.archiveCta}
        </a>
      </p>
    </section>
  );
}
