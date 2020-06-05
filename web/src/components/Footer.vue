<template>
  <footer>
    <ul>
      <li>
        <a target="_blank" href="https://twitter.com/mixindonate">Twitter</a>
      </li>
      <li>
        <a target="_blank" href="https://github.com/MixinNetwork/donation-button">Github</a>
      </li>
      <li>
        <a @click="$emit('show_faq')" href="javascript:void(0)">{{$t('home.faq')}}</a>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style lang="scss" scoped>
footer {
  font-family: Nunito;
  font-weight: 400;

  ul {
    display: flex;
    justify-content: center;
  }

  li {
    margin-right: 108px;
    margin-bottom: 50px;

    &:last-child {
      margin-right: 0;
    }
  }
}
@media screen and (max-width: 67.5rem) {
  footer {
    margin-top: 10rem;

    li {
      margin-right: 3.5rem;
    }
  }
}
</style>