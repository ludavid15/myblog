<template>
  <div class="home-page">
    <div class="home home-page__segment home-page__segment--top">
      <section
        class="home__section home__hero"
        aria-label="Introduction"
      >
      <div
        class="home__hero-art"
        aria-hidden="true"
      >
        <img
          :src="heroArtSrc"
          alt=""
          class="home__hero-art-img"
          width="1400"
          height="1000"
          decoding="async"
          fetchpriority="high"
        />
      </div>
      <div
        class="home__hero-text-fog"
        aria-hidden="true"
      />
      <div class="home__hero-inner">
        <div class="home__hero-copy">
          <h1 class="home-hero-title home__stack-after-title">
            Field Notes
          </h1>
          <p class="home-hero-subtitle home__stack-after-subtitle">
            Notes from an aerospace engineer on satellites, systems, software, and the process of learning deeply.
          </p>
          <div
            class="home-hero-dash home__stack-after-dash"
            aria-hidden="true"
          />
          <p class="home-hero-blurb home__stack-after-blurb">
            I’m David, an aerospace engineer in Los Angeles working on satellite mission operations.
            This site turns technical rabbit holes and hard-won engineering lessons into clear explanations
            you can actually use—whether you’re deep in the weeds or just curious how these systems work.
          </p>
          <div class="home-hero-actions d-flex flex-wrap ga-3">
            <v-btn
              :to="{ name: 'Timeline' }"
              color="#282923"
              size="large"
              rounded="lg"
              class="text-none px-6"
              variant="flat"
            >
              See All Articles
            </v-btn>
            <v-btn
              :to="{ name: 'About' }"
              size="large"
              rounded="lg"
              class="text-none px-6"
              variant="tonal"
              border="thin"
            >
              About Me
            </v-btn>
          </div>
        </div>
      </div>
    </section>
    </div>

    <section
      class="home__themes-band"
      aria-labelledby="home-themes-heading"
    >
      <div class="home">
        <div class="home__section home__section--themes">
          <h2
            id="home-themes-heading"
            class="text-h5 font-weight-medium home__section-heading"
          >
            Explore by Theme
          </h2>

          <div
            class="home-hero-dash home__stack-after-dash"
            aria-hidden="true"
          />

          <div class="home__theme-grid" role="list">
            <div
              v-for="card in themeCards"
              :key="card.routeName"
              class="home__theme-cell"
              role="listitem"
            >
              <RouterLink
                class="home__theme-link"
                :to="{ name: card.routeName }"
              >
                <v-icon
                  :icon="card.icon"
                  size="36"
                  class="home__theme-icon"
                />
                <h3 class="home__theme-title">
                  {{ card.title }}
                </h3>
                <p class="home__theme-desc">
                  {{ card.keywords }}
                </p>
                <span class="home__theme-arrow" aria-hidden="true">
                  <v-icon
                    icon="mdi-arrow-right"
                    size="22"
                    class="home__theme-arrow-icon"
                  />
                </span>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="home home-page__segment home-page__segment--bottom">
      <section
        class="home__section"
        aria-labelledby="home-articles-heading"
      >
      <h2
        id="home-articles-heading"
        class="text-h5 font-weight-medium home__section-heading home__articles-heading"
      >
        Recent Articles
        <span class="text-body-2 text-medium-emphasis font-weight-regular home__articles-count">
          ({{ totalArticles }} {{ totalArticles === 1 ? 'article' : 'articles' }} total)
        </span>
      </h2>

      <div class="home__articles-list" role="list">
        <RouterLink
          v-for="post in posts"
          :key="post.slug"
          class="home__articles-row"
          :to="blogPostLocation(post.slug, post.topic)"
          role="listitem"
        >
          <time
            class="home__articles-date"
            :datetime="post.date"
          >
            {{ formatPostDate(post.date) }}
          </time>
          <div class="home__articles-main">
            <span class="home__articles-title">{{ post.title }}</span>
            <p class="home__articles-preview">
              {{ post.preview }}
            </p>
          </div>
        </RouterLink>
      </div>
    </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import blogFrontmatter from '@/data/blog-frontmatter.json';
import { formatPostDate } from '@/utils/formatPostDate';
import { blogPostLocation } from '@/utils/postPaths';

/** Public asset; bound from script so Vite does not rewrite `<img src="/...">` into a failed Rollup import. */
const heroArtSrc = `${import.meta.env.BASE_URL}IMG_0150.PNG`;

const themeCards = [
  {
    title: 'Space Systems',
    routeName: 'ThemeSpaceSystems',
    icon: 'mdi-satellite-variant',
    keywords:
      'Satellites, ground systems, orbits, and space science.',
  },
  {
    title: 'Engineering',
    routeName: 'ThemeEngineering',
    icon: 'mdi-hammer-wrench',
    keywords:
      'Applied physics, engineering disciplines, and the design of real world systems.',
  },
  {
    title: 'Software and AI',
    routeName: 'ThemeSoftwareAi',
    icon: 'mdi-xml',
    keywords:
      'Software, machine learning, developer tools, and frontends.',
  },
  {
    title: 'Life and Learning',
    routeName: 'ThemeLifeAndLearning',
    icon: 'mdi-lightbulb-outline',
    keywords:
      'Career reflections, life lessons, and deep learning.',
  },
];

const posts = computed(() => {
  return blogFrontmatter
    .filter((post) => post.date)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);
});

const totalArticles = computed(() => blogFrontmatter.length);
</script>

<style scoped>
.home-page {
  --home-max-width: 1200px;
  --home-gutter-x: clamp(1rem, 4vw, 2.5rem);
  --home-gutter-y: clamp(1rem, 4vw, 2.5rem);
  --home-section-gap: clamp(2rem, 3vw, 2.75rem);
  /* Extra space after the hero so “Explore by Theme” lands with a calmer rhythm */
  --home-after-hero-gap: clamp(1.35rem, 3.5vw, 2.75rem);
  /* Keep the hero fog and the themes band gap in sync */
  --home-hero-to-themes-gap: calc(var(--home-section-gap) + var(--home-after-hero-gap) - 20px);
  --home-space-xs: 0.5rem;
  --home-space-sm: 1rem;
  --home-space-md: 1.5rem;
  --home-space-lg: 2rem;
  --home-space-xl: 2.5rem;
  /* Extra inset below the app chrome so the hero doesn’t hug the top edge */
  --home-pad-top-bump: clamp(0.5rem, 1.25vw, 1rem);
}

.home {
  box-sizing: border-box;
  width: 100%;
  max-width: var(--home-max-width);
  margin-inline: auto;
  padding-inline: var(--home-gutter-x);
}

.home-page__segment--top {
  padding-top: calc(var(--home-gutter-y) + var(--home-pad-top-bump));
}

.home-page__segment--bottom {
  padding-bottom: calc(var(--home-gutter-y) + var(--home-space-sm));
}

.home__themes-band {
  width: 100%;
  margin-top: var(--home-hero-to-themes-gap);
  margin-bottom: calc(var(--home-section-gap) + 20px);
  padding-block: clamp(1.75rem, 4vw, 2.85rem);
  border: none;
  box-shadow: none;
  background: #ebe3d4;
}

.home__section--themes {
  margin: 0;
}

.home__section + .home__section {
  margin-top: var(--home-section-gap);
}

.home__section-heading {
  margin-bottom: var(--home-space-xs);
}

.home__theme-grid {
  display: grid;
  gap: 0;
  grid-template-columns: 1fr;
  --home-theme-divider: rgba(40, 41, 35, 0.12);
}

.home__theme-cell {
  border-bottom: 1px solid var(--home-theme-divider);
}

.home__theme-cell:last-child {
  border-bottom: none;
}

.home__theme-link {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  box-sizing: border-box;
  padding: var(--home-space-md) var(--home-space-sm) calc(var(--home-space-md) + 0.25rem);
  text-decoration: none;
  color: inherit;
  transition: background-color 0.15s ease;
}

.home__theme-link:hover {
  background-color: rgba(40, 41, 35, 0.035);
}

.home__theme-link:hover .home__theme-title {
  text-decoration: underline;
  text-underline-offset: 0.15em;
}

.home__theme-link:focus-visible {
  outline: 2px solid rgba(40, 41, 35, 0.35);
  outline-offset: -2px;
}

.home__theme-icon {
  margin-bottom: var(--home-space-sm);
  color: #282923 !important;
  opacity: 0.88;
}

.home__theme-title {
  margin: 0 0 var(--home-space-sm);
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: clamp(1.02rem, 1.9vw, 1.12rem);
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: -0.02em;
  color: #282923;
}

.home__theme-desc {
  margin: 0;
  flex-grow: 1;
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: clamp(0.98rem, 1.75vw, 1.05rem);
  font-weight: 400;
  line-height: 1.55;
  color: rgba(40, 41, 35, 0.72);
}

.home__theme-arrow {
  display: flex;
  align-items: center;
  margin-top: var(--home-space-md);
}

.home__theme-arrow-icon {
  color: #b8942e !important;
  opacity: 0.95;
  transition: transform 0.2s ease;
}

.home__theme-link:hover .home__theme-arrow-icon {
  transform: translateX(3px);
}

@media (min-width: 600px) {
  .home__theme-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .home__theme-cell {
    border-bottom: none;
    border-right: 1px solid var(--home-theme-divider);
  }

  .home__theme-cell:nth-child(2n) {
    border-right: none;
  }

  .home__theme-cell:nth-child(-n + 2) {
    border-bottom: 1px solid var(--home-theme-divider);
  }
}

@media (min-width: 1280px) {
  .home__theme-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .home__theme-cell {
    border-bottom: none;
    border-right: 1px solid var(--home-theme-divider);
  }

  .home__theme-cell:nth-child(2n) {
    border-right: 1px solid var(--home-theme-divider);
  }

  .home__theme-cell:nth-child(4n) {
    border-right: none;
  }

  .home__theme-cell:nth-child(-n + 2) {
    border-bottom: none;
  }

  .home__theme-link {
    padding-inline: var(--home-space-md);
  }
}

.home__articles-list {
  border-top: 1px solid rgba(40, 41, 35, 0.12);
}

.home__articles-row {
  display: grid;
  grid-template-columns: 7.5rem minmax(0, 1fr);
  gap: var(--home-space-md);
  align-items: start;
  padding: 1rem 0.75rem 1rem 0;
  border-bottom: 1px solid rgba(40, 41, 35, 0.12);
  text-decoration: none;
  color: inherit;
  transition: background-color 0.15s ease;
}

.home__articles-row:hover {
  background-color: rgba(40, 41, 35, 0.035);
}

.home__articles-row:focus-visible {
  outline: 2px solid rgba(40, 41, 35, 0.35);
  outline-offset: 2px;
}

.home__articles-date {
  font-size: 0.85rem;
  letter-spacing: 0.02em;
  color: rgba(40, 41, 35, 0.58);
}

.home__articles-main {
  min-width: 0;
}

.home__articles-title {
  display: block;
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: 1.08rem;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: -0.02em;
  color: #282923;
  margin-bottom: 0.4rem;
}

.home__articles-row:hover .home__articles-title {
  text-decoration: underline;
  text-underline-offset: 0.15em;
}

.home__articles-preview {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(40, 41, 35, 0.68);
}

@media (max-width: 520px) {
  .home__articles-row {
    grid-template-columns: 1fr;
    gap: 0.45rem;
    padding-right: 0;
  }
}

.home__articles-heading .home__articles-count {
  margin-inline-start: 0.35em;
}

.home__meta-note {
  margin-bottom: var(--home-space-lg);
}

.home__stack-after-title {
  margin-bottom: var(--home-space-sm);
}

.home__stack-after-subtitle {
  margin-bottom: var(--home-space-md);
}

.home__stack-after-dash {
  margin-bottom: var(--home-space-md);
}

.home__stack-after-blurb {
  margin-bottom: var(--home-space-lg);
}

/* Editorial hero: full-strength art + a single “text fog” layer that controls readability */
.home__hero {
  container-name: home-hero;
  container-type: inline-size;
  /* 0 = narrow hero column (stronger fog), 1 = wide (lighter fog) — from hero width, not viewport */
  --hero-fog-t: clamp(0, calc((100cqw - 320px) / 720px), 1);

  /* Floor for hero art: rem + % of viewport height so short windows don’t keep shrinking the layer */
  --hero-art-min-h: max(26rem, min(38vh, 34rem));

  position: relative;
  isolation: isolate;
  overflow: visible;
  min-height: min(60vh, 620px);
  padding-block: clamp(1.35rem, 3.5vw, 2.75rem) clamp(2rem, 5vw, 4.25rem);
}

/* Wide hero (default): match prior large-viewport art placement */
.home__hero-art {
  position: absolute;
  z-index: 0;
  pointer-events: none;
  top: auto;
  right: -25%;
  bottom: -34%;
  width: min(140%, 1400px);
  height: min(112vh, 1075px);
  height: min(112dvh, 1075px);
  min-height: var(--hero-art-min-h);
  max-width: none;
}

/* Photo: placement + slight global lighten (paper shows through; fog still handles readability) */
.home__hero-art-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: 100% 100%;
  transform: translateY(3.75%);
  opacity: 0.9;
}

.home__hero-text-fog {
  position: absolute;
  z-index: 1;
  /* Bleed on all sides: art is taller than the hero (bottom-anchored + ~112vh) so it paints above the hero top; match that with negative top inset */
  inset: -50% -48% calc(-1 * var(--home-hero-to-themes-gap)) -10%;
  pointer-events: none;
  /* Paper fog (readability) + bottom-right radial to feather art edges (replaces img mask) */
  background:
    linear-gradient(
      102deg,
      rgba(247, 240, 232, calc(0.995 - 0.045 * var(--hero-fog-t))) 0%,
      rgba(247, 240, 232, calc(0.93 - 0.12 * var(--hero-fog-t))) 14%,
      rgba(247, 240, 232, calc(0.52 - 0.26 * var(--hero-fog-t))) 30%,
      rgba(247, 240, 232, calc(0.18 - 0.12 * var(--hero-fog-t))) 44%,
      rgba(247, 240, 232, 0) calc(62% - 6% * var(--hero-fog-t))
    ),
    linear-gradient(
      to bottom,
      rgba(247, 240, 232, calc(0.58 - 0.12 * var(--hero-fog-t))) 0%,
      rgba(247, 240, 232, 0) calc(22% + 4% * (1 - var(--hero-fog-t))),
      rgba(247, 240, 232, 0) 100%
    ),
    radial-gradient(
      ellipse 155% 150% at 92% 122%,
      rgba(247, 240, 232, 0) 0%,
      rgba(247, 240, 232, calc(0.06 + 0.12 * (1 - var(--hero-fog-t)))) 42%,
      rgba(247, 240, 232, calc(0.22 + 0.28 * (1 - var(--hero-fog-t)))) 64%,
      rgba(247, 240, 232, calc(0.45 + 0.35 * (1 - var(--hero-fog-t)))) 88%,
      rgba(247, 240, 232, 0) 100%
    );
}

@container home-hero (max-width: 899px) {
  .home__hero {
    --hero-art-min-h: max(28rem, min(40vh, 36rem));
  }

  .home__hero-art {
    right: -28%;
    bottom: -30%;
    width: min(135%, 1250px);
    height: min(102vh, 975px);
    height: min(102dvh, 975px);
    min-height: var(--hero-art-min-h);
  }

  .home__hero-text-fog {
    inset: -50% -48% calc(-1 * var(--home-hero-to-themes-gap)) -12%;
    background:
      linear-gradient(
        96deg,
        rgba(247, 240, 232, calc(0.995 - 0.04 * var(--hero-fog-t))) 0%,
        rgba(247, 240, 232, calc(0.94 - 0.1 * var(--hero-fog-t))) 26%,
        rgba(247, 240, 232, calc(0.42 - 0.18 * var(--hero-fog-t))) 52%,
        rgba(247, 240, 232, 0) calc(78% - 4% * var(--hero-fog-t))
      ),
      linear-gradient(
        to bottom,
        rgba(247, 240, 232, calc(0.62 - 0.1 * var(--hero-fog-t))) 0%,
        rgba(247, 240, 232, 0) calc(26% + 6% * (1 - var(--hero-fog-t)))
      ),
      radial-gradient(
        ellipse 155% 150% at 92% 122%,
        rgba(247, 240, 232, 0) 0%,
        rgba(247, 240, 232, calc(0.08 + 0.14 * (1 - var(--hero-fog-t)))) 42%,
        rgba(247, 240, 232, calc(0.26 + 0.3 * (1 - var(--hero-fog-t)))) 64%,
        rgba(247, 240, 232, calc(0.5 + 0.32 * (1 - var(--hero-fog-t)))) 88%,
        rgba(247, 240, 232, 0) 100%
      );
  }
}

@container home-hero (max-width: 599px) {
  .home__hero {
    --hero-art-min-h: max(20rem, min(36vh, 28rem));
  }

  .home__hero-art {
    right: -32%;
    bottom: -20%;
    width: min(168%, 850px);
    height: min(85vh, 725px);
    height: min(85dvh, 725px);
    min-height: var(--hero-art-min-h);
  }

  .home__hero-text-fog {
    inset: -45% -52% calc(-1 * var(--home-hero-to-themes-gap)) -8%;
    background:
      linear-gradient(
        94deg,
        rgba(247, 240, 232, calc(0.995 - 0.02 * var(--hero-fog-t))) 0%,
        rgba(247, 240, 232, calc(0.96 - 0.08 * var(--hero-fog-t))) 34%,
        rgba(247, 240, 232, calc(0.44 - 0.2 * var(--hero-fog-t))) 62%,
        rgba(247, 240, 232, 0) calc(86% - 6% * var(--hero-fog-t))
      ),
      linear-gradient(
        to bottom,
        rgba(247, 240, 232, calc(0.65 - 0.1 * var(--hero-fog-t))) 0%,
        rgba(247, 240, 232, 0) calc(36% + 8% * (1 - var(--hero-fog-t)))
      ),
      radial-gradient(
        ellipse 155% 150% at 92% 122%,
        rgba(247, 240, 232, 0) 0%,
        rgba(247, 240, 232, calc(0.1 + 0.18 * (1 - var(--hero-fog-t)))) 40%,
        rgba(247, 240, 232, calc(0.3 + 0.35 * (1 - var(--hero-fog-t)))) 66%,
        rgba(247, 240, 232, calc(0.55 + 0.35 * (1 - var(--hero-fog-t)))) 90%,
        rgba(247, 240, 232, 0) 100%
      );
  }
}

/* Wide hero column: ease the left veil (same intent as old 1600px viewport rule) */
@container home-hero (min-width: 1000px) {
  .home__hero {
    --hero-art-min-h: max(30rem, min(42vh, 38rem));
  }

  .home__hero-text-fog {
    background:
      linear-gradient(
        102deg,
        rgba(247, 240, 232, calc(0.99 - 0.04 * var(--hero-fog-t))) 0%,
        rgba(247, 240, 232, calc(0.9 - 0.08 * var(--hero-fog-t))) 12%,
        rgba(247, 240, 232, calc(0.42 - 0.2 * var(--hero-fog-t))) 28%,
        rgba(247, 240, 232, calc(0.1 - 0.06 * var(--hero-fog-t))) 42%,
        rgba(247, 240, 232, 0) calc(58% - 4% * var(--hero-fog-t))
      ),
      linear-gradient(
        to bottom,
        rgba(247, 240, 232, calc(0.5 - 0.08 * var(--hero-fog-t))) 0%,
        rgba(247, 240, 232, 0) calc(20% + 4% * (1 - var(--hero-fog-t))),
        rgba(247, 240, 232, 0) 100%
      ),
      radial-gradient(
        ellipse 155% 150% at 92% 122%,
        rgba(247, 240, 232, 0) 0%,
        rgba(247, 240, 232, calc(0.05 + 0.1 * (1 - var(--hero-fog-t)))) 44%,
        rgba(247, 240, 232, calc(0.2 + 0.25 * (1 - var(--hero-fog-t)))) 66%,
        rgba(247, 240, 232, calc(0.42 + 0.32 * (1 - var(--hero-fog-t)))) 88%,
        rgba(247, 240, 232, 0) 100%
      );
  }
}

.home__hero-inner {
  position: relative;
  z-index: 2;
  /* ~520–580px readable column, anchored left within the home container */
  max-width: min(36.25rem, 580px, 100%);
  width: 100%;
}

.home__hero-copy {
  position: relative;
}

/* Slightly more air around the hero stack than body sections */
.home__hero .home__stack-after-title {
  margin-bottom: clamp(0.85rem, 2vw, 1.125rem);
}

.home__hero .home__stack-after-subtitle {
  margin-bottom: clamp(1.15rem, 2.5vw, 1.65rem);
}

.home__hero .home__stack-after-dash {
  margin-bottom: clamp(1.15rem, 2.5vw, 1.65rem);
}

.home__hero .home__stack-after-blurb {
  margin-bottom: clamp(1.65rem, 3.5vw, 2.35rem);
}

/* Viewport-only rhythm on small screens; art/fog follow @container home-hero above */
@media (max-width: 599px) {
  .home__hero {
    min-height: min(52vh, 520px);
    padding-block: clamp(1.1rem, 3vw, 1.85rem) clamp(1.75rem, 4vw, 2.75rem);
  }
}

.home-hero-title {
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: clamp(2.75rem, 6vw, 4rem);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: #282923;
}

.home-hero-subtitle {
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: clamp(1.05rem, 2vw, 1.25rem);
  font-weight: 400;
  line-height: 1.55;
  color: rgba(40, 41, 35, 0.72);
  max-width: 100%;
}

.home-hero-dash {
  width: 3.25rem;
  height: 5px;
  border-radius: 999px;
  background-color: #b8942e;
}

.home-hero-blurb {
  font-size: 1.05rem;
  line-height: 1.65;
  color: rgba(40, 41, 35, 0.85);
  max-width: 100%;
}

</style>
