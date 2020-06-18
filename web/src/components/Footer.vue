<template>
  <footer>
    <ul>
      <li>
        <a target="_blank" href="https://twitter.com/donatecafe">Twitter</a>
      </li>
      <li class="github">
        <a target="_blank" href="https://github.com/MixinNetwork/donate.cafe">GitHub</a>
      </li>
      <li>
        <a
          @click="$emit('show_content', 'faq')"
          href="javascript:void(0)"
        >{{$t('home.modal.faq.title')}}</a>
      </li>
      <li>
        <a
          @click="$emit('show_content', 'about')"
          href="javascript:void(0)"
        >{{$t('home.modal.about.title')}}</a>
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
    li {
      margin-right: 3.5rem;
    }
  }
}
@media screen and (max-width: 32rem) {
  .github {
    display: none;
  }
}
</style>