<template>
  <div>
    <Header />
    <Hero />
    <Services />
    <About />
    <Projects toLink="/projects" />
    <Statistic />
    <Partners />
    <Contact />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import About from '@/components/AboutComponent.vue'
import Contact from '@/components/ContactComponent.vue'
import Footer from '@/components/FooterComponent.vue'
import Header from '@/components/HeaderComponent.vue'
import Hero from '@/components/HeroComponent.vue'
import Partners from '@/components/PartnersComponent.vue'
import Projects from '@/components/ProjectsComponent.vue'
import Services from '@/components/ServicesComponent.vue'
import Statistic from '@/components/StatisticsComponent.vue'

export default {
  name: 'App',
  components: {
    Header,
    Hero,
    Services,
    About,
    Projects,
    Statistic,
    Partners,
    Contact,
    Footer,
  },
}
</script>

<style></style>
