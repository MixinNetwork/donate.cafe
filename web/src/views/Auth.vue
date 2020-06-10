<template>
  <Loading />
</template>

<script>
import Loading from "@/components/Loading";
export default {
  name: "Auth",
  components: { Loading },
  async mounted() {
    const error = getUrlParameter("error");
    if (error === "access_denied") return handle_access_denied.call(this);
    const code = getUrlParameter("code");
    const state = getUrlParameter("state");
    const resp =
      state === "login"
        ? await this.APIS.login(code)
        : await this.APIS.authenticate(code);
    if (resp && resp.access_token) {
      let { access_token, donate_id, avatar_url } = resp;
      this.$ls.set("token", access_token);
      this.$ls.set("avatar_url", avatar_url);
      if (donate_id) {
        this.$ls.set("donate_id", donate_id);
        window.sessionStorage.setItem("step4", "true");
      }
    }
    this.$router.push("/");
  }
};

function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(window.location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}
</script>