<template>

  <RouterView />
</template>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}

::-webkit-scrollbar{
  height: 5px;
  width: 5px;
  position: absolute;
}

::-webkit-scrollbar-thumb{
  background-color:#1890ff ;
}

::-webkit-scrollbar-track{
  background-color: #ddd;
}
</style>
