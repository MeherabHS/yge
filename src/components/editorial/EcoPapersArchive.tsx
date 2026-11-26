"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ecoPapers } from "@/content/eco-papers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EcoPapersArchive() {
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
  const visible = ecoPapers.filter(
    (paper) =>
      (category === "All" || paper.category === category) &&
      (year === "All" || String(paper.year) === year),
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
          {[
            {
              id: "eco-category",
              label: "Category",
              value: category,
              set: setCategory,
              items: categories,
            },
            {
              id: "eco-year",
              label: "Year",
              value: year,
              set: setYear,
              items: years,
            },
          ].map((filter) => (
            <label key={filter.id} htmlFor={filter.id}>
              <span>{filter.label}</span>
              <Select value={filter.value} onValueChange={filter.set}>
                <SelectTrigger id={filter.id} aria-label={filter.label}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filter.items.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>
          ))}
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
            <p>Try a different category or year.</p>
            <button
              onClick={() => {
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
