<script setup>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
</script>

<template>
  <AppHeader />

  <div class="about container text-center">
    <div id="band" class="content-section">
      <h2 class="section-heading">Hi, we are SmartChoice</h2>
      <p class="section-sub-heading">We love smartphone</p>
      <p class="about-text">
        At SmartChoice, we are passionate about technology and the power of smartphones to enhance our everyday lives. Our
        journey began with a simple idea - to create an ecommerce platform that offers a curated selection of premium
        smartphones, backed by exceptional customer service. We handpick each smartphone in our inventory, carefully
        evaluating their specifications, features, and performance to ensure that they meet our strict quality standards
      </p>

      <div class="row members-list">
        <div class="col col-third s-col-full mt-32 text-center">
          <p class="member-name">Cole Turner</p>
          <img src="https://xsgames.co/randomusers/avatar.php?g=male" alt="Name" class="member-img">
        </div>

        <div class="col col-third s-col-full mt-32 text-center">
          <p class="member-name">Ly Tan Tai</p>
          <img src="https://i.ibb.co/4F9XW1w/c4a9d1318ef460aa39e5.jpg" alt="Name" class="member-img">
        </div>

        <div class="col col-third s-col-full mt-32 text-center">
          <p class="member-name">Sadie Rhodes</p>
          <img src="https://xsgames.co/randomusers/avatar.php?g=female" alt="Name" class="member-img">
        </div>

      </div>


    </div>
    <!-- <h1>Hi, we are SmartChoice</h1>
    <p>At SmartChoice, we are passionate about technology and the power of smartphones to enhance our everyday lives. Our journey began with a simple idea - to create an ecommerce platform that offers a curated selection of premium smartphones, backed by exceptional customer service. We handpick each smartphone in our inventory, carefully evaluating their specifications, features, and performance to ensure that they meet our strict quality standards</p> -->
  </div>
  <AppFooter />
</template>

<style>
@media (min-width: 1024px) {
  .about .content-section {
    width: 800px;
    max-width: 100%;
    padding: 64px 0 112px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 16px;
    padding-right: 16px;
  }

  .about .section-heading {
    font-size: 30px;
    font-weight: 500;
    text-align: center;
    letter-spacing: 4px;
  }

  .about .section-sub-heading {
    font-size: 15px;
    text-align: center;
    margin-top: 25px;
    font-style: italic;
    opacity: 0.6;
  }

  .about .about-text {
    font-size: 15px;
    margin-top: 25px;
    text-align: justify;
    line-height: 1.4;
  }

  .about .members-list {
    margin-top: 32px;
    /* origin: 48px */
  }

  .about .member-name {
    font-size: 15px;
    margin-bottom: 15px;
  }

  .about .member-img {
    width: 154px;
    border-radius: 4px;
  }

  .about {
    margin-top: 76px;
    min-height: 100vh;
  }
}
</style>
