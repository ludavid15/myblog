<template>
  <div class="page-shell">
    <section class="page-hero" aria-label="About">
      <div class="page-hero__grid">
        <div class="page-hero__copy">
          <nav class="page-breadcrumb" aria-label="Breadcrumb">
            <RouterLink class="page-breadcrumb__link" to="/">Home</RouterLink>
            <span class="page-breadcrumb__sep" aria-hidden="true">/</span>
            <span class="page-breadcrumb__current">About Me</span>
          </nav>

          <h1 class="page-hero__title">
            About Me
          </h1>

          <div class="page-hero__dash" aria-hidden="true" />

        </div>
      </div>
    </section>

    <div class="about-body page-main">
      <div class="about-body__inner">

        <p class="about-text">
          Hi, I'm David - an aerospace engineer based in Los Angeles, California. I work on satellites, and these days I mostly support mission operations. I define procedures, write code, and help drive the design for both the satellite and ground systems so everything works together. It's a lot like planning a group vacation - figuring out what everyone wants, then making a cohesive plan to accommodate all of it in a way that's also flexible and efficient.
        </p>
        
        <p class="about-text">
          It may sound tedious (and sometimes it is), but this kind of work can also be extremely rewarding. I get to collaborate across every subsystem, and it requires both a big picture understanding of how the whole system works, and also an attention to detail because that's where even the best plans can fall apart.
        </p>

        <p class="about-text">
          Before starting my career, I studied aerospace engineering at UCLA and at the University of Michigan, where I focused on autonomous vehicles, optimization, and image processing. My master's research explored how algorithms could be used to analyze impact damage in composite structures. I love space, but in grad school I was surrounded by research on smart systems, AI, and robotics, and inspired my  appreciation for computers and automation. By the time I graduated, I was learning and writing less about rockets and more about algorithms.
        </p>

        <p class="about-text">
          Today, I'm still influenced by this experience because I love working on automation and making systems smarter. I combine logic and curiosity to spot what operations I can automate, and how to architect better software tools to accomplish those goals.
        </p>

        <h2 class="about-section-title">
          Fun Things
        </h2>

        <div class="page-hero__dash about-section-dash" aria-hidden="true" />

        <p class="about-text">
          Some of my favorite books from recent years. Give them a read when you are able!
        </p>

        <p class="about-text">
          <b><i>The Outline Trilogy</i> by Rachel Cusk</b> - told mostly through a series of conversations, this trilogy explores identity, perception, and how we construct our lives with others. It's filled with poignant reflections — like the question of what to do when you're living a life shaped by an earlier version of yourself, but one you no longer feel connected to.
        </p>
        <p class="about-text">
          <b><i>The Emporer of all Maladies</i> by Siddhartha Mukherjee</b> - an interesting look into the history of cancer. It showed me that cancer isn't just a biological puzzle; it's a societal one too, full of human stories, ethical dilemmas and shifting cultural values. I came away with an appreciation for how we, as a society approach complex scientific problems - not just with data, but often with political controversy, and always with compassion and creativity.
        </p>
        <p class="about-text">
          <b><i>Stay True</i> by Hua Tsu</b> - a quiet memoir on platonic friendship. One of my favorite definitions comes from this book: "A friend is someone who seeks to know, more than being known". It also resonated deeply as a reflection of what it's like to grow up Asian American on the West Coast - steeped in tech companies and Hollywood, in a place where being an immigrant is commonplace, but never quite seamless.
        </p>
        <p class="about-text">
          <b><i>Pachinko</i> by Min Jin Lee</b> - a generational novel about a Korean family living as outsiders in Japan through the 20th century. Although there are a lot of themes in this book, what stood out to me was its exploration of how individuals navigate dignity, family, and ambition in a system that pressures people to blend in rather than stand out. It's a world where the reality of survival challenges our more noble ideals of virtue and ethics.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-body__inner {
  max-width: 56rem;
}

.about-text {
  font-size: 1.05rem;
  line-height: 1.65;
  color: rgba(40, 41, 35, 0.92);
  margin: 0 0 var(--page-space-md) 0;
}

.about-section-title {
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: clamp(1.35rem, 2.5vw, 1.65rem);
  font-weight: 600;
  line-height: 1.2;
  color: #282923;
  margin: var(--page-space-xl) 0 var(--page-space-sm) 0;
}

.about-section-dash {
  margin-bottom: var(--page-space-md);
}
</style>
