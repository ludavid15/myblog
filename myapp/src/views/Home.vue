<template>
  <div class="home">
    <section
      class="home__section home__hero"
      aria-label="Introduction"
    >
      <div class="home__hero-grid">
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

        <div class="home__hero-visual">
          <div class="home-hero-image-wrap">
            <v-img
              src="/temple.jpg"
              alt="Hero image"
              cover
              class="home-hero-image"
            />
          </div>
        </div>
      </div>
    </section>

    <section
      class="home__section"
      aria-labelledby="home-themes-heading"
    >
      <h2
        id="home-themes-heading"
        class="text-h5 font-weight-medium home__section-heading"
      >
        Explore by Theme
      </h2>

      <v-divider :thickness="3" class="home__section-rule" />

      <div class="home__theme-grid">
        <div
          v-for="card in themeCards"
          :key="card.routeName"
          class="home__theme-cell"
        >
          <v-card
            :to="{ name: card.routeName }"
            variant="tonal"
            :color="card.color ?? themeCardDefaultColor"
            class="theme-explore-card d-flex flex-column fill-height"
            rounded="lg"
            hover
          >
            <v-card-text class="flex-grow-1 d-flex flex-column">
              <v-icon
                :icon="card.icon"
                size="40"
                class="theme-explore-icon home__card-icon"
              />
              <h3 class="text-h6 font-weight-medium home__card-title">
                {{ card.title }}
              </h3>
              <p class="text-body-2 text-medium-emphasis mb-0 flex-grow-1">
                {{ card.keywords }}
              </p>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </section>

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

      <v-divider :thickness="3" class="home__section-rule" />

      <div class="home__articles-stack">
        <v-card
          v-for="post in posts"
          :key="post.slug"
          class="theme-explore-card d-flex flex-column fill-height"
          variant="tonal"
          :color="articleCardDefaultColor"
          hover
          :to="`/posts/${post.slug}`"
        >
          <v-card-title>{{ post.title }}</v-card-title>
          <v-card-subtitle>{{ new Date(post.date).toLocaleDateString() }}</v-card-subtitle>
          <v-card-text class="flex-grow-1">
            <p class="text-body-2 text-medium-emphasis mb-0 flex-grow-1">
              {{ post.preview }}
            </p>
          </v-card-text>
          <v-spacer />
        </v-card>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import blogFrontmatter from '@/data/blog-frontmatter.json';

// Customize home card tonal colors here (Vuetify accepts theme keys like "primary" or CSS colors like "#b8942e")
const themeCardDefaultColor = '#2d2d2d';
const articleCardDefaultColor = '#2d2d2d';

const themeCards = [
  {
    title: 'Space Systems',
    routeName: 'ThemeSpaceSystems',
    icon: 'mdi-satellite-variant',
    keywords:
      'Satellites and payloads; mission operations; orbital mechanics and astrodynamics; ground segment and communications; propulsion, power, and link budgets.',
  },
  {
    title: 'Engineering',
    routeName: 'ThemeEngineering',
    icon: 'mdi-hammer-wrench',
    keywords:
      'Structures and materials; fluids and thermals; guidance, navigation, and control; testing and verification; multi-disciplinary systems design.',
  },
  {
    title: 'Software and AI',
    routeName: 'ThemeSoftwareAi',
    icon: 'mdi-xml',
    keywords:
      'Software architecture and implementation; machine learning and AI; developer tooling and automation; visualization and frontends; systems programming and reliability.',
  },
  {
    title: 'Life and Learning',
    routeName: 'ThemeLifeAndLearning',
    icon: 'mdi-lightbulb-outline',
    keywords:
      'Career reflections; learning deeply and staying curious; communication and collaboration; focus, habits, and productivity; books, ideas, and creative work.',
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
.home {
  --home-max-width: 1200px;
  --home-gutter-x: clamp(1rem, 4vw, 2.5rem);
  --home-gutter-y: clamp(1rem, 4vw, 2.5rem);
  --home-section-gap: clamp(2rem, 3vw, 2.75rem);
  --home-space-xs: 0.5rem;
  --home-space-sm: 1rem;
  --home-space-md: 1.5rem;
  --home-space-lg: 2rem;
  --home-space-xl: 2.5rem;
  --home-hero-gap: clamp(1.25rem, 3vw, 2rem);
  --home-hero-gap-lg: clamp(1.5rem, 2.5vw, 2.5rem);
  /* Extra inset below the app chrome so the hero doesn’t hug the top edge */
  --home-pad-top-bump: clamp(0.5rem, 1.25vw, 1rem);

  box-sizing: border-box;
  width: 100%;
  max-width: var(--home-max-width);
  margin-inline: auto;
  padding-inline: var(--home-gutter-x);
  padding-block: calc(var(--home-gutter-y) + var(--home-pad-top-bump)) calc(var(--home-gutter-y) + var(--home-space-sm));
}

.home__section + .home__section {
  margin-top: var(--home-section-gap);
}

.home__section-heading {
  margin-bottom: var(--home-space-xs);
}

.home__section-rule {
  margin-bottom: var(--home-space-md);
  opacity: 0.75;
}

.home__theme-grid {
  display: grid;
  gap: var(--home-space-md);
  grid-template-columns: 1fr;
}

@media (min-width: 600px) {
  .home__theme-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1280px) {
  .home__theme-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: var(--home-space-lg);
  }
}

.home__articles-stack {
  display: flex;
  flex-direction: column;
  gap: var(--home-space-md);
}

.home__card-icon {
  margin-bottom: var(--home-space-sm);
}

.home__card-title {
  margin-bottom: var(--home-space-sm);
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

.home__hero-grid {
  display: grid;
  gap: var(--home-hero-gap);
  align-items: center;
  /* Short viewports: keep a modest hero band without a fixed tall strip on desktop */
  min-height: min(52vh, 520px);
}

@media (min-width: 1280px) {
  .home__hero-grid {
    grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
    gap: var(--home-hero-gap-lg);
    align-items: start;
    min-height: unset;
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
  max-width: 36rem;
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
  max-width: 36rem;
}

.home-hero-image-wrap {
  border-radius: 12px;
  overflow: hidden;
}

.home-hero-image {
  aspect-ratio: 4 / 3;
  max-height: min(420px, 50vh);
}

@media (min-width: 1280px) {
  .home-hero-image {
    max-height: 480px;
  }
}

.theme-explore-card {
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.theme-explore-card:hover {
  transform: translateY(-1px);
}

.theme-explore-icon {
  color: #282923;
  opacity: 0.9;
}
</style>
