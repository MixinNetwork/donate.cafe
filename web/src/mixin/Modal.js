
import Modal from "@/components/Modal";
import Base from '@/mixin/Base'
export default {
  components: { Modal },
  mixins: [Base],
  data() {
    return {
      show_modal: false,
      show_content: ""
    };
  },
  methods: {
    change_modal(status) {
      if (typeof status === "string") {
        this.show_content = status;
        this.show_modal = true;
      } else {
        this.show_content = "";
        this.show_modal = status;
      }
    }
  }
}