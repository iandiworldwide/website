"use client";

import { useState } from "react";
import Link from "next/link";
import { blogContent, blogPosts } from "@/lib/content";

export default function Blog() {
  const [selected, setSelected] = useState(blogContent.allLabel);

  const categories = [blogContent.allLabel, ...blogContent.categories];
  const filtered =
    selected === blogContent.allLabel
      ? blogPosts
      : blogPosts.filter((post) => post.category === selected);

  return (
    <article className="px-xs py-lg md:px-md">
      <section className="grid gap-md md:grid-cols-4">
        <h1>{blogContent.title}</h1>
        <p className="md:col-span-2">{blogContent.intro}</p>
      </section>

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

      {/* Index, not cards: date / category / title and excerpt. */}
      <ul className="mt-md space-y-md">
        {filtered.map((post) => (
          <li key={post.id} data-reveal className="grid gap-xs md:grid-cols-4 md:gap-md">
            <span>{post.date}</span>
            <span>{post.category}</span>
            <div className="md:col-span-2">
              <h2>
                <Link href={`/blog/${post.slug}`} className="link-sweep">
                  {post.title}
                </Link>
              </h2>
              <p>{post.excerpt}</p>
            </div>
          </li>
        ))}
      </ul>

      <section data-reveal className="mt-lg grid gap-md md:grid-cols-4">
        <h2>{blogContent.newsletterLabel}</h2>
        <form className="flex items-end gap-md md:col-span-2">
          <label className="flex-1">
            <span className="block">{blogContent.newsletterFieldLabel}</span>
            <input
              type="email"
              name="email"
              placeholder={blogContent.newsletterPlaceholder}
              required
            />
          </label>
          <button type="submit" className="cta">
            {blogContent.newsletterButton}
          </button>
        </form>
      </section>
    </article>
  );
}
