<template>
  <!--      輪播-->
  <div id="carouselExampleCaptions" class="carousel slide banner" data-bs-ride="carousel">
    <!--        <div class="carousel-indicators">-->
    <!--          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"/>-->
    <!--          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"/>-->
    <!--          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"/>-->
    <!--        </div>-->
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="@/assets/image/kat-von-wood-HhVgCRGX6bk-unsplash.jpg" alt="" class="d-block w-100">
      </div>
      <div class="carousel-item">
        <img src="@/assets/image/rebecca-peterson-hall-aN-zGYlxiCI-unsplash.jpg" alt="" class="d-block w-100">
      </div>
      <div class="carousel-item">
        <img src="@/assets/image/pille-r-priske-hr0nUFtpCTk-unsplash.jpg" alt="" class="d-block w-100">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"/>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"/>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Banner-view'
}
</script>

<style lang="scss" scoped>
@use "@/assets/css/benner/benner.scss" as *;
</style>
