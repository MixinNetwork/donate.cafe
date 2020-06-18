<template>
  <section :class="$i18n.locale">
    <h1 v-html="$t('home.desc')"></h1>
    <img src="@/assets/img/home.png" alt />
    <ul>
      <li v-for="(item, index) in $t('home.props')" :key="index">{{item}}</li>
    </ul>
    <button @click="$emit('open')">{{$t('home.mainBtn')}}</button>
    <img class="donate" src="@/assets/img/donate.svg" alt />
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
section {
  width: 100%;
  max-width: 944px;
  margin: 0 auto 5rem auto;
  padding: 0 56px;
  position: relative;
  font-family: Nunito;
  overflow-x: hidden;

  h1 {
    position: relative;

    font-style: normal;
    font-weight: 600;
    font-size: 50px;
    line-height: 1.2;

    transform: translateY(48px);

    width: 400px;
    margin-bottom: 90px;

    /deep/ b {
      color: #fd7f02;
    }

    &::before {
      content: "D";
      position: absolute;
      left: -48px;
      top: -68px;
      font-family: "SF Pro Text";
      font-style: normal;
      font-weight: 800;
      font-size: 120px;
      color: #333;
      opacity: 0.04;
    }
  }

  img {
    position: absolute;
    right: 48px;
    top: 0;
    width: 489px;
  }

  li {
    margin: 35px;
    position: relative;
    color: #4c4471;

    &::before {
      content: "";
      position: absolute;
      top: 6.4px;
      left: -28.8px;
      width: 16px;
      height: 10px;
      background-image: url("../assets/img/right.svg");
    }
  }

  button {
    width: 287px;
  }
}

.donate {
  width: 0;
  height: 0;
  opacity: 0;
}

@media screen and (max-width: 67.5rem) {
  section.en h1 {
    max-width: 290px;

    &:before {
      font-size: 80px;
      top: -38px;
      left: -24px;
    }
  }

  section.zh h1 {
    max-width: 350px;

    &:before {
      font-size: 80px;
      top: -35px;
      left: -15px;
    }
  }

  section {
    margin: 57px auto 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      font-size: 42px;
      width: initial;
      text-align: center;
      margin-bottom: 68px;
    }

    img {
      position: static;
      width: calc(100% - 40px);
      height: initial;
    }

    button {
      margin: 3rem 0 10rem 0;
      width: 241px;
      display: flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
    }

    ul {
      transform: translate(14.4px);
    }
  }
}
</style>