<template>
  <div class="wrap">
    <div class="main">
      <banner/>
<!--      內文-->
      <div class="info1">
        <div class="info1__title">
        <h2> DIPTYQUE </h2>
        </div>
        <div class="info1__container">
          <div class="info1__container--img-place">
            <img src="../../assets/image/johanne-kristensen-bIVj1y37EJU-unsplash.jpg" alt="">
          </div>
          <div class="info1__container--text">
          <div class="title">
          <h2>About diptyque</h2>
          </div>
          <div class="news">
            <p>diptyque 為一當代、標誌性的香氛精品店，以前所未有的感官體驗，</p>
            <p>塑造生活的藝術與雅緻的奢華，而香氛、藝術與一切密不可分。</p>
            <p>自 1961 創立以來， diptyque 演繹自由精神，貫徹藝術創作，</p>
            <p>根植於愉悅的創造力、吸引力與充滿創意的邂逅。</p>
          </div>
          <div class="link">
            <router-link class="view-more btn btn-outline-secondary" :to="{path: '/brands',query: {productCategory: 'diptyque'}}">
              了解更多
            </router-link>
          </div>
        </div>
        </div>
      </div>
      <div class="info2">
        <div class="info2__title">
          <h2> BAMFORD </h2>
        </div>
        <div class="info2__container">
          <div class="info2__container--for-mobile">
            <img src="../../assets/image/bf2.png" alt="">
          </div>
          <div class="info2__container--text">
            <div class="title">
              <h2>About BAMFORD</h2>
            </div>
            <div class="news">
              <strong><span>品味英國貴族有機生活美學</span></strong>
              <p>源自英國，代表一種奢華優雅、天然有機的生活風格。由貴族 Carole Bamford女爵創立，Bamford完美詮釋創辦人的品味與哲學，推崇生活的藝術，以天然植物萃取與傳統精細工藝，創造恆久純淨的沐浴、身體保養、寶寶保養與香氛創作，真正滋養心靈與肌膚，傳達美好幸福的品牌承諾。</p>
              <strong><span>天然植物萃取 品質與細節至上</span></strong>
              <p>Bamford提供追求細節與品質的顧客最完整的生活用品選擇。品牌尊崇並創造生活的藝術，並為所創作的產品負責任，承諾所有 Bamford 的產品都維持完美的特色，創造出最真誠且高品質的系列產品。</p>
              <p>Bamford 身體保養系列採用天然原料成分，均含有精選的芳香精油，其香氣精緻並具有特殊功效。Bamford堅持產品完全於英國製造，不含防腐劑、界面活性劑、人工色素、礦物油及人工合成香料，提供頂級的保養選擇。</p>
              <strong><span>品味英國貴族有機生活方式</span></strong>
              <p>基於「有機不只有益於自然環境，也對我們的生活有極佳的正面影響，是真正的奢華。」的理念，Carole 女爵不僅長時間投入慈善活動，更於2002年成立了Daylesford Organic，以農場、店鋪、餐廳、烹飪教室等多元事業體，全方位地推廣有機飲食與文化。4年後正式開創Bamford，精彩演繹了有機理念如何擴張至生活風格及時尚領域。「Bamford的靈感源自於大自然，我們非常珍惜這世界上所有珍稀的自然產物，因此創造一系列能真正滋養身體、肌膚及心靈的天然植萃保養產品。」透過 Bamford ，Carole 積極推動天然植萃產品，致力於保持傳統工藝並將其傳承予下一代。</p>
            </div>
            <div class="link">
              <router-link class="view-more btn btn-outline-secondary" :to="{path: '/brands',query: {productCategory: 'bamford'}}">
                了解更多
              </router-link>
            </div>
          </div>
          <div class="info2__container--img-place">
            <img src="../../assets/image/bf2.png" alt="">
          </div>
        </div>
      </div>
      <div class="info3">
        <div class="info3__title">
          <h2> MALIN+GOETZ </h2>
        </div>
        <div class="info3__container">
          <div class="info3__container--img-place">
            <img src="../../assets/image/mg2.png" alt="">
          </div>
          <div class="info3__container--text">
            <div class="title">
              <h2>About MALIN+GOETZ</h2>
            </div>
            <div class="news">
              <p>diptyque 為一當代、標誌性的香氛精品店，以前所未有的感官體驗，</p>
              <p>塑造生活的藝術與雅緻的奢華，而香氛、藝術與一切密不可分。</p>
              <p>自 1961 創立以來， diptyque 演繹自由精神，貫徹藝術創作，</p>
              <p>根植於愉悅的創造力、吸引力與充滿創意的邂逅。</p>
            </div>
            <div class="link">
            <router-link class="view-more btn btn-outline-secondary" :to="{path: '/brands',query: {productCategory: 'MALIN+GOETZ'}}">
              了解更多
            </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="info4">
        <div class="info4__title">
          <h2> 其他商品 </h2>
        </div>
        <div class="info4__container">
          <div class="info4__container--otherProduct">
            <ul>
              <li>
                <img class="imagePlace" src="../../assets/image/by2.png" alt="">
                <h2 class="titlePlace">BYREDO</h2>
                <div class="linkPlace">
                <router-link class="view-more btn btn-outline-secondary" :to="{path: '/brands',query: {productCategory: 'BYREDO'}}">
                  了解更多
                </router-link>
                </div>
              </li>
              <li>
                <img class="imagePlace" src="../../assets/image/k2.png" alt="">
                <h2 class="titlePlace">KERZON</h2>
                <div class="linkPlace">
                  <router-link class="view-more btn btn-outline-secondary" :to="{path: '/brands',query: {productCategory: 'KERZON'}}">
                    了解更多
                  </router-link>
                </div>
              </li>
              <li>
                <img class="imagePlace" src="../../assets/image/f2.png" alt="">
                <h2 class="titlePlace">FLORAÏKU</h2>
                <div class="linkPlace">
                  <router-link class="view-more btn btn-outline-secondary" :to="{path: '/brands',query: {productCategory: 'FLORAÏKU'}}">
                    了解更多
                  </router-link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import banner from '@/components/Banner.vue'

export default {
  name: 'Home-view',
  data () {
    return {
      brand: [],
      brandMZ: []
    }
  },
  components: {
    banner
  },
  methods: {
    getProducts () {
      const getProductsApi = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(getProductsApi)
        .then((res) => {
          // console.log(res) // ok
          this.brand = {
            diptyque: res.data.products.filter((products) => products.category === 'diptyque'),
            bamford: res.data.products.filter((products) => products.category === 'bamford'),
            malinGoetz: res.data.products.filter((products) => products.category === 'MALIN+GOETZ'),
            byredo: res.data.products.filter((products) => products.category === 'BYREDO'),
            kerzon: res.data.products.filter((products) => products.category === 'KERZON'),
            floraiku: res.data.products.filter((products) => products.category === 'FLORAÏKU'),
          }
          this.isLoading = false
        })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
@use "@/assets/css/home/home.scss" as *;
</style>
