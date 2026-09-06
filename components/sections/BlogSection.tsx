"use client";

import { useState } from "react";
import { blogContent, blogPosts } from "@/lib/content";

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
          <li key={post.id} data-reveal className="grid gap-xs md:grid-cols-4 md:gap-md">
            <span className="text-caption">{post.date}</span>
            <span className="text-caption">{post.category}</span>
            <div className="md:col-span-2">
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </div>
          </li>
        ))}
      </ul>

      <div data-reveal className="mt-lg grid gap-md md:grid-cols-4">
        <h3>{blogContent.newsletterLabel}</h3>
        <form className="flex items-end gap-md md:col-span-2">
          <label className="flex-1">
            <span className="block text-caption">{blogContent.newsletterFieldLabel}</span>
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
      </div>
    </section>
  );
}
