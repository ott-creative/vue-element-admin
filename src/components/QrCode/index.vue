<template>
  <div id="qrCode" ref="qrCodeDiv" style="margin: 0 auto"></div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  name: "qrCode",
  props: {
    width: {
      type: Number,
      default: 20,
    },
    height: {
      type: Number,
      default: 20,
    },
    content: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  mounted: function () {
    this.$nextTick(function () {
      this.bindQRCode();
    });
  },
  methods: {
    bindQRCode: function () {
      console.log("qr:", this.content);
      new QRCode(this.$refs.qrCodeDiv, {
        text: this.content,
        width: this.width,
        height: this.height,
        colorDark: "#333333", //二维码颜色
        colorLight: "#ffffff", //二维码背景色
        correctLevel: QRCode.CorrectLevel.L, //容错率，L/M/H
      });
    },
  },
};
</script>