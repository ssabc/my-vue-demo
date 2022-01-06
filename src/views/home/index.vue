<!--
 * @Author: bohe
 * @Date: 2022-01-05 13:55:49
 * @LastEditTime: 2022-01-06 14:57:49
 * @LastEditors: bohe
 * @Description: 
-->
<template>
  <div>
    Home
    <Test></Test>
    <Test2></Test2>
    <Test3></Test3>
  </div>
</template>
<script>
export default {
  name: "Index",
  compoments: {
    comp1: {
      render: function (h) {
        return h(
          "anchored-heading",
          {
            props: {
              level: 1,
            },
          },
          [h("span", "Hello"), " world!"]
        );
      },
    },
  },
};
</script>
