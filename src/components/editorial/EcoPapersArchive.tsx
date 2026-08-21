"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { ecoPapers } from "@/content/eco-papers";

export default function EcoPapersArchive() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [year, setYear] = useState("All");
  const categories = [
    "All",
    ...new Set(ecoPapers.map((paper) => paper.category)),
  ];
  const years = [
    "All",
    ...new Set(ecoPapers.map((paper) => String(paper.year)).filter(Boolean)),
  ];
  const visible = useMemo(
    () =>
      ecoPapers.filter((paper) => {
        const searchText =
          `${paper.title} ${paper.subtitle} ${paper.summary} ${paper.authors.join(" ")} ${paper.topics.join(" ")}`.toLowerCase();
        return (
          searchText.includes(query.toLowerCase()) &&
          (category === "All" || paper.category === category) &&
          (year === "All" || String(paper.year) === year)
        );
      }),
    [query, category, year],
  );
  const featured = ecoPapers.find((paper) => paper.featured) ?? ecoPapers[0];

  return (
    <div className="eco-archive">
      <section className="eco-archive-hero">
        <div>
          <span className="section-kicker lime">
            Independent youth publishing
          </span>
          <h1>
            Eco
            <br />
            <strong>Papers</strong>
          </h1>
          <p>
            Field observation, environmental research and public ideas from
            young people in Bangladesh.
          </p>
        </div>
        {featured && (
          <Link
            href={`/eco-papers/${featured.slug}`}
            className="archive-feature-cover"
            style={{ aspectRatio: featured.coverAspectRatio ?? "3 / 4" }}
          >
            <Image
              src={featured.coverImage}
              alt={featured.coverAlt}
              fill
              priority
              sizes="(min-width: 1024px) 340px, (min-width: 768px) 42vw, 78vw"
              className="object-contain"
            />
            <span>Featured issue / {featured.issueNumber}</span>
          </Link>
        )}
      </section>
      <section className="archive-index" aria-labelledby="archive-title">
        <div className="archive-heading">
          <span className="section-kicker">Publication archive</span>
          <h2 id="archive-title">Browse the issues.</h2>
        </div>
        <div className="archive-filters">
          <label>
            <span>Search</span>
            <span className="search-box">
              <Search aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Title, author or topic"
              />
            </span>
          </label>
          <label>
            <span>Category</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Year</span>
            <select
              value={year}
              onChange={(event) => setYear(event.target.value)}
            >
              {years.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>
        {visible.length ? (
          <div className="archive-covers">
            {visible.map((paper, index) => (
              <article
                key={paper.slug}
                className={`archive-issue archive-issue-${index % 3}`}
              >
                <Link
                  href={`/eco-papers/${paper.slug}`}
                  className="archive-cover-image"
                  style={{ aspectRatio: paper.coverAspectRatio ?? "3 / 4" }}
                >
                  <Image
                    src={paper.coverImage}
                    alt={paper.coverAlt}
                    fill
                    sizes="(min-width: 1024px) 26vw, (min-width: 640px) 42vw, 82vw"
                    className="object-contain"
                  />
                </Link>
                <div>
                  <span>
                    Issue {paper.issueNumber} / {paper.year ?? "Date pending"}
                  </span>
                  <h3>{paper.title}</h3>
                  <p>{paper.subtitle}</p>
                  <Link
                    href={`/eco-papers/${paper.slug}`}
                    className="text-link"
                  >
                    View issue <ArrowRight />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="archive-empty">
            <strong>No papers found.</strong>
            <p>Try a broader search or clear the filters.</p>
            <button
              onClick={() => {
                setQuery("");
                setCategory("All");
                setYear("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
