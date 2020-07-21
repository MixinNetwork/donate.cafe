<template>
  <Loading/>
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
      const return_to = getUrlParameter("return_to") || "/";
      if (return_to === "/") {
        const resp =
          state === "login"
            ? await this.APIS.login(code)
            : await this.APIS.authAndUpload(code);
        if (resp && resp.access_token) {
          let { access_token, donate_id, avatar_url, donate_info } = resp;
          this.$ls.set("token", access_token);
          this.$ls.set("avatar_url", avatar_url);
          if (donate_info) {
            let { view_url, currency, amount_info, name } = donate_info;
            if (view_url) {
              this.$ls.set("file", view_url);
              this.$ls.set("button", "user");
            }
            name && this.$ls.set("name", name);
            this.$ls.set("currency", currency);
            this.$ls.set("amount", amount_info);
          }
          if (donate_id) {
            this.$ls.set("donate_id", donate_id);
            window.sessionStorage.setItem("step4", "true");
          }
        }
        this.$router.push(return_to);
      } else if (return_to === "/m") {
        window.location.href =
          process.env.VUE_APP_M_CLIENT + "/auth?code=" + code;
      } else if (return_to === '/admin') {
        window.location.href =
          process.env.VUE_APP_ADMIN_CLIENT + '/auth?code=' + code;
      }
    }
  };

  function handle_access_denied() {
    this.$message(this.$t("error.auth"));
    return this.$router.push("/");
  }

  function getUrlParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(window.location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
</script>